/**
 * Security utilities for the Core Business Capital website
 */

/**
 * Escape HTML special characters to prevent XSS attacks
 */
export function escapeHtml(text: string): string {
  const htmlEntities: Record<string, string> = {
    '&': '&amp;',
    '<': '&lt;',
    '>': '&gt;',
    '"': '&quot;',
    "'": '&#x27;',
    '/': '&#x2F;',
    '`': '&#x60;',
    '=': '&#x3D;',
  };
  
  return text.replace(/[&<>"'`=/]/g, (char) => htmlEntities[char] || char);
}

/**
 * Simple in-memory rate limiter for API routes
 * In production, consider using Vercel KV or Redis for distributed rate limiting
 */
interface RateLimitEntry {
  count: number;
  resetTime: number;
}

const rateLimitStore = new Map<string, RateLimitEntry>();

// Clean up old entries every 5 minutes
if (typeof setInterval !== 'undefined') {
  setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimitStore.entries()) {
      if (now > entry.resetTime) {
        rateLimitStore.delete(key);
      }
    }
  }, 5 * 60 * 1000);
}

export interface RateLimitResult {
  success: boolean;
  remaining: number;
  resetIn: number; // seconds until reset
}

/**
 * Check if a request should be rate limited
 * @param identifier - Unique identifier (IP address, user ID, etc.)
 * @param maxRequests - Maximum requests allowed in the window
 * @param windowMs - Time window in milliseconds
 */
export function checkRateLimit(
  identifier: string,
  maxRequests: number = 5,
  windowMs: number = 60 * 1000 // 1 minute default
): RateLimitResult {
  const now = Date.now();
  const entry = rateLimitStore.get(identifier);

  if (!entry || now > entry.resetTime) {
    // Create new entry
    rateLimitStore.set(identifier, {
      count: 1,
      resetTime: now + windowMs,
    });
    return {
      success: true,
      remaining: maxRequests - 1,
      resetIn: Math.ceil(windowMs / 1000),
    };
  }

  if (entry.count >= maxRequests) {
    return {
      success: false,
      remaining: 0,
      resetIn: Math.ceil((entry.resetTime - now) / 1000),
    };
  }

  entry.count++;
  return {
    success: true,
    remaining: maxRequests - entry.count,
    resetIn: Math.ceil((entry.resetTime - now) / 1000),
  };
}

/**
 * Input validation constants
 */
export const INPUT_LIMITS = {
  name: { min: 1, max: 100 },
  email: { min: 5, max: 254 },
  phone: { min: 7, max: 20 },
  message: { min: 0, max: 2000 },
};

/**
 * Validate input length
 */
export function validateInputLength(
  value: string,
  field: keyof typeof INPUT_LIMITS
): { valid: boolean; error?: string } {
  const limits = INPUT_LIMITS[field];
  
  if (value.length < limits.min) {
    return { valid: false, error: `${field} is too short (minimum ${limits.min} characters)` };
  }
  
  if (value.length > limits.max) {
    return { valid: false, error: `${field} is too long (maximum ${limits.max} characters)` };
  }
  
  return { valid: true };
}

/**
 * Sanitize phone number - only allow digits, spaces, dashes, parentheses, and plus
 */
export function sanitizePhone(phone: string): string {
  return phone.replace(/[^\d\s\-()+ ]/g, '').trim();
}

/**
 * Get client IP address from request headers
 */
export function getClientIp(request: Request): string {
  // Vercel/Cloudflare headers
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  
  const realIp = request.headers.get('x-real-ip');
  if (realIp) {
    return realIp;
  }
  
  // Fallback
  return 'unknown';
}
