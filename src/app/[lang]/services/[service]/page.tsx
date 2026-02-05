import { getDictionary } from '../../dictionaries';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import ServicesDetail from '@/components/ServicesDetail';
import CustomerReviews from '@/components/CustomerReviews';
import Footer from '@/components/Footer';
import SBACalculator from '@/components/SBACalculator';
import Script from 'next/script';

// Valid service keys
const validServices = ['sba', 'term', 'equipment', 'working', 'line', 'invoice', 'payroll', 'cash'];

// Service metadata mapping with bilingual support
const serviceMetadata = {
  sba: {
    en: {
      title: 'SBA Loans - Government-Backed Small Business Funding | Core Business Capital',
      description: 'Secure SBA 7(a) loans up to $5 million with competitive rates. Government-backed funding for small business expansion, real estate, and working capital since 2016.',
    },
    es: {
      title: 'Préstamos SBA - Financiamiento Gubernamental para Pequeñas Empresas | Core Business Capital',
      description: 'Obtenga préstamos SBA 7(a) de hasta $5 millones con tasas competitivas. Financiamiento respaldado por el gobierno para expansión, bienes raíces y capital de trabajo desde 2016.',
    },
    category: 'Government Loans'
  },
  term: {
    en: {
      title: 'Term Loans - Fixed-Rate Small Business Financing | Core Business Capital',
      description: 'Get term loans from $10,000 to $500,000 for business growth, equipment purchase, or debt consolidation. Fast approval for small businesses nationwide.',
    },
    es: {
      title: 'Préstamos a Plazo - Financiamiento a Tasa Fija para Pequeñas Empresas | Core Business Capital',
      description: 'Obtenga préstamos a plazo de $10,000 a $500,000 para crecimiento empresarial, compra de equipos o consolidación de deudas. Aprobación rápida para pequeñas empresas en todo el país.',
    },
    category: 'Traditional Loans'
  },
  equipment: {
    en: {
      title: 'Equipment Financing - Business Equipment Loans | Core Business Capital',
      description: 'Finance essential business equipment with terms up to 84 months. No upfront costs, competitive rates for machinery and equipment purchases.',
    },
    es: {
      title: 'Financiamiento de Equipos - Préstamos para Equipos Empresariales | Core Business Capital',
      description: 'Financie equipos empresariales esenciales con plazos de hasta 84 meses. Sin costos iniciales, tasas competitivas para compra de maquinaria y equipos.',
    },
    category: 'Asset Financing'
  },
  working: {
    en: {
      title: 'Working Capital Loans - Quick Business Cash | Core Business Capital',
      description: 'Access working capital loans from $5,000 to $100,000 for day-to-day operations, inventory, and payroll. Minimal documentation required.',
    },
    es: {
      title: 'Préstamos de Capital de Trabajo - Efectivo Rápido para Negocios | Core Business Capital',
      description: 'Acceda a préstamos de capital de trabajo de $5,000 a $100,000 para operaciones diarias, inventario y nómina. Documentación mínima requerida.',
    },
    category: 'Working Capital'
  },
  line: {
    en: {
      title: 'Lines of Credit - Revolving Business Credit | Core Business Capital',
      description: 'Get revolving lines of credit up to $250,000 for ongoing business needs. Draw funds as needed for seasonal fluctuations or unexpected expenses.',
    },
    es: {
      title: 'Líneas de Crédito - Crédito Rotativo para Empresas | Core Business Capital',
      description: 'Obtenga líneas de crédito rotativas de hasta $250,000 para necesidades empresariales continuas. Retire fondos según sea necesario para fluctuaciones estacionales o gastos inesperados.',
    },
    category: 'Credit Lines'
  },
  invoice: {
    en: {
      title: 'Invoice Financing - Factoring & Cash Advances | Core Business Capital',
      description: 'Unlock cash from unpaid invoices instantly. Factor up to 90% of invoice value for immediate business cash flow solutions.',
    },
    es: {
      title: 'Financiamiento de Facturas - Factoraje y Adelantos | Core Business Capital',
      description: 'Desbloquee efectivo de facturas impagas al instante. Factorice hasta el 90% del valor de la factura para soluciones inmediatas de flujo de efectivo.',
    },
    category: 'Invoice Financing'
  },
  payroll: {
    en: {
      title: 'Payroll Financing - Employee Payment Solutions | Core Business Capital',
      description: 'Ensure smooth payroll operations with financing solutions. Advance funds against future receivables to meet payroll deadlines.',
    },
    es: {
      title: 'Financiamiento de Nómina - Soluciones de Pago a Empleados | Core Business Capital',
      description: 'Asegure operaciones de nómina fluidas con soluciones de financiamiento. Adelante fondos contra cuentas por cobrar futuras para cumplir con plazos de nómina.',
    },
    category: 'Payroll Solutions'
  },
  cash: {
    en: {
      title: 'Business Cash Advances - Immediate Business Funding | Core Business Capital',
      description: 'Get immediate business cash advances up to $500,000 based on daily sales. No fixed repayments, ideal for urgent business needs.',
    },
    es: {
      title: 'Adelantos de Efectivo para Negocios - Financiamiento Inmediato | Core Business Capital',
      description: 'Obtenga adelantos de efectivo empresariales inmediatos de hasta $500,000 basados en ventas diarias. Sin pagos fijos, ideal para necesidades urgentes del negocio.',
    },
    category: 'Cash Advances'
  }
};

export async function generateStaticParams() {
  // Generate static paths for all services in both languages
  const services = [];
  for (const lang of ['en', 'es']) {
    for (const service of validServices) {
      services.push({ lang, service });
    }
  }
  return services;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string; service: string }>;
}): Promise<Metadata> {
  const { lang, service } = await params;
  
  if (!['en', 'es'].includes(lang) || !validServices.includes(service)) {
    notFound();
  }
  
  const serviceData = serviceMetadata[service as keyof typeof serviceMetadata];
  const localizedMeta = serviceData[lang as 'en' | 'es'];
  const baseUrl = 'https://corebusinesscapital.com';
  
  return {
    title: localizedMeta.title,
    description: localizedMeta.description,
    metadataBase: new URL(baseUrl),
    alternates: {
      canonical: `${baseUrl}/${lang}/services/${service}`,
      languages: {
        'en': `${baseUrl}/en/services/${service}`,
        'es': `${baseUrl}/es/services/${service}`,
        'x-default': `${baseUrl}/en/services/${service}`,
      },
    },
    openGraph: {
      title: localizedMeta.title,
      description: localizedMeta.description,
      url: `${baseUrl}/${lang}/services/${service}`,
      siteName: 'Core Business Capital',
      type: 'website',
      locale: lang === 'es' ? 'es_US' : 'en_US',
      images: [
        {
          url: `${baseUrl}/images/${service}-details.jpg`,
          width: 1200,
          height: 630,
          alt: localizedMeta.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: localizedMeta.title,
      description: localizedMeta.description,
      images: [`${baseUrl}/images/${service}-details.jpg`],
    },
    robots: {
      index: true,
      follow: true,
    },
  };
}

export default async function ServicePage({
  params,
}: {
  params: Promise<{ lang: string; service: string }>;
}) {
  const { lang, service } = await params;
  
  if (!['en', 'es'].includes(lang) || !validServices.includes(service)) {
    notFound();
  }
  
  const dict = await getDictionary(lang as 'en' | 'es');
  const serviceData = serviceMetadata[service as keyof typeof serviceMetadata];
  const localizedMeta = serviceData[lang as 'en' | 'es'];
  const isSpanish = lang === 'es';
  
  // Structured data for the specific service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": dict.services[service as keyof typeof dict.services],
    "description": localizedMeta.description,
    "category": serviceData.category,
    "provider": {
      "@type": "FinancialService",
      "name": "Core Business Capital",
      "foundingDate": "2016",
      "areaServed": {
        "@type": "Country",
        "name": "United States"
      },
      "address": {
        "@type": "PostalAddress",
        "addressRegion": "Colorado",
        "addressCountry": "US"
      },
      "aggregateRating": {
        "@type": "AggregateRating",
        "ratingValue": "5.0",
        "reviewCount": "50",
        "bestRating": "5"
      },
      "url": "https://corebusinesscapital.com"
    },
    "url": `https://corebusinesscapital.com/${lang}/services/${service}`,
    "applicationCategory": "Business Financing"
  };

  // Breadcrumb Schema
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": isSpanish ? "Inicio" : "Home",
        "item": `https://corebusinesscapital.com/${lang}`
      },
      {
        "@type": "ListItem",
        "position": 2,
        "name": isSpanish ? "Servicios" : "Services",
        "item": `https://corebusinesscapital.com/${lang}/services`
      },
      {
        "@type": "ListItem",
        "position": 3,
        "name": dict.services[service as keyof typeof dict.services],
        "item": `https://corebusinesscapital.com/${lang}/services/${service}`
      }
    ]
  };

  return (
    <>
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(breadcrumbSchema),
        }}
      />
      <Header />
      <ServicesDetail 
        dict={dict} 
        service={service}
        lang={lang}
      />
      {service === 'sba' && <SBACalculator dict={dict} lang={lang} />}
      <Banner dict={dict} />
      <CustomerReviews dict={dict} />
      <Footer dict={dict} lang={lang} />
    </>
  );
}
