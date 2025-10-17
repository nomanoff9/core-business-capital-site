'use client';
import { useState, useEffect, useRef } from 'react';
import NextImage from 'next/image';
import type { Dict } from '@/types/dict';

interface CustomerReviewsProps {
  dict: Dict;
  className?: string;
}

// Customer review data with accessibility information
const customerReviews = [
  { id: 1, src: '/images/reviews/review-1.jpg', alt: 'Five star review from Marrisa P. - Nothing short of exceptional' },
  { id: 2, src: '/images/reviews/review-2.jpg', alt: 'Five star review from Jordan K. - Walked me through every step, highly recommended' },
  { id: 3, src: '/images/reviews/review-3.jpg', alt: 'Five star review from Ivana S. - Well informed, educated, and very pleasant customer support' },
  { id: 4, src: '/images/reviews/review-4.jpg', alt: 'Five star review from Curtis D. - The right fit for us to help grow our company' },
  { id: 5, src: '/images/reviews/review-5.jpg', alt: 'Five star review from Jacob S. - An asset to our business - could not have done it without him' },
  { id: 6, src: '/images/reviews/review-6.jpg', alt: 'Five star review from Brad A. - Awesome experience, great explanation of options' },
  { id: 7, src: '/images/reviews/review-7.jpg', alt: 'Five star review from Chery S. - Worked with them for years, they are the best there is' },
  { id: 8, src: '/images/reviews/review-8.jpg', alt: 'Five star review from Marcie E. - Amazing to work with, great at solving an issues' },
  { id: 9, src: '/images/reviews/review-9.jpg', alt: 'Five star review from Maggie W. - Will be using them for ALL our financing needs' },
  { id: 10, src: '/images/reviews/review-10.jpg', alt: 'Five star review from Brian V. - Much easier than working with a big bank' },
  { id: 11, src: '/images/reviews/review-11.jpg', alt: 'Five star review from Triple S. - I had the money in my account in 1 week, the best at what he does' },
  { id: 12, src: '/images/reviews/review-12.jpg', alt: 'Five star review from Eric M. - Exceeded expectations on our SBA loan' },
];

export default function CustomerReviews({ dict, className = '' }: CustomerReviewsProps) {
  // State management for carousel functionality
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Duplicate reviews array for seamless infinite scrolling
  const duplicatedReviews = [...customerReviews, ...customerReviews, ...customerReviews];

  // Auto-scroll functionality
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const nextIndex = prevIndex + 1;
        // Reset to beginning when reaching the end of first set
        return nextIndex >= customerReviews.length ? 0 : nextIndex;
      });
    }, 4000); // Scroll every 4 seconds for slower, steady pace

    // Cleanup on unmount
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <section 
      className={`py-16 overflow-hidden ${className}`}
      style={{ backgroundColor: '#603913' }}
      aria-label="Customer Reviews Carousel"
    >
      {/* Section Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <div className="text-center animate-fade-in-up">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold mb-4" style={{ color: '#ffffff' }}>
            {dict.reviews.title}
          </h2>
          <p className="text-lg sm:text-xl max-w-3xl mx-auto" style={{ color: '#f3f4f6' }}>
            {dict.reviews.subtitle}
          </p>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative w-full">
        {/* Gradient Overlays for Visual Effect */}
        <div className="absolute left-0 top-0 z-10 h-full w-20 bg-gradient-to-r from-gray-50 to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 z-10 h-full w-20 bg-gradient-to-l from-gray-50 to-transparent pointer-events-none" />

        {/* Scrolling Container */}
        <div
          className="flex gap-8 transition-transform duration-[2000ms] ease-in-out"
          style={{
            width: `${duplicatedReviews.length * (625 + 32)}px`, // Calculate total width
            transform: `translateX(-${(currentIndex * (625 + 32))}px)`
          }}
        >
          {duplicatedReviews.map((review, index) => (
            <div
              key={`${review.id}-${Math.floor(index / customerReviews.length)}`}
              className="relative flex-shrink-0"
              style={{ marginRight: '32px' }}
            >
              {/* Review Image Container */}
              <div 
                className="relative flex-shrink-0 rounded-xl overflow-hidden shadow-lg transition-shadow duration-300 bg-white"
                style={{
                  width: '625px',
                  height: '469px',
                  minHeight: '469px'
                }}
              >
                <NextImage
                  src={review.src}
                  alt={review.alt}
                  fill
                  sizes="625px"
                  className="object-contain"
                  loading="lazy"
                  quality={75}
                  onError={(e) => {
                    // Fallback for missing images
                    e.currentTarget.style.display = 'none';
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
