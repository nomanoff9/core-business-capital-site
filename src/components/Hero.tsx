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
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-0 min-[480px]:pt-8 pb-16 sm:py-16">
        
        {/* Desktop/Tablet Layout: 2x2 Grid (480px and above) */}
        <div className="hidden min-[480px]:grid grid-cols-2 grid-rows-2 gap-8 min-h-[70vh]">
          
          {/* Column 1 Row 1: Hero Statement */}
          <div className="flex flex-col justify-center space-y-6" style={{ marginLeft: '8px' }}>
            <h1 
              className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight"
              style={{ color: '#ffffff' }}
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
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover"
                  priority
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Kcp//2Q=="
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

        {/* Mobile Layout: Single Column (Below 480px) */}
        <div className="block min-[480px]:hidden space-y-8">
          
          {/* Hero Statement */}
          <div className="text-center space-y-6">
            <h1 
              className="text-3xl font-bold leading-tight"
              style={{ color: '#ffffff' }}
              itemScope
              itemType="https://schema.org/Organization"
            >
              <span itemProp="name">{heroTitle}</span>
            </h1>

            <p
              className="text-base leading-relaxed"
              style={{ color: '#ffffff', opacity: 0.9 }}
              itemProp="description"
            >
              {heroSubtitle}
            </p>
          </div>

          {/* Apply Now Button */}
          <div className="flex justify-center" style={{ marginBottom: '4px' }}>
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

          {/* Hero Image Centered */}
          <div className="flex justify-center">
            <div className="relative w-full max-w-sm">
              <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden shadow-2xl">
                <NextImage
                  src="/images/hero-bg.jpg"
                  alt="Business professionals discussing funding solutions - Core Business Capital team meeting"
                  fill
                  sizes="(max-width: 480px) 100vw, 50vw"
                  className="object-cover"
                  priority
                  quality={85}
                  placeholder="blur"
                  blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R+Kcp//2Q=="
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

        </div>
      </div>
    </section>
  );
});

export default Hero;