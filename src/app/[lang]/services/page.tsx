import { getDictionary } from '../dictionaries';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Services from '@/components/Services';
import Banner from '@/components/Banner';
import CustomerReviews from '@/components/CustomerReviews';
import Footer from '@/components/Footer';
import LazyComponent from '@/components/LazyComponent';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!['en', 'es'].includes(lang)) notFound();
  const dict = await getDictionary(lang as 'en' | 'es');
  const baseUrl = 'https://corebusinesscapital.com';
  
  return {
    title: 'Business Financing Services - SBA Loans, Term Loans & More | Core Business Capital',
    description: `Explore our programs: ${dict.services.sba}, ${dict.services.equipment}, ${dict.services.invoice}, and more for small businesses in Colorado and nationwide since 2016.`,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}/services`,
      languages: {
        'en': `${baseUrl}/en/services`,
        'es': `${baseUrl}/es/services`,
        'x-default': `${baseUrl}/en/services`,
      },
    },
    openGraph: {
      title: 'Business Financing Services - SBA Loans, Term Loans & More | Core Business Capital',
      description: `Explore our programs for small businesses in Colorado and nationwide since 2016.`,
      url: `${baseUrl}/${lang}/services`,
      siteName: 'Core Business Capital',
      type: 'website',
      locale: lang === 'es' ? 'es_US' : 'en_US',
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!['en', 'es'].includes(lang)) notFound();
  const dict = await getDictionary(lang as 'en' | 'es');

  return (
    <>
      <Header />
      <Services dict={dict} showSchema={true} lang={lang} />
      <Banner dict={dict} />
      <LazyComponent>
        <CustomerReviews dict={dict} />
      </LazyComponent>
      <LazyComponent>
        <Footer dict={dict} />
      </LazyComponent>
    </>
  );
}