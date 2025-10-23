import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { notFound } from 'next/navigation';
import GoogleAnalytics from '@/components/GoogleAnalytics';
import UTMTracker from '@/components/UTMTracker';
import { Suspense } from 'react';
import { Analytics } from '@vercel/analytics/next';

const inter = Inter({ 
  subsets: ['latin'],
  display: 'swap', // Ensure text remains visible during webfont load
  preload: true,
});

export async function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'es' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!['en', 'es'].includes(lang)) {
    notFound();
  }
  return {
    title: 'Core Business Capital - Best Business Funding Solutions',
    description: 'Secure SBA Loans, Term Loans & more for small businesses nationwide since 2016. 5.0 Google rating, A+ BBB.',
    metadataBase: new URL('https://corebusinesscapital.com'),
    alternates: {
      canonical: `https://corebusinesscapital.com/${lang}`,
      languages: {
        'en': 'https://corebusinesscapital.com/en',
        'es': 'https://corebusinesscapital.com/es',
        'x-default': 'https://corebusinesscapital.com/en',
      },
    },
    openGraph: {
      title: 'Core Business Capital - Best Business Funding Solutions',
      description: 'Secure SBA Loans, Term Loans & more for small businesses nationwide since 2016.',
      url: `https://corebusinesscapital.com/${lang}`,
      siteName: 'Core Business Capital',
      locale: lang === 'es' ? 'es_US' : 'en_US',
      type: 'website',
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
    verification: {
      google: 'G-QVMLEDCCHV',
    },
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!['en', 'es'].includes(lang)) {
    notFound();
  }
  return (
    <html lang={lang}>
      <head>
        {/* Preload critical hero image for faster LCP */}
        <link 
          rel="preload"
          as="image"
          href="/_next/image?url=%2Fimages%2Fhero-bg.jpg&w=1080&q=60"
          imageSrcSet="/_next/image?url=%2Fimages%2Fhero-bg.jpg&w=640&q=60 640w, /_next/image?url=%2Fimages%2Fhero-bg.jpg&w=1080&q=60 1080w"
          imageSizes="(max-width: 480px) 100vw, 50vw"
          fetchPriority="high"
        />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics measurementId="G-QVMLEDCCHV" />
        {/* UTM Tracker for Bing Ads and other campaign tracking */}
        <Suspense fallback={null}>
          <UTMTracker />
        </Suspense>
        {children}
        <Analytics />
      </body>
    </html>
  );
}