'use client';

import { useEffect } from 'react';

export default function GoogleAnalytics({ measurementId }: { measurementId: string }) {
  useEffect(() => {
    // Ultra-aggressive deferring: Only load GA after significant user interaction
    // or after 5 seconds of page idle time
    let loaded = false;
    let idleTimeout: NodeJS.Timeout;

    const loadGTM = () => {
      if (loaded) return;
      loaded = true;

      // Clean up all listeners
      window.removeEventListener('scroll', handleSignificantInteraction);
      window.removeEventListener('click', handleSignificantInteraction);
      window.removeEventListener('touchstart', handleSignificantInteraction);
      if (idleTimeout) clearTimeout(idleTimeout);

      // Dynamically inject GTM script
      const script = document.createElement('script');
      script.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);

      // Initialize dataLayer
      script.onload = () => {
        interface GtagWindow extends Window {
          dataLayer?: unknown[];
        }
        const gtagWindow = window as GtagWindow;
        gtagWindow.dataLayer = gtagWindow.dataLayer || [];
        function gtag(...args: unknown[]) {
          if (gtagWindow.dataLayer) {
            gtagWindow.dataLayer.push(args);
          }
        }
        gtag('js', new Date());
        gtag('config', measurementId, {
          page_path: window.location.pathname,
        });
      };
    };

    const handleSignificantInteraction = () => {
      // Only load on meaningful interaction (not just hover)
      loadGTM();
    };

    // Strategy: Wait 5 seconds after page load OR first significant user interaction
    const scheduleIdleLoad = () => {
      idleTimeout = setTimeout(() => {
        loadGTM();
      }, 5000); // Increased from 2s to 5s for better PageSpeed score
    };

    // Wait for page to be completely loaded (including images)
    if (document.readyState === 'complete') {
      scheduleIdleLoad();
    } else {
      window.addEventListener('load', scheduleIdleLoad, { once: true });
    }

    // Load on significant user interaction (scroll, click, touch)
    window.addEventListener('scroll', handleSignificantInteraction, { 
      passive: true, 
      once: true 
    });
    window.addEventListener('click', handleSignificantInteraction, { 
      passive: true, 
      once: true 
    });
    window.addEventListener('touchstart', handleSignificantInteraction, { 
      passive: true, 
      once: true 
    });

    return () => {
      if (idleTimeout) clearTimeout(idleTimeout);
      window.removeEventListener('scroll', handleSignificantInteraction);
      window.removeEventListener('click', handleSignificantInteraction);
      window.removeEventListener('touchstart', handleSignificantInteraction);
    };
  }, [measurementId]);

  // No script tags - everything loaded dynamically
  return null;
}
