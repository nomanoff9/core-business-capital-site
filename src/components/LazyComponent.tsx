'use client';

import { useEffect, useState } from 'react';

interface LazyComponentProps {
  children: React.ReactNode;
}

/**
 * LazyComponent - Renders children only after initial page load
 * This improves initial page load performance by deferring below-the-fold content
 */
export default function LazyComponent({ children }: LazyComponentProps) {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Use setTimeout to defer rendering until after initial paint
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 100); // Delay by 100ms to prioritize above-the-fold content

    return () => clearTimeout(timer);
  }, []);

  // Return null during SSR and initial client render
  if (!isVisible) {
    return <div style={{ minHeight: '100px' }} />; // Placeholder to prevent CLS
  }

  return <>{children}</>;
}
