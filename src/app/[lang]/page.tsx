import { getDictionary } from './dictionaries';
import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Banner from '@/components/Banner';
import Services from '@/components/Services';
import CustomerReviews from '@/components/CustomerReviews';
import Footer from '@/components/Footer';
import Script from 'next/script';
import type { Dict } from '@/types/dict';
import LazyComponent from '@/components/LazyComponent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!['en', 'es'].includes(lang)) notFound();
  const dict = await getDictionary(lang as 'en' | 'es');
  return {
    title: 'Core Business Capital - Best Business Funding Solutions Since 2016',
    description: dict.hero_subtitle || 'Secure SBA Loans, Term Loans & more for small businesses nationwide. 5.0 Google rating, A+ BBB. Serving all 50 states from Colorado.',
  };
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
}

export default async function Home({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!['en', 'es'].includes(lang)) notFound();
  const dict: Dict = await getDictionary(lang as 'en' | 'es');

  const schema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Core Business Capital",
    "description": "Premier loan agency for small business funding in the US since 2016.",
    "areaServed": "United States",
    "address": { "@type": "PostalAddress", "addressRegion": "Colorado" },
    "aggregateRating": { "@type": "AggregateRating", "ratingValue": "5.0", "reviewCount": "50" },
    "offers": [
      { "@type": "Service", "name": dict.services.sba },
      { "@type": "Service", "name": dict.services.term },
    ],
  };

  return (
  <>
    <Script 
      id="home-schema" 
      type="application/ld+json" 
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} 
    />
    <Header />
    <Hero dict={dict} />
    <Banner dict={dict} />
    <LazyComponent>
      <Services dict={dict} showSchema={false} lang={lang} />
    </LazyComponent>
    <LazyComponent>
      <CustomerReviews dict={dict} />
    </LazyComponent>
    <LazyComponent>
      <Footer dict={dict} />
    </LazyComponent>
  </>
);
}