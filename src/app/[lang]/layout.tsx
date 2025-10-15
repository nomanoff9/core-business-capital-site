import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import '../globals.css';
import { notFound } from 'next/navigation';

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
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}