import { getDictionary } from '../../dictionaries';
import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Header from '@/components/Header';
import Banner from '@/components/Banner';
import ServicesDetail from '@/components/ServicesDetail';
import CustomerReviews from '@/components/CustomerReviews';
import Footer from '@/components/Footer';
import Script from 'next/script';

// Valid service keys
const validServices = ['sba', 'term', 'equipment', 'working', 'line', 'invoice', 'payroll', 'cash'];

// Service metadata mapping
const serviceMetadata = {
  sba: {
    title: 'SBA Loans - Government-Backed Small Business Funding | Core Business Capital',
    description: 'Secure SBA 7(a) loans up to $5 million with competitive rates. Government-backed funding for small business expansion, real estate, and working capital since 2016.',
    category: 'Government Loans'
  },
  term: {
    title: 'Term Loans - Fixed-Rate Small Business Financing | Core Business Capital',
    description: 'Get term loans from $10,000 to $500,000 for business growth, equipment purchase, or debt consolidation. Fast approval for small businesses nationwide.',
    category: 'Traditional Loans'
  },
  equipment: {
    title: 'Equipment Financing - Business Equipment Loans | Core Business Capital',
    description: 'Finance essential business equipment with terms up to 84 months. No upfront costs, competitive rates for machinery and equipment purchases.',
    category: 'Asset Financing'
  },
  working: {
    title: 'Working Capital Loans - Quick Business Cash | Core Business Capital',
    description: 'Access working capital loans from $5,000 to $100,000 for day-to-day operations, inventory, and payroll. Minimal documentation required.',
    category: 'Working Capital'
  },
  line: {
    title: 'Lines of Credit - Revolving Business Credit | Core Business Capital',
    description: 'Get revolving lines of credit up to $250,000 for ongoing business needs. Draw funds as needed for seasonal fluctuations or unexpected expenses.',
    category: 'Credit Lines'
  },
  invoice: {
    title: 'Invoice Financing - Factoring & Cash Advances | Core Business Capital',
    description: 'Unlock cash from unpaid invoices instantly. Factor up to 90% of invoice value for immediate business cash flow solutions.',
    category: 'Invoice Financing'
  },
  payroll: {
    title: 'Payroll Financing - Employee Payment Solutions | Core Business Capital',
    description: 'Ensure smooth payroll operations with financing solutions. Advance funds against future receivables to meet payroll deadlines.',
    category: 'Payroll Solutions'
  },
  cash: {
    title: 'Business Cash Advances - Immediate Business Funding | Core Business Capital',
    description: 'Get immediate business cash advances up to $500,000 based on daily sales. No fixed repayments, ideal for urgent business needs.',
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
  
  const dict = await getDictionary(lang as 'en' | 'es');
  const metadata = serviceMetadata[service as keyof typeof serviceMetadata];
  
  return {
    title: metadata.title,
    description: metadata.description,
    keywords: `${dict.services[service as keyof typeof dict.services]}, small business loans, business financing, Core Business Capital, Colorado, ${metadata.category}`,
    openGraph: {
      title: metadata.title,
      description: metadata.description,
      type: 'website',
      locale: lang === 'es' ? 'es_US' : 'en_US',
    },
    alternates: {
      languages: {
        en: `/en/services/${service}`,
        es: `/es/services/${service}`,
      },
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
  const metadata = serviceMetadata[service as keyof typeof serviceMetadata];
  
  // Structured data for the specific service
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "FinancialProduct",
    "name": dict.services[service as keyof typeof dict.services],
    "description": dict.services[`${service}_desc` as keyof typeof dict.services],
    "category": metadata.category,
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

  return (
    <>
      <Script
        id="service-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(serviceSchema),
        }}
      />
      <Header />
      <ServicesDetail 
        dict={dict} 
        service={service}
        lang={lang}
      />
      <Banner dict={dict} />
      <CustomerReviews dict={dict} />
      <Footer dict={dict} />
    </>
  );
}
