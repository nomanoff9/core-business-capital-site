import { getDictionary } from '../dictionaries';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import type { Dict } from '@/types/dict';
import ContactForm from '@/components/ContactForm';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  if (!['en', 'es'].includes(lang)) notFound();
  const baseUrl = 'https://corebusinesscapital.com';
  
  const title = lang === 'es' 
    ? 'Contáctenos | Core Business Capital'
    : 'Contact Us | Core Business Capital';
  const description = lang === 'es'
    ? 'Contáctenos para cualquier pregunta sobre financiamiento para pequeñas empresas. Estamos aquí para ayudarle.'
    : 'Contact us for any questions about small business financing. We are here to help you.';
  
  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}/contact`,
      languages: {
        'en': `${baseUrl}/en/contact`,
        'es': `${baseUrl}/es/contact`,
        'x-default': `${baseUrl}/en/contact`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}/contact`,
      siteName: 'Core Business Capital',
      type: 'website',
      locale: lang === 'es' ? 'es_US' : 'en_US',
      images: [
        {
          url: `${baseUrl}/images/hero-bg.jpg`,
          width: 1200,
          height: 630,
          alt: 'Contact Core Business Capital - Business Funding Experts',
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

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  if (!['en', 'es'].includes(lang)) notFound();
  const dict: Dict = await getDictionary(lang as 'en' | 'es');

  return (
    <>
      <Header />
      <main className="min-h-screen bg-gradient-to-b from-[#fdf6ef] to-[#f5e6d3] pt-24 pb-16">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Contact Form Card - Elevated with shadow and border */}
          <div className="bg-white rounded-3xl shadow-2xl border border-[#e8ddd1] overflow-hidden transform hover:shadow-[0_25px_60px_-15px_rgba(61,30,8,0.25)] transition-shadow duration-300">
            {/* Card Header */}
            <div className="bg-gradient-to-r from-[#4d2508] to-[#3d1e08] px-8 py-10 text-center">
              <h1 className="text-3xl sm:text-4xl font-bold text-white mb-3">
                {dict.contact.title}
              </h1>
              <p className="text-base sm:text-lg text-[#f3f4f6]/90 max-w-md mx-auto">
                {dict.contact.subtitle}
              </p>
            </div>
            
            {/* Card Body - Form */}
            <div className="px-8 sm:px-12 py-10">
              <ContactForm dict={dict} />
            </div>

            {/* Card Footer - Alternative Contact */}
            <div className="bg-[#fdf6ef] border-t border-[#e8ddd1] px-8 py-6 text-center">
              <p className="text-sm font-medium text-[#5a3921] mb-3">
                {dict.contact.alternativeTitle}
              </p>
              <div className="flex flex-col sm:flex-row gap-3 justify-center items-center text-sm">
                <a 
                  href="mailto:info@corebusinesscapital.com"
                  className="inline-flex items-center gap-2 text-[#d48125] hover:text-[#3d1e08] transition-colors font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  info@corebusinesscapital.com
                </a>
                <span className="hidden sm:inline text-[#c9b99a]">•</span>
                <a 
                  href="tel:+17202223396"
                  className="inline-flex items-center gap-2 text-[#d48125] hover:text-[#3d1e08] transition-colors font-medium"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  (720) 222-3396
                </a>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer dict={dict} />
    </>
  );
}
