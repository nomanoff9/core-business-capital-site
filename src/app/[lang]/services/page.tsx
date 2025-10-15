import { getDictionary } from '../dictionaries';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Services from '@/components/Services';
import Banner from '@/components/Banner';
import Footer from '@/components/Footer';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!['en', 'es'].includes(lang)) notFound();
  const dict = await getDictionary(lang as 'en' | 'es');
  return {
    title: 'Business Financing Services - SBA Loans, Term Loans & More | Core Business Capital',
    description: `Explore our programs: ${dict.services.sba}, ${dict.services.equipment}, ${dict.services.invoice}, and more for small businesses in Colorado and nationwide since 2016.`,
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
      <Footer dict={dict} />
    </>
  );
}