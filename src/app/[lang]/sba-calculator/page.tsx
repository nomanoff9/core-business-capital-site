import { getDictionary } from '../dictionaries';
import type { Metadata } from 'next';
import Header from '@/components/Header';
import SBACalculator from '@/components/SBACalculator';
import Banner from '@/components/Banner';
import PFSCopilot from '@/components/PFSCopilot';
import Footer from '@/components/Footer';

export async function generateMetadata({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}): Promise<Metadata> {
  const { lang } = await params;
  
  const isEnglish = lang === 'en';
  
  return {
    title: isEnglish 
      ? 'SBA Loan Calculator | Core Business Capital'
      : 'Calculadora de Préstamos SBA | Core Business Capital',
    description: isEnglish
      ? 'Calculate your estimated monthly payments for a 10-year SBA loan. Free SBA loan calculator with real-time amortization calculations. Current rates: Prime + 2.5%.'
      : 'Calcule sus pagos mensuales estimados para un préstamo SBA de 10 años. Calculadora gratuita de préstamos SBA con cálculos de amortización en tiempo real. Tasas actuales: Prime + 2.5%.',
    metadataBase: new URL('https://corebusinesscapital.com'),
    alternates: {
      canonical: `https://corebusinesscapital.com/${lang}/sba-calculator`,
      languages: {
        'en': 'https://corebusinesscapital.com/en/sba-calculator',
        'es': 'https://corebusinesscapital.com/es/sba-calculator',
        'x-default': 'https://corebusinesscapital.com/en/sba-calculator',
      },
    },
    openGraph: {
      title: isEnglish
        ? 'SBA Loan Calculator | Core Business Capital'
        : 'Calculadora de Préstamos SBA | Core Business Capital',
      description: isEnglish
        ? 'Calculate your estimated monthly payments for a 10-year SBA loan with our free calculator.'
        : 'Calcule sus pagos mensuales estimados para un préstamo SBA de 10 años con nuestra calculadora gratuita.',
      url: `https://corebusinesscapital.com/${lang}/sba-calculator`,
      siteName: 'Core Business Capital',
      locale: lang === 'es' ? 'es_US' : 'en_US',
      type: 'website',
      images: [
        {
          url: 'https://corebusinesscapital.com/images/hero-bg.jpg',
          width: 1200,
          height: 630,
          alt: 'SBA Loan Calculator - Core Business Capital',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: isEnglish
        ? 'SBA Loan Calculator | Core Business Capital'
        : 'Calculadora de Préstamos SBA | Core Business Capital',
      description: isEnglish
        ? 'Calculate your estimated monthly payments for a 10-year SBA loan with our free calculator.'
        : 'Calcule sus pagos mensuales estimados para un préstamo SBA de 10 años con nuestra calculadora gratuita.',
      images: ['https://corebusinesscapital.com/images/hero-bg.jpg'],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function SBACalculatorPage({ 
  params 
}: { 
  params: Promise<{ lang: string }> 
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang as 'en' | 'es');

  return (
    <>
      <Header />
      <main>
        <SBACalculator dict={dict} lang={lang} />
        <Banner dict={dict} />
        <PFSCopilot dict={dict} />
      </main>
      <Footer dict={dict} lang={lang} />
    </>
  );
}
