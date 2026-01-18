import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['en', 'es'];
const defaultLocale = 'en';

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

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // Handle permanent redirects (301) for old URLs
  if (permanentRedirects[pathname]) {
    return NextResponse.redirect(
      new URL(permanentRedirects[pathname], request.url),
      { status: 301 }
    );
  }
  
  // Handle root path explicitly
  if (pathname === '/') {
    request.nextUrl.pathname = '/en';
    return NextResponse.redirect(request.nextUrl, { status: 308 });
  }
  
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return NextResponse.next();

  // Redirect to default locale for all other paths
  const locale = defaultLocale;
  request.nextUrl.pathname = `/${locale}${pathname}`;
  return NextResponse.redirect(request.nextUrl, { status: 308 });
}

export const config = {
  matcher: [
    '/((?!_next|_vercel|api|.*\\..*).*)',
  ],
};