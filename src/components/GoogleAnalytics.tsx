'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  useEffect(() => {
    // Initialize dataLayer immediately
    interface GtagWindow extends Window {
      dataLayer?: unknown[];
      gtag?: (...args: unknown[]) => void;
    }
    const gtagWindow = window as GtagWindow;
    gtagWindow.dataLayer = gtagWindow.dataLayer || [];
    
    function gtag(...args: unknown[]) {
      if (gtagWindow.dataLayer) {
        gtagWindow.dataLayer.push(args);
      }
    }
    
    gtagWindow.gtag = gtag;
    gtag('js', new Date());
    gtag('config', measurementId, {
      page_path: window.location.pathname,
    });
  }, [measurementId]);

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
    </>
  );
}
