import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import nodemailer from 'nodemailer';
import { 
  escapeHtml, 
  checkRateLimit, 
  validateInputLength, 
  sanitizePhone,
  getClientIp,
} from '@/lib/security';

const resend = new Resend(process.env.RESEND_API_KEY);

// Gmail SMTP transporter (fallback)
const gmailTransporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message?: string;
  website?: string; // Honeypot field — should always be empty
}

// Email HTML templates - all user inputs are escaped to prevent XSS
const getNotificationEmailHtml = (name: string, email: string, phone: string, message?: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background: linear-gradient(to right, #4d2508, #3d1e08); padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
    </div>
    <div style="padding: 30px; background-color: #fdf6ef;">
      <h2 style="color: #3d1e08; margin-top: 0;">Contact Details</h2>
      <table style="width: 100%; border-collapse: collapse;">
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd1; font-weight: bold; color: #5a3921; width: 120px;">Name:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd1; color: #3d1e08;">${escapeHtml(name)}</td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd1; font-weight: bold; color: #5a3921;">Email:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd1; color: #3d1e08;">
            <a href="mailto:${escapeHtml(email)}" style="color: #d48125;">${escapeHtml(email)}</a>
          </td>
        </tr>
        <tr>
          <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd1; font-weight: bold; color: #5a3921;">Phone:</td>
          <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd1; color: #3d1e08;">
            <a href="tel:${escapeHtml(phone)}" style="color: #d48125;">${escapeHtml(phone)}</a>
          </td>
        </tr>
        ${message ? `
        <tr>
          <td style="padding: 10px 0; font-weight: bold; color: #5a3921; vertical-align: top;">Message:</td>
          <td style="padding: 10px 0; color: #3d1e08;">${escapeHtml(message).replace(/\n/g, '<br>')}</td>
        </tr>
        ` : ''}
      </table>
    </div>
    <div style="background-color: #e2a884; padding: 15px; text-align: center;">
      <p style="margin: 0; color: #3d2914; font-size: 12px;">
        This email was sent from the Core Business Capital website contact form.
      </p>
    </div>
  </div>
`;

const getConfirmationEmailHtml = (name: string) => `
  <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
    <div style="background: linear-gradient(to right, #4d2508, #3d1e08); padding: 20px; text-align: center;">
      <h1 style="color: white; margin: 0;">Thank You for Reaching Out!</h1>
    </div>
    <div style="padding: 30px; background-color: #fdf6ef;">
      <p style="color: #3d1e08; font-size: 16px; line-height: 1.6;">
        Dear ${escapeHtml(name)},
      </p>
      <p style="color: #3d1e08; font-size: 16px; line-height: 1.6;">
        Thank you for contacting Core Business Capital. We have received your message and will get back to you within 24 hours.
      </p>
      <p style="color: #3d1e08; font-size: 16px; line-height: 1.6;">
        In the meantime, if you have any urgent questions, please feel free to call us at <a href="tel:+17202223396" style="color: #d48125;">(720) 222-3396</a>.
      </p>
      <p style="color: #3d1e08; font-size: 16px; line-height: 1.6;">
        Best regards,<br>
        <strong>The Core Business Capital Team</strong>
      </p>
    </div>
    <div style="background-color: #e2a884; padding: 15px; text-align: center;">
      <p style="margin: 0; color: #3d2914; font-size: 12px;">
        Core Business Capital | <a href="https://corebusinesscapital.com" style="color: #3d2914;">corebusinesscapital.com</a>
      </p>
    </div>
  </div>
`;

// Send email via Gmail SMTP (fallback)
async function sendViaGmail(to: string, subject: string, html: string, replyTo?: string) {
  const mailOptions = {
    from: `"Core Business Capital" <${process.env.EMAIL_USER}>`,
    to,
    subject,
    html,
    replyTo: replyTo || undefined,
  };
  
  await gmailTransporter.sendMail(mailOptions);
  return true;
}

export async function POST(request: NextRequest) {
  try {
    // CSRF protection — validate origin
    const origin = request.headers.get('origin');
    const allowedOrigins = [
      'https://corebusinesscapital.com',
      'https://www.corebusinesscapital.com',
      process.env.NODE_ENV === 'development' ? 'http://localhost:3000' : '',
    ].filter(Boolean);

    if (origin && !allowedOrigins.includes(origin)) {
      return NextResponse.json(
        { error: 'Forbidden' },
        { status: 403 }
      );
    }

    // Rate limiting check
    const clientIp = getClientIp(request);
    const rateLimit = checkRateLimit(clientIp);
    if (!rateLimit.success) {
      return NextResponse.json(
        { error: 'Too many requests. Please try again in a few minutes.' },
        { status: 429, headers: { 'Retry-After': String(rateLimit.resetIn) } }
      );
    }

    // Enforce request body size limit (16KB max)
    const contentLength = request.headers.get('content-length');
    if (contentLength && parseInt(contentLength) > 16384) {
      return NextResponse.json(
        { error: 'Request body too large' },
        { status: 413 }
      );
    }

    const body: ContactFormData = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }

    // Honeypot check — if hidden field is filled, it's a bot
    if (body.website) {
      // Silently reject but return success to not tip off bots
      return NextResponse.json({ success: true, message: 'Thank you for your message. We will get back to you soon!' });
    }

    // Validate input lengths
    const lengthErrors: string[] = [];
    const nameCheck = validateInputLength(name, 'name');
    if (!nameCheck.valid) {
      lengthErrors.push(nameCheck.error!);
    }
    const emailCheck = validateInputLength(email, 'email');
    if (!emailCheck.valid) {
      lengthErrors.push(emailCheck.error!);
    }
    const phoneCheck = validateInputLength(phone, 'phone');
    if (!phoneCheck.valid) {
      lengthErrors.push(phoneCheck.error!);
    }
    if (message) {
      const msgCheck = validateInputLength(message, 'message');
      if (!msgCheck.valid) {
        lengthErrors.push(msgCheck.error!);
      }
    }
    
    if (lengthErrors.length > 0) {
      return NextResponse.json(
        { error: lengthErrors.join('. ') },
        { status: 400 }
      );
    }

    // Sanitize phone number
    const sanitizedPhone = sanitizePhone(phone);

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Save to MongoDB first
    let savedSubmission = null;
    try {
      const { db } = await connectToDatabase();
      const collection = db.collection('contact_submissions');
      
      const submission = {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: sanitizedPhone,
        message: message?.trim() || '',
        createdAt: new Date(),
        source: 'website_contact_form',
        emailSent: false,
        confirmationSent: false,
      };
      
      const result = await collection.insertOne(submission);
      savedSubmission = { ...submission, _id: result.insertedId };
      // Use structured logging without exposing sensitive data
      if (process.env.NODE_ENV === 'development') {
        console.log('Contact submission saved to MongoDB:', result.insertedId);
      }
    } catch (dbError) {
      // Log error without exposing details in production
      if (process.env.NODE_ENV === 'development') {
        console.error('MongoDB error:', dbError);
      }
      // Continue even if DB fails - we still want to try sending the email
    }

    // Send notification email to Core Business Capital
    let emailSent = false;
    let emailProvider = '';
    const notificationHtml = getNotificationEmailHtml(name, email, sanitizedPhone, message);
    
    // Try Resend first (primary)
    try {
      const { data, error } = await resend.emails.send({
        from: 'Core Business Capital <noreply@corebusinesscapital.com>',
        to: ['info@corebusinesscapital.com'],
        replyTo: email,
        subject: `New Contact Form Submission from ${escapeHtml(name)}`,
        html: notificationHtml,
      });

      if (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Resend error (notification):', JSON.stringify(error, null, 2));
        }
        throw new Error('Resend failed');
      } else {
        emailSent = true;
        emailProvider = 'resend';
        if (process.env.NODE_ENV === 'development') {
          console.log('Notification email sent via Resend:', data?.id);
        }
      }
    } catch (resendError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Resend failed, trying Gmail SMTP fallback:', resendError);
      }
      
      // Fallback to Gmail SMTP
      try {
        await sendViaGmail(
          'info@corebusinesscapital.com',
          `New Contact Form Submission from ${escapeHtml(name)}`,
          notificationHtml,
          email
        );
        emailSent = true;
        emailProvider = 'gmail';
        if (process.env.NODE_ENV === 'development') {
          console.log('Notification email sent via Gmail SMTP');
        }
      } catch (gmailError) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Gmail SMTP also failed:', gmailError);
        }
      }
    }

    // Send confirmation email to the user
    let confirmationSent = false;
    const confirmationHtml = getConfirmationEmailHtml(name);
    
    // Try Resend first (primary)
    try {
      const { data, error } = await resend.emails.send({
        from: 'Core Business Capital <noreply@corebusinesscapital.com>',
        to: [email],
        subject: 'Thank you for contacting Core Business Capital',
        html: confirmationHtml,
      });

      if (error) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Resend error (confirmation):', JSON.stringify(error, null, 2));
        }
        throw new Error('Resend failed');
      } else {
        confirmationSent = true;
        if (process.env.NODE_ENV === 'development') {
          console.log('Confirmation email sent via Resend:', data?.id);
        }
      }
    } catch (resendError) {
      if (process.env.NODE_ENV === 'development') {
        console.error('Resend failed for confirmation, trying Gmail SMTP:', resendError);
      }
      
      // Fallback to Gmail SMTP
      try {
        await sendViaGmail(
          email,
          'Thank you for contacting Core Business Capital',
          confirmationHtml
        );
        confirmationSent = true;
        if (process.env.NODE_ENV === 'development') {
          console.log('Confirmation email sent via Gmail SMTP');
        }
      } catch (gmailError) {
        if (process.env.NODE_ENV === 'development') {
          console.error('Gmail SMTP also failed for confirmation:', gmailError);
        }
      }
    }

    // Update MongoDB with email status
    if (savedSubmission && savedSubmission._id) {
      try {
        const { db } = await connectToDatabase();
        const collection = db.collection('contact_submissions');
        await collection.updateOne(
          { _id: savedSubmission._id },
          { $set: { emailSent, confirmationSent } }
        );
      } catch (updateError) {
        if (process.env.NODE_ENV === 'development') {
          console.error('MongoDB update error:', updateError);
        }
      }
    }

    // Return success if either DB save or email worked
    // Don't expose internal details like emailProvider to client
    if (savedSubmission || emailSent) {
      return NextResponse.json({ 
        success: true,
        message: 'Thank you for your message. We will get back to you soon!',
      });
    }

    // Both failed
    return NextResponse.json(
      { error: 'Failed to process contact form. Please try again or contact us directly.' },
      { status: 500 }
    );
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('Contact form error:', error);
    }
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
