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
  const baseUrl = 'https://corebusinesscapital.com';
  
  const title = lang === 'es'
    ? 'Servicios de Financiamiento Empresarial | Core Business Capital'
    : 'Business Financing Services | Core Business Capital';
  const description = lang === 'es'
    ? 'Explore nuestros programas de financiamiento: Préstamos SBA, Préstamos a Plazo, Financiamiento de Equipos y más para pequeñas empresas en Colorado y todo el país desde 2016.'
    : 'Explore our financing programs: SBA Loans, Term Loans, Equipment Financing, and more for small businesses in Colorado and nationwide since 2016.';
  
  return {
    title,
    description,
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
      title,
      description,
      url: `${baseUrl}/${lang}/services`,
      siteName: 'Core Business Capital',
      type: 'website',
      locale: lang === 'es' ? 'es_US' : 'en_US',
      images: [
        {
          url: `${baseUrl}/images/hero-bg.jpg`,
          width: 1200,
          height: 630,
          alt: 'Core Business Capital - Business Financing Services',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: [`${baseUrl}/images/hero-bg.jpg`],
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
        <Footer dict={dict} lang={lang} />
      </LazyComponent>
    </>
  );
}