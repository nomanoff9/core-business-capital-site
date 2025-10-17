import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { notFound } from 'next/navigation';
import GoogleAnalytics from '@/components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });

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
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
      </head>
      <body className={inter.className}>
        <GoogleAnalytics measurementId="G-QVMLEDCCHV" />
        {children}
      </body>
    </html>
  );
}