'use client';
import NextImage from 'next/image';
import Link from 'next/link';
import { memo } from 'react';
import type { Dict } from '@/types/dict';

interface ServicesDetailProps {
  dict: Dict;
  service: string;
  lang?: string;
}

// Service icon mapping
const serviceIcons = {
  sba: '/images/sba-icon.jpg',
  term: '/images/term-icon.jpg',
  equipment: '/images/equipment-icon.jpg',
  working: '/images/working-icon.jpg',
  line: '/images/line-icon.jpg',
  invoice: '/images/invoice-icon.jpg',
  payroll: '/images/payroll-icon.jpg',
  cash: '/images/cash-icon.jpg',
};

// Service detail images mapping
const serviceDetailImages = {
  sba: '/images/sba-details.jpg',
  term: '/images/term-details.jpg',
  equipment: '/images/equipment-details.jpg',
  working: '/images/working-details.jpg',
  line: '/images/line-details.jpg',
  invoice: '/images/invoice-details.jpg',
  payroll: '/images/payroll-details.jpg',
  cash: '/images/cash-details.jpg',
};

// Memoized ServicesDetail component for better performance
const ServicesDetail = memo(function ServicesDetail({ dict, service, lang = 'en' }: ServicesDetailProps) {
  const serviceIcon = serviceIcons[service as keyof typeof serviceIcons];
  const serviceDetailImage = serviceDetailImages[service as keyof typeof serviceDetailImages];
  const serviceName = dict.services[service as keyof typeof dict.services];
  const serviceDescription = dict.services[`${service}_desc` as keyof typeof dict.services];
  
  // Type for service detail data
  type ServiceDetailData = {
    qualifications: string[];
    paperwork: string[];
    benefits: string[];
  };
  
  // Service-specific details from dictionary
  const serviceDetails: ServiceDetailData = (dict.serviceDetails[service as 'sba' | 'term' | 'equipment' | 'working' | 'line' | 'invoice' | 'payroll' | 'cash']) || {
    qualifications: [
      "Business operational for at least 1 year",
      "Minimum annual revenue requirements vary by program", 
      "Personal credit score considerations apply",
      "Complete business documentation required"
    ],
    paperwork: [
      "Business tax returns (2 years)",
      "Personal tax returns (2 years)", 
      "Bank statements (3 months)",
      "Financial statements",
      "Business license and registration",
      "Use of funds documentation"
    ],
    benefits: [
      "Competitive interest rates",
      "Flexible repayment terms",
      "Expert guidance throughout process",
      "Fast approval decisions"
    ]
  };

  // CTA button styles to match Hero section
  const ctaButtonStyles = {
    backgroundColor: '#ea9a20',
    color: 'white'
  };

  const handleCtaHover = (e: React.MouseEvent<HTMLDivElement>, isEntering: boolean) => {
    e.currentTarget.style.backgroundColor = isEntering ? '#efba22' : '#ea9a20';
  };

  return (
    <section 
      className="py-16" 
      style={{ backgroundColor: '#f4eda9' }}
      role="main"
      aria-labelledby="service-detail-heading"
      itemScope
      itemType="https://schema.org/FinancialProduct"
    >
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
        
        {/* Service Header with Icon */}
        <div
          className="text-center mb-16 sm:mb-20 lg:mb-24 border-t-8 border-b-8 border-transparent animate-fade-in"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-12 h-12 bg-white rounded-lg shadow-lg p-2">
              <NextImage
                src={serviceIcon}
                alt={`${serviceName} icon`}
                width={48}
                height={48}
                className="w-full h-full object-contain"
                quality={85}
                itemProp="image"
              />
            </div>
          </div>
          
          <h1 
            id="service-detail-heading"
            className="text-4xl lg:text-5xl font-bold mb-4"
            style={{ color: '#000000', fontSize: 'clamp(2.25rem, 4vw, 3rem)' }}
            itemProp="name"
          >
            {serviceName}
          </h1>
          
          <p 
            className="text-xl leading-relaxed max-w-3xl mx-auto"
            style={{ color: '#000000' }}
            itemProp="description"
          >
            {serviceDescription}
          </p>
          
          <div className="mt-8">
            <a 
              href="https://app.corebusinesscapital.com/en/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="no-underline inline-block"
              aria-label={`Apply for ${serviceName} - opens in new tab`}
            >
              <div
                className="w-[120px] h-[60px] flex items-center justify-center rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={ctaButtonStyles}
                onMouseEnter={(e) => handleCtaHover(e, true)}
                onMouseLeave={(e) => handleCtaHover(e, false)}
              >
                {dict.cta_apply}
              </div>
            </a>
          </div>
        </div>

        {/* Service Details Grid - Optimized Responsive Layout */}
        <div className="grid grid-cols-1 min-[990px]:grid-cols-2 gap-6 min-[990px]:gap-8 auto-rows-auto mt-16 sm:mt-20 lg:mt-24 border-t-8 border-transparent">
          
          {/* Row 1: Minimum Qualifications */}
          <article 
            className="bg-white rounded-xl shadow-lg p-6 min-[990px]:col-span-1 animate-fade-in-up"
            itemScope
            itemType="https://schema.org/PropertyValue"
          >
            <h2 
              className="text-2xl font-bold mb-4"
              style={{ color: '#000000' }}
              itemProp="name"
            >
              {dict.serviceDetails.sectionHeaders.qualifications_title}
            </h2>
            <ul className="space-y-3 text-left list-disc list-inside" itemProp="value">
              {serviceDetails.qualifications.map((qualification: string, index: number) => {
                // Check if this is a section header (ends with colon)
                const isHeader = qualification.endsWith(':');
                
                if (isHeader) {
                  return (
                    <li key={index} className="text-base leading-relaxed font-semibold list-none -ml-5" style={{ color: '#000000' }}>
                      {qualification}
                    </li>
                  );
                }
                
                return (
                  <li key={index} className="text-base leading-relaxed" style={{ color: '#000000' }}>
                    {qualification}
                  </li>
                );
              })}
            </ul>
          </article>

          {/* Desktop/Tablet: Image in Column 2, Rows 1-3 */}
          <aside className="hidden min-[990px]:block min-[990px]:row-span-3 animate-fade-in-up"
            aria-label={`${serviceName} visual details`}
          >
            <div className="sticky top-8 h-[calc(100vh-4rem)] bg-white rounded-2xl shadow-lg p-8 sm:p-10 lg:p-12">
              <div className="w-full h-full rounded-xl overflow-hidden">
                <NextImage
                  src={serviceDetailImage}
                  alt={`${serviceName} detailed information and benefits`}
                  width={800}
                  height={800}
                  className="w-full h-full object-cover"
                  quality={90}
                  priority={false}
                  loading="lazy"
                  sizes="(max-width: 989px) 100vw, 50vw"
                  itemProp="image"
                />
              </div>
            </div>
          </aside>

          {/* Row 2: Required Documentation */}
          <article className="bg-white rounded-xl shadow-lg p-6 min-[990px]:col-span-1 animate-fade-in-up"
            itemScope
            itemType="https://schema.org/PropertyValue"
          >
            <h2 
              className="text-2xl font-bold mb-4"
              style={{ color: '#000000' }}
              itemProp="name"
            >
              {dict.serviceDetails.sectionHeaders.documentation_title}
            </h2>
            <ul className="space-y-3 text-left list-disc list-inside" itemProp="value">
              {serviceDetails.paperwork.map((document: string, index: number) => {
                // Check if this is a section header (ends with colon)
                const isHeader = document.endsWith(':');
                
                if (isHeader) {
                  return (
                    <li key={index} className="text-base leading-relaxed font-semibold list-none -ml-5" style={{ color: '#000000' }}>
                      {document}
                    </li>
                  );
                }
                
                return (
                  <li key={index} className="text-base leading-relaxed" style={{ color: '#000000' }}>
                    {document}
                  </li>
                );
              })}
            </ul>
          </article>

          {/* Row 3: Program Benefits */}
          <article className="bg-white rounded-xl shadow-lg p-6 min-[990px]:col-span-1 animate-fade-in-up"
            itemScope
            itemType="https://schema.org/PropertyValue"
          >
            <h2 
              className="text-2xl font-bold mb-4"
              style={{ color: '#000000' }}
              itemProp="name"
            >
              {dict.serviceDetails.sectionHeaders.benefits_title}
            </h2>
            <ul className="space-y-3 text-left list-disc list-inside" itemProp="value">
              {serviceDetails.benefits.map((benefit: string, index: number) => {
                // Check if this is a section header (ends with colon)
                const isHeader = benefit.endsWith(':');
                
                if (isHeader) {
                  return (
                    <li key={index} className="text-base leading-relaxed font-semibold list-none -ml-5" style={{ color: '#000000' }}>
                      {benefit}
                    </li>
                  );
                }
                
                return (
                  <li key={index} className="text-base leading-relaxed" style={{ color: '#000000' }}>
                    {benefit}
                  </li>
                );
              })}
            </ul>
          </article>

          {/* Mobile: Image After All Content */}
          <aside className="min-[990px]:hidden animate-fade-in-up"
            aria-label={`${serviceName} visual details`}
          >
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <NextImage
                src={serviceDetailImage}
                alt={`${serviceName} detailed information and benefits`}
                width={600}
                height={800}
                className="w-full h-auto object-cover"
                quality={90}
                priority={false}
                loading="lazy"
                sizes="100vw"
                itemProp="image"
              />
            </div>
          </aside>

        </div>

        {/* Call to Action */}
        <div
          className="text-center mt-12 animate-fade-in"
        >
          <h3 
            className="text-2xl font-bold mb-4"
            style={{ color: '#000000' }}
          >
            {dict.serviceDetails.cta.ready_title}
          </h3>
          <p 
            className="text-lg mb-6 max-w-2xl mx-auto"
            style={{ color: '#000000' }}
          >
            {dict.serviceDetails.cta.contact_text.replace('{service}', serviceName.toLowerCase())}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a 
              href="https://app.corebusinesscapital.com/en/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="no-underline"
              aria-label="Apply for business funding - opens in new tab"
            >
              <div
                className="min-w-[160px] h-[60px] flex items-center justify-center px-4 rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer"
                style={ctaButtonStyles}
                onMouseEnter={(e) => handleCtaHover(e, true)}
                onMouseLeave={(e) => handleCtaHover(e, false)}
              >
                {dict.serviceDetails.cta.apply_button}
              </div>
            </a>
            <Link
              href={`/${lang}/services`}
              className="inline-block bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-300"
              role="button"
            >
              {dict.serviceDetails.cta.view_all_button}
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
});

export default ServicesDetail;



