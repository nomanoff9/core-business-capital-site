import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['en', 'es'];
const defaultLocale = 'en';

// Security headers to add to all responses
const securityHeaders = {
  'X-DNS-Prefetch-Control': 'on',
  'Strict-Transport-Security': 'max-age=63072000; includeSubDomains; preload',
  'X-Frame-Options': 'SAMEORIGIN',
  'X-Content-Type-Options': 'nosniff',
  'X-XSS-Protection': '1; mode=block',
  'Referrer-Policy': 'strict-origin-when-cross-origin',
  'Permissions-Policy': 'camera=(), microphone=(), geolocation=()',
  'Content-Security-Policy': [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com https://www.google.com https://www.gstatic.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: https: blob:",
    "font-src 'self' https://fonts.gstatic.com",
    "connect-src 'self' https://www.google-analytics.com https://analytics.google.com https://www.googletagmanager.com",
    "frame-src 'self' https://www.google.com",
    "frame-ancestors 'self'",
    "form-action 'self'",
    "base-uri 'self'",
    "object-src 'none'",
  ].join('; '),
};

// Map of old URLs to new URLs (from Tag Manager report - untagged legacy URLs)
// These are crawled/accessed but don't have GTM tags - redirect to tagged equivalents
const permanentRedirects: Record<string, string> = {
  // Blog (may be added in future)
  '/blog': '/en',
  '/blog/': '/en',
  
  // Service pages - redirect to new service URLs
  '/business-line-of-credit': '/en/services/line',
  '/business-term-loans': '/en/services/term',
  '/equipment-financing': '/en/services/equipment',
  '/invoicefinancing': '/en/services/invoice',
  '/merchant-cash-advance': '/en/services/cash',
  '/sba-loans': '/en/services/sba',
  '/working-capital': '/en/services/working',
  '/get-cash': '/en/services/cash',
  
  // Other legacy pages
  '/contact-us': '/en', // Redirect to home (or create contact page)
  '/industries': '/en/services',
  '/payment-processing': '/en/services',
  '/ppp': '/en', // PPP program ended - redirect to home
  '/tobacco-and-vape-shop-business-loan': '/en/services',
  '/unsubscribe': '/en', // No unsubscribe page in new site
  
  // Legal pages
  '/privacy': '/en/privacy',
  '/terms': '/en/terms',
  
  // Trailing slash versions
  '/business-line-of-credit/': '/en/services/line',
  '/business-term-loans/': '/en/services/term',
  '/equipment-financing/': '/en/services/equipment',
  '/invoicefinancing/': '/en/services/invoice',
  '/merchant-cash-advance/': '/en/services/cash',
  '/sba-loans/': '/en/services/sba',
  '/working-capital/': '/en/services/working',
  '/get-cash/': '/en/services/cash',
  '/contact-us/': '/en',
  '/industries/': '/en/services',
  '/payment-processing/': '/en/services',
  '/ppp/': '/en',
  '/tobacco-and-vape-shop-business-loan/': '/en/services',
  '/unsubscribe/': '/en',
  '/privacy/': '/en/privacy',
  '/terms/': '/en/terms',
};

function getLocale(request: NextRequest): string {
  const headers = { 'accept-language': request.headers.get('accept-language') || '' };
  const languages = new Negotiator({ headers }).languages();
  return match(languages, locales, defaultLocale);
}

// Helper to add security headers to a response
function addSecurityHeaders(response: NextResponse): NextResponse {
  Object.entries(securityHeaders).forEach(([key, value]) => {
    response.headers.set(key, value);
  });
  return response;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Handle permanent redirects (301) for old URLs
  if (permanentRedirects[pathname]) {
    const response = NextResponse.redirect(
      new URL(permanentRedirects[pathname], request.url),
      { status: 301 }
    );
    return addSecurityHeaders(response);
  }
  
  // Handle root path explicitly
  if (pathname === '/') {
    request.nextUrl.pathname = '/en';
    const response = NextResponse.redirect(request.nextUrl, { status: 308 });
    return addSecurityHeaders(response);
  }
  
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) {
    const response = NextResponse.next();
    return addSecurityHeaders(response);
  }

  // Redirect to default locale for all other paths
  const locale = defaultLocale;
  request.nextUrl.pathname = `/${locale}${pathname}`;
  const response = NextResponse.redirect(request.nextUrl, { status: 308 });
  return addSecurityHeaders(response);
}

export const config = {
  matcher: [
    '/((?!_next|_vercel|api|.*\\..*).*)',
  ],
};