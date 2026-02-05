import { getDictionary } from './dictionaries';
import type { Metadata, Viewport } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import Banner from '@/components/Banner';
import Services from '@/components/Services';
import CustomerReviews from '@/components/CustomerReviews';
import PFSCopilot from '@/components/PFSCopilot';
import SBACalculator from '@/components/SBACalculator';
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
  const baseUrl = 'https://corebusinesscapital.com';
  
  const title = lang === 'es'
    ? 'Mejores Soluciones de Financiamiento Empresarial Desde 2016 | Core Business Capital'
    : 'Best Business Funding Solutions Since 2016 | Core Business Capital';
  const description = lang === 'es'
    ? dict.hero_subtitle || 'Obtenga préstamos SBA, préstamos a plazo y más para pequeñas empresas en todo el país. Calificación 5.0 en Google, A+ BBB. Sirviendo a los 50 estados desde Colorado.'
    : dict.hero_subtitle || 'Secure SBA Loans, Term Loans & more for small businesses nationwide. 5.0 Google rating, A+ BBB. Serving all 50 states from Colorado.';
  
  return {
    title,
    description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}`,
      languages: {
        'en': `${baseUrl}/en`,
        'es': `${baseUrl}/es`,
        'x-default': `${baseUrl}/en`,
      },
    },
    openGraph: {
      title,
      description,
      url: `${baseUrl}/${lang}`,
      siteName: 'Core Business Capital',
      type: 'website',
      locale: lang === 'es' ? 'es_US' : 'en_US',
      images: [
        {
          url: `${baseUrl}/images/hero-bg.jpg`,
          width: 1200,
          height: 630,
          alt: 'Core Business Capital - Business Funding Solutions',
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
  const isSpanish = lang === 'es';

  // LocalBusiness Schema with complete NAP
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialService",
    "name": "Core Business Capital",
    "description": isSpanish 
      ? "Agencia líder de préstamos para financiamiento de pequeñas empresas en EE.UU. desde 2016."
      : "Premier loan agency for small business funding in the US since 2016.",
    "url": "https://corebusinesscapital.com",
    "logo": "https://corebusinesscapital.com/images/logo.png",
    "image": "https://corebusinesscapital.com/images/hero-bg.jpg",
    "telephone": "+1-720-222-3396",
    "email": "info@corebusinesscapital.com",
    "foundingDate": "2016",
    "priceRange": "$5,000 - $5,000,000",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "Colorado",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "Country",
      "name": "United States"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "50",
      "bestRating": "5",
      "worstRating": "1"
    },
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": isSpanish ? "Servicios de Financiamiento Empresarial" : "Business Funding Services",
      "itemListElement": [
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": dict.services.sba } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": dict.services.term } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": dict.services.equipment } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": dict.services.working } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": dict.services.line } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": dict.services.invoice } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": dict.services.payroll } },
        { "@type": "Offer", "itemOffered": { "@type": "Service", "name": dict.services.cash } }
      ]
    },
    "sameAs": [
      "https://www.linkedin.com/company/corebusinesscapital",
      "https://www.yelp.com/biz/core-business-capital"
    ]
  };

  // Review Schema with sample reviews
  const reviewSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Core Business Capital",
    "review": [
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Michael R."
        },
        "reviewBody": isSpanish 
          ? "Core Business Capital me ayudó a obtener un préstamo SBA cuando otros no pudieron. Proceso profesional y transparente de principio a fin."
          : "Core Business Capital helped me secure an SBA loan when others couldn't. Professional and transparent process from start to finish."
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "Sarah T."
        },
        "reviewBody": isSpanish
          ? "Excelente servicio! Obtuvieron el financiamiento de mi equipo en tiempo récord. Muy recomendado para cualquier propietario de pequeña empresa."
          : "Excellent service! They got my equipment financing done in record time. Highly recommend for any small business owner."
      },
      {
        "@type": "Review",
        "reviewRating": {
          "@type": "Rating",
          "ratingValue": "5",
          "bestRating": "5"
        },
        "author": {
          "@type": "Person",
          "name": "David L."
        },
        "reviewBody": isSpanish
          ? "El equipo de Core Business Capital fue increíble. Me guiaron a través del proceso del préstamo SBA y aseguraron las mejores tasas posibles."
          : "The team at Core Business Capital was amazing. They walked me through the SBA loan process and secured the best rates possible."
      }
    ]
  };

  // FAQ Schema
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": isSpanish ? "¿Qué tipos de préstamos empresariales ofrece Core Business Capital?" : "What types of business loans does Core Business Capital offer?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isSpanish 
            ? "Ofrecemos 8 programas de financiamiento: Préstamos SBA, Préstamos a Plazo, Financiamiento de Equipos, Préstamos de Capital de Trabajo, Líneas de Crédito, Financiamiento de Facturas, Financiamiento de Nómina y Adelantos de Efectivo para Negocios."
            : "We offer 8 financing programs: SBA Loans, Term Loans, Equipment Financing, Working Capital Loans, Lines of Credit, Invoice Financing, Payroll Financing, and Business Cash Advances."
        }
      },
      {
        "@type": "Question",
        "name": isSpanish ? "¿Cuánto financiamiento puedo obtener?" : "How much funding can I get?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isSpanish
            ? "Ofrecemos financiamiento desde $5,000 hasta $5,000,000 dependiendo del programa y las calificaciones de su negocio. Los préstamos SBA pueden llegar hasta $5 millones, mientras que otros programas varían en montos máximos."
            : "We offer funding from $5,000 up to $5,000,000 depending on the program and your business qualifications. SBA loans can go up to $5 million, while other programs vary in maximum amounts."
        }
      },
      {
        "@type": "Question",
        "name": isSpanish ? "¿Qué estados atiende Core Business Capital?" : "What states does Core Business Capital serve?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isSpanish
            ? "Atendemos a pequeñas empresas en los 50 estados de EE.UU. desde nuestra base en Colorado. Ya sea que esté en California, Texas, Nueva York o cualquier otro estado, podemos ayudarle a obtener financiamiento."
            : "We serve small businesses in all 50 US states from our Colorado base. Whether you're in California, Texas, New York, or any other state, we can help you secure funding."
        }
      },
      {
        "@type": "Question",
        "name": isSpanish ? "¿Cuánto tiempo toma obtener la aprobación?" : "How long does it take to get approved?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isSpanish
            ? "Los tiempos de aprobación varían según el programa. Los adelantos de efectivo pueden ser aprobados en 24-48 horas, mientras que los préstamos SBA típicamente toman 30-90 días debido a los requisitos gubernamentales. Nuestro equipo trabaja para acelerar cada solicitud."
            : "Approval times vary by program. Cash advances can be approved in 24-48 hours, while SBA loans typically take 30-90 days due to government requirements. Our team works to expedite every application."
        }
      },
      {
        "@type": "Question",
        "name": isSpanish ? "¿Afecta solicitar un préstamo mi puntuación de crédito?" : "Does applying for a loan affect my credit score?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": isSpanish
            ? "La pre-calificación inicial no afecta su puntuación de crédito (consulta suave). Solo hacemos una consulta de crédito dura cuando avanza hacia la aprobación final, lo cual minimiza el impacto en su crédito durante la fase de compras."
            : "Initial pre-qualification does not affect your credit score (soft pull). We only do a hard credit inquiry when you move forward to final approval, which minimizes credit impact during the shopping phase."
        }
      }
    ]
  };

  return (
  <>
    <Script 
      id="local-business-schema" 
      type="application/ld+json" 
      dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} 
    />
    <Script 
      id="review-schema" 
      type="application/ld+json" 
      dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }} 
    />
    <Script 
      id="faq-schema" 
      type="application/ld+json" 
      dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} 
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
      <PFSCopilot dict={dict} />
    </LazyComponent>
    <LazyComponent>
      <SBACalculator dict={dict} lang={lang} />
    </LazyComponent>
    <LazyComponent>
      <Footer dict={dict} lang={lang} />
    </LazyComponent>
  </>
);
}