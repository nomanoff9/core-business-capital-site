'use client';
import { motion } from 'framer-motion';
import Script from 'next/script';
import NextImage from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import type { Dict } from '@/types/dict';

interface ServicesProps {
  dict: Dict;
  showSchema?: boolean;
  lang?: string;
}

const serviceKeys = [
  { key: 'sba', titleKey: 'sba', icon: '/images/sba-icon.jpg', category: 'Government Loans' },
  { key: 'term', titleKey: 'term', icon: '/images/term-icon.jpg', category: 'Traditional Loans' },
  { key: 'equipment', titleKey: 'equipment', icon: '/images/equipment-icon.jpg', category: 'Asset Financing' },
  { key: 'working', titleKey: 'working', icon: '/images/working-icon.jpg', category: 'Working Capital' },
  { key: 'line', titleKey: 'line', icon: '/images/line-icon.jpg', category: 'Credit Lines' },
  { key: 'invoice', titleKey: 'invoice', icon: '/images/invoice-icon.jpg', category: 'Invoice Financing' },
  { key: 'payroll', titleKey: 'payroll', icon: '/images/payroll-icon.jpg', category: 'Payroll Solutions' },
  { key: 'cash', titleKey: 'cash', icon: '/images/cash-icon.jpg', category: 'Cash Advances' },
];

// Memoized Services component for better performance
const Services = memo(function Services({ dict, showSchema = false, lang = 'en' }: ServicesProps) {
  const servicesForSchema = serviceKeys.map(s => ({
    "@type": "Service",
    "name": dict.services[s.titleKey],
    "description": dict.services[`${s.key}_desc`],
    "category": s.category,
    "provider": {
      "@type": "FinancialService",
      "name": "Core Business Capital"
    }
  }));

  // Common card styles for DRY principle
  const cardStyles = "bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group hover:bg-gradient-to-br hover:from-yellow-50 hover:to-orange-50 cursor-pointer";
  const cardPadding = { padding: '4px' };
  const titleStyles = "text-lg font-bold text-center group-hover:text-orange-700 transition-colors duration-300";
  const descStyles = "text-sm leading-relaxed group-hover:text-gray-700 transition-colors duration-300 text-center";

  return (
    <>
      {showSchema && (
        <Script
          id="structured-data-services"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "FinancialService",
              "name": "Core Business Capital",
              "description": "Comprehensive business funding solutions helping small businesses secure financing since 2016.",
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
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Business Funding Services",
                "itemListElement": servicesForSchema
              },
              "url": "https://corebusinesscapital.com",
              "foundingDate": "2016"
            }),
          }}
        />
      )}
      <section 
        className="py-16 px-4" 
        style={{ backgroundColor: '#f4eda9', marginTop: '8px' }}
        role="main"
        aria-labelledby="services-heading"
        itemScope
        itemType="https://schema.org/Service"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.h2
            id="services-heading"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            className="text-3xl lg:text-4xl font-bold text-center mb-12"
            style={{ color: '#000000', marginTop: '0px' }}
            itemProp="name"
          >
            {dict.services.title}
          </motion.h2>

          {/* Desktop Layout: 2 rows x 4 columns (768px and above) */}
          <div className="hidden min-[768px]:grid grid-cols-4 grid-rows-2 gap-6 p-1" role="list" aria-label="Business funding services">
            {serviceKeys.map((service, i) => (
              <Link 
                key={service.key}
                href={`/${lang}/services/${service.key}`}
                className="block h-full no-underline"
              >
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={cardStyles}
                  style={cardPadding}
                  role="listitem"
                  itemScope
                  itemType="https://schema.org/Service"
                  aria-labelledby={`service-title-${service.key}-desktop`}
                >
                  {/* Top Row: Image */}
                  <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-yellow-100 group-hover:to-orange-100 transition-all duration-300 h-24">
                    <div className="w-12 h-12">
                      <NextImage
                        src={service.icon}
                        alt={`${dict.services[service.titleKey]} icon - ${service.category}`}
                        width={48}
                        height={48}
                        className="transition-transform duration-300 group-hover:scale-110 w-full h-full object-contain"
                        loading="lazy"
                        quality={85}
                      />
                    </div>
                  </div>
                  
                  {/* Bottom Row: Title and Description */}
                  <div className="p-6 space-y-3">
                    <h3 
                      id={`service-title-${service.key}-desktop`}
                      className={titleStyles} 
                      style={{ color: '#000000' }}
                      itemProp="name"
                    >
                      {dict.services[service.titleKey]}
                    </h3>
                    <p 
                      className={descStyles} 
                      style={{ color: '#000000' }}
                      itemProp="description"
                    >
                      {dict.services[`${service.key}_desc`]}
                    </p>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>

          {/* Tablet Layout: 4 rows x 2 columns (480px to 767px) */}
          <div className="hidden min-[480px]:max-[767px]:grid grid-cols-2 gap-6 p-1" role="list" aria-label="Business funding services">
              {serviceKeys.map((service, i) => (
                <Link 
                  key={service.key}
                  href={`/${lang}/services/${service.key}`}
                  className="block h-full no-underline"
                >
                  <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className={cardStyles}
                    style={cardPadding}
                    role="listitem"
                    itemScope
                    itemType="https://schema.org/Service"
                    aria-labelledby={`service-title-${service.key}-tablet`}
                  >
                    {/* Top Row: Image */}
                    <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-yellow-100 group-hover:to-orange-100 transition-all duration-300 h-20">
                      <div className="w-10 h-10">
                        <NextImage
                          src={service.icon}
                          alt={`${dict.services[service.titleKey]} icon - ${service.category}`}
                          width={40}
                          height={40}
                          className="transition-transform duration-300 group-hover:scale-110 w-full h-full object-contain"
                          loading="lazy"
                          quality={85}
                        />
                      </div>
                    </div>
                    
                    {/* Bottom Row: Title and Description */}
                    <div className="p-5 space-y-3">
                      <h3 
                        id={`service-title-${service.key}-tablet`}
                        className={titleStyles} 
                        style={{ color: '#000000' }}
                        itemProp="name"
                      >
                        {dict.services[service.titleKey]}
                      </h3>
                      <p 
                        className={descStyles} 
                        style={{ color: '#000000' }}
                        itemProp="description"
                      >
                        {dict.services[`${service.key}_desc`]}
                      </p>
                    </div>
                  </motion.article>
                </Link>
              ))}
          </div>

          {/* Mobile Layout: Single column (Below 480px) */}
          <div className="block min-[480px]:hidden space-y-6 p-1" role="list" aria-label="Business funding services">
            {serviceKeys.map((service, i) => (
              <Link 
                key={service.key}
                href={`/${lang}/services/${service.key}`}
                className="block no-underline"
              >
                <motion.article
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className={`${cardStyles} max-w-sm mx-auto`}
                  style={cardPadding}
                  role="listitem"
                  itemScope
                  itemType="https://schema.org/Service"
                  aria-labelledby={`service-title-${service.key}-mobile`}
                >
                  {/* Top Row: Image */}
                  <div className="flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 group-hover:from-yellow-100 group-hover:to-orange-100 transition-all duration-300 h-16">
                    <div className="w-8 h-8">
                      <NextImage
                        src={service.icon}
                        alt={`${dict.services[service.titleKey]} icon - ${service.category}`}
                        width={32}
                        height={32}
                        className="transition-transform duration-300 group-hover:scale-110 w-full h-full object-contain"
                        loading="lazy"
                        quality={85}
                      />
                    </div>
                  </div>
                  
                  {/* Bottom Row: Title and Description */}
                  <div className="p-5 space-y-3">
                    <h3 
                      id={`service-title-${service.key}-mobile`}
                      className={titleStyles} 
                      style={{ color: '#000000' }}
                      itemProp="name"
                    >
                      {dict.services[service.titleKey]}
                    </h3>
                    <p 
                      className={descStyles} 
                      style={{ color: '#000000' }}
                      itemProp="description"
                    >
                      {dict.services[`${service.key}_desc`]}
                    </p>
                  </div>
                </motion.article>
              </Link>
            ))}
          </div>

        </div>
      </section>
    </>
  );
});

export default Services;