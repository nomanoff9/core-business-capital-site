import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  message?: string;
}

export async function POST(request: NextRequest) {
  try {
    const body: ContactFormData = await request.json();
    const { name, email, phone, message } = body;

    // Validate required fields
    if (!name || !email || !phone) {
      return NextResponse.json(
        { error: 'Name, email, and phone are required' },
        { status: 400 }
      );
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email format' },
        { status: 400 }
      );
    }

    // Send email to Core Business Capital
    const { error } = await resend.emails.send({
      from: 'Core Business Capital <noreply@corebusinesscapital.com>',
      to: ['info@corebusinesscapital.com'],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #4d2508, #3d1e08); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">New Contact Form Submission</h1>
          </div>
          <div style="padding: 30px; background-color: #fdf6ef;">
            <h2 style="color: #3d1e08; margin-top: 0;">Contact Details</h2>
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd1; font-weight: bold; color: #5a3921; width: 120px;">Name:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd1; color: #3d1e08;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd1; font-weight: bold; color: #5a3921;">Email:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd1; color: #3d1e08;">
                  <a href="mailto:${email}" style="color: #d48125;">${email}</a>
                </td>
              </tr>
              <tr>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd1; font-weight: bold; color: #5a3921;">Phone:</td>
                <td style="padding: 10px 0; border-bottom: 1px solid #e8ddd1; color: #3d1e08;">
                  <a href="tel:${phone}" style="color: #d48125;">${phone}</a>
                </td>
              </tr>
              ${message ? `
              <tr>
                <td style="padding: 10px 0; font-weight: bold; color: #5a3921; vertical-align: top;">Message:</td>
                <td style="padding: 10px 0; color: #3d1e08;">${message.replace(/\n/g, '<br>')}</td>
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
      `,
    });

    if (error) {
      console.error('Resend error:', error);
      return NextResponse.json(
        { error: 'Failed to send email' },
        { status: 500 }
      );
    }

    // Send confirmation email to the user
    await resend.emails.send({
      from: 'Core Business Capital <noreply@corebusinesscapital.com>',
      to: [email],
      subject: 'Thank you for contacting Core Business Capital',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <div style="background: linear-gradient(to right, #4d2508, #3d1e08); padding: 20px; text-align: center;">
            <h1 style="color: white; margin: 0;">Thank You for Reaching Out!</h1>
          </div>
          <div style="padding: 30px; background-color: #fdf6ef;">
            <p style="color: #3d1e08; font-size: 16px; line-height: 1.6;">
              Dear ${name},
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
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
