'use client';
import NextImage from 'next/image';
import { memo } from 'react';
import type { Dict } from '@/types/dict';

interface BannerProps {
  dict: Dict;
}

// Memoized Banner component for better performance
const Banner = memo(function Banner({ dict }: BannerProps) {
  return (
    <section 
      className="py-12 bg-gray-100" 
      style={{ marginTop: '8px', marginBottom: '4px' }}
      role="complementary"
      aria-label="Trust indicators and certifications"
    >
      
      {/* Structured Data for Trust Signals */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Core Business Capital",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "5.0",
              "bestRating": "5",
              "ratingCount": "50"
            },
            "accreditation": [
              {
                "@type": "Organization",
                "name": "Better Business Bureau",
                "url": "https://www.bbb.org/"
              }
            ]
          })
        }}
      />
      
      {/* Horizontal Layout: All Screen Sizes */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-around items-center gap-2 sm:gap-4">
          
          {/* Google 5 Star Rating - Clickable */}
          <div className="flex-1 flex justify-center">
            <a 
              href="https://share.google/kEQoQvQCaGoJ8aoFm" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="View our Google reviews - 5 star rating (opens in new tab)"
              className="transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 rounded"
            >
              <NextImage 
                src="/images/google-5star.png" 
                alt={dict.about?.rating_google || "Google 5 Star Rating - Click to view reviews"} 
                width={175} 
                height={88}
                className="max-w-full h-auto w-20 sm:w-28 md:w-32 lg:w-40"
                quality={60}
                loading="lazy"
              />
            </a>
          </div>
          
          {/* BBB A+ Rating - Clickable */}
          <div className="flex-1 flex justify-center">
            <a 
              href="https://www.bbb.org/us/co/denver/profile/small-business-loans/core-business-capital-corp-1296-90253814" 
              target="_blank" 
              rel="noopener noreferrer"
              aria-label="View our Better Business Bureau A+ rating (opens in new tab)"
              className="transition-transform duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-opacity-50 rounded"
            >
              <NextImage 
                src="/images/bbb-aplus.png" 
                alt={dict.about?.rating_bbb || "Better Business Bureau A+ Rating - Click to view profile"} 
                width={175} 
                height={88}
                className="max-w-full h-auto w-20 sm:w-28 md:w-32 lg:w-40"
                quality={60}
                loading="lazy"
              />
            </a>
          </div>
          
          {/* 256 Bit Encryption - Security Badge */}
          <div className="flex-1 flex justify-center">
            <div 
              role="img"
              aria-label="256-bit SSL encryption security badge"
              className="transition-transform duration-200 hover:scale-105"
            >
              <NextImage 
                src="/images/encryption.png" 
                alt="256 Bit SSL Encryption - Secure data protection" 
                width={175} 
                height={88}
                className="max-w-full h-auto w-20 sm:w-28 md:w-32 lg:w-40"
                quality={60}
                loading="lazy"
              />
            </div>
          </div>
          
        </div>
      </div>
      
    </section>
  );
});

export default Banner;