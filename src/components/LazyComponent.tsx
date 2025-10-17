'use client';

import { useEffect, useState, useRef } from 'react';

interface LazyComponentProps {
  children: React.ReactNode;
  rootMargin?: string;
  threshold?: number;
}

/**
 * LazyComponent - Renders children only when they're about to enter the viewport
 * Uses Intersection Observer for efficient lazy loading
 * This dramatically reduces initial JavaScript execution
 */
export default function LazyComponent({ 
  children, 
  rootMargin = '200px',
  threshold = 0.01 
}: LazyComponentProps) {
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const currentRef = ref.current;
    if (!currentRef) return;

    // Use Intersection Observer for viewport detection
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setIsVisible(true);
            observer.disconnect(); // Stop observing once visible
          }
        });
      },
      {
        rootMargin, // Load before entering viewport
        threshold,  // Trigger when just visible
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [rootMargin, threshold]);

  // Return placeholder during SSR and before intersection
  return (
    <div ref={ref} style={{ minHeight: isVisible ? 'auto' : '100px' }}>
      {isVisible ? children : null}
    </div>
  );
}
