'use client';
import NextImage from 'next/image';
import { memo } from 'react';
import type { Dict } from '@/types/dict';

interface HeroProps {
  dict: Dict;
}

// Memoized Hero component to prevent unnecessary re-renders
const Hero = memo(function Hero({ dict }: HeroProps) {
  // Extract text content for better SEO
  const heroTitle = dict.hero_title || 'Fast Business Funding When You Need It Most';
  const heroSubtitle = dict.hero_subtitle || 'Get approved for business funding in as little as 24 hours. No hidden fees, competitive rates, and flexible terms designed for your success.';
  const ctaText = dict.cta_apply || 'Apply Now';

  // Common CTA button styles for DRY principle
  const ctaButtonStyles = {
    backgroundColor: '#ea9a20',
    color: 'white'
  };

  const handleCtaHover = (e: React.MouseEvent<HTMLDivElement>, isEntering: boolean) => {
    e.currentTarget.style.backgroundColor = isEntering ? '#efba22' : '#ea9a20';
  };

  return (
    <section 
      className="w-full m-0 p-0"
      style={{ backgroundColor: '#603913' }}
      role="banner"
      aria-label="Hero section - Business funding solutions"
    >
      {/* Structured Data for SEO */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FinancialProduct",
            "name": "Business Funding Solutions",
            "description": heroSubtitle,
            "provider": {
              "@type": "FinancialService",
              "name": "Core Business Capital"
            },
            "offers": {
              "@type": "Offer",
              "description": "Fast business funding approval in 24 hours"
            }
          })
        }}
      />

      {/* Responsive Grid Container */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 min-[480px]:pt-8 pb-8 min-[480px]:pb-16 sm:py-16">
        
        {/* Desktop/Tablet Layout: 2x2 Grid (480px and above) */}
        <div className="hidden min-[480px]:grid grid-cols-2 grid-rows-2 gap-8 min-h-[70vh]">
          
          {/* Column 1 Row 1: Hero Statement */}
          <div className="flex flex-col justify-center space-y-6" style={{ marginLeft: '8px' }}>
            <h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
              style={{ color: '#ffffff', fontSize: 'clamp(1.5rem, 5vw, 3.75rem)' }}
              itemScope
              itemType="https://schema.org/Organization"
            >
              <span itemProp="name">{heroTitle}</span>
            </h1>

            <p
              className="text-sm sm:text-base md:text-lg lg:text-xl leading-relaxed"
              style={{ color: '#ffffff', opacity: 0.9 }}
              itemProp="description"
            >
              {heroSubtitle}
            </p>
          </div>

          {/* Column 2: Hero Image - Spans both rows and fills column */}
          <div className="row-span-2 flex items-center justify-center" style={{ padding: '10px' }}>
            <div className="relative w-full h-full flex items-center justify-center">
              {/* Hero Image Container fills the column */}
              <div className="relative w-full h-full min-h-[400px] rounded-2xl overflow-hidden shadow-2xl">
                <NextImage
                  src="/images/hero-bg.jpg"
                  alt="Business professionals discussing funding solutions - Core Business Capital team meeting"
                  fill
                  sizes="(max-width: 480px) 100vw, 50vw"
                  className="object-cover"
                  priority
                  quality={60}
                  fetchPriority="high"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Optimized fallback content */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-yellow-200 opacity-0" role="img" aria-label="Business funding background">
                </div>
              </div>
            </div>
          </div>

          {/* Column 1 Row 2: Apply Now Button */}
          <div className="flex items-start justify-start" style={{ marginLeft: '8px' }}>
            <a 
              href="https://app.corebusinesscapital.com/en/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="no-underline"
              aria-label="Apply for business funding - opens in new tab"
              itemProp="url"
            >
              <div
                className="min-w-[160px] h-[60px] flex items-center justify-center rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer px-4 text-center"
                style={ctaButtonStyles}
                onMouseEnter={(e) => handleCtaHover(e, true)}
                onMouseLeave={(e) => handleCtaHover(e, false)}
                role="button"
                tabIndex={0}
              >
                {ctaText}
              </div>
            </a>
          </div>
        </div>

        {/* Mobile Layout: Single Column (Below 480px) - Optimized for above-the-fold */}
        <div className="block min-[480px]:hidden space-y-4">
          
          {/* Hero Statement - Compact */}
          <div className="text-center space-y-3">
            <h1 
              className="text-2xl font-bold leading-tight"
              style={{ color: '#ffffff', fontSize: '1.5rem', lineHeight: '1.3' }}
              itemScope
              itemType="https://schema.org/Organization"
            >
              <span itemProp="name">{heroTitle}</span>
            </h1>

            <p
              className="text-sm leading-snug px-2"
              style={{ color: '#ffffff', opacity: 0.9, lineHeight: '1.4' }}
              itemProp="description"
            >
              {heroSubtitle}
            </p>
          </div>

          {/* Hero Image Centered - Compact aspect ratio */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="relative aspect-[16/9] w-full rounded-xl overflow-hidden shadow-xl">
                <NextImage
                  src="/images/hero-bg.jpg"
                  alt="Business professionals discussing funding solutions - Core Business Capital team meeting"
                  fill
                  sizes="(max-width: 480px) 100vw, 50vw"
                  className="object-cover"
                  priority
                  quality={60}
                  fetchPriority="high"
                  loading="eager"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                  }}
                />
                {/* Optimized fallback content */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-200 to-yellow-200 opacity-0" role="img" aria-label="Business funding background">
                </div>
              </div>
            </div>
          </div>

          {/* Apply Now Button - Compact */}
          <div className="flex justify-center pt-2">
            <a 
              href="https://app.corebusinesscapital.com/en/" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="no-underline"
              aria-label="Apply for business funding - opens in new tab"
              itemProp="url"
            >
              <div
                className="min-w-[140px] h-[50px] flex items-center justify-center rounded-full font-semibold shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer px-4 text-center text-sm"
                style={ctaButtonStyles}
                onMouseEnter={(e) => handleCtaHover(e, true)}
                onMouseLeave={(e) => handleCtaHover(e, false)}
                role="button"
                tabIndex={0}
              >
                {ctaText}
              </div>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
});

export default Hero;