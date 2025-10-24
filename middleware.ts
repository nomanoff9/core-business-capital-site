import { NextRequest, NextResponse } from 'next/server';
import { match } from '@formatjs/intl-localematcher';
import Negotiator from 'negotiator';

const locales = ['en', 'es'];
const defaultLocale = 'en';

// Map of old URLs to new URLs (add any 404s found in GSC here)
const permanentRedirects: Record<string, string> = {
  // Old blog redirects to home (blog may be added in future)
  '/blog': '/en',
  '/blog/': '/en',
  // Add more redirects as found in Google Search Console
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