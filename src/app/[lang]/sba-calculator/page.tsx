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
    keywords: isEnglish
      ? 'SBA loan calculator, SBA 7a calculator, small business loan calculator, SBA payment calculator, business loan estimator'
      : 'calculadora de préstamos SBA, calculadora SBA 7a, calculadora de préstamos para pequeñas empresas, calculadora de pagos SBA',
    openGraph: {
      title: isEnglish
        ? 'SBA Loan Calculator | Core Business Capital'
        : 'Calculadora de Préstamos SBA | Core Business Capital',
      description: isEnglish
        ? 'Calculate your estimated monthly payments for a 10-year SBA loan with our free calculator.'
        : 'Calcule sus pagos mensuales estimados para un préstamo SBA de 10 años con nuestra calculadora gratuita.',
      url: `https://corebusinesscapital.com/${lang}/sba-calculator`,
      siteName: 'Core Business Capital',
      locale: lang,
      type: 'website',
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
