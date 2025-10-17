'use client';

import Script from 'next/script';
import { useEffect, useState } from 'react';

export default function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  const [shouldLoad, setShouldLoad] = useState(false);

  useEffect(() => {
    // Only load GA after user interaction or after page is fully loaded
    const handleInteraction = () => {
      setShouldLoad(true);
      // Remove listeners once triggered
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };

    // Wait for page load complete + 2s idle before loading GA
    // This ensures LCP and FCP are not impacted
    let timeout: NodeJS.Timeout;
    
    const delayedLoad = () => {
      timeout = setTimeout(() => setShouldLoad(true), 2000);
    };

    // Wait for page to be fully loaded
    if (document.readyState === 'complete') {
      delayedLoad();
    } else {
      window.addEventListener('load', delayedLoad);
    }

    // Load immediately on any user interaction (faster engagement)
    window.addEventListener('scroll', handleInteraction, { passive: true, once: true });
    window.addEventListener('mousemove', handleInteraction, { passive: true, once: true });
    window.addEventListener('touchstart', handleInteraction, { passive: true, once: true });
    window.addEventListener('click', handleInteraction, { passive: true, once: true });

    return () => {
      if (timeout) clearTimeout(timeout);
      window.removeEventListener('load', delayedLoad);
      window.removeEventListener('scroll', handleInteraction);
      window.removeEventListener('mousemove', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
      window.removeEventListener('click', handleInteraction);
    };
  }, []);

  // Don't render scripts until user interacts or 3s passes
  if (!shouldLoad) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="lazyOnload"
      />
      <Script id="google-analytics" strategy="lazyOnload">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  );
}
