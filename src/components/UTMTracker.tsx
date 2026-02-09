'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';

/**
 * UTMTracker - Captures and persists UTM parameters for analytics
 * 
 * Supports tracking from:
 * - Bing Ads (utm_source=bing)
 * - Google Ads (utm_source=google)
 * - Facebook Ads (utm_source=facebook)
 * - LinkedIn Ads (utm_source=linkedin)
 * - Email campaigns
 * - Any custom UTM parameters
 */
export default function UTMTracker() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;

    // UTM parameters to track
    const utmParams = {
      utm_source: searchParams?.get('utm_source'),
      utm_medium: searchParams?.get('utm_medium'),
      utm_campaign: searchParams?.get('utm_campaign'),
      utm_term: searchParams?.get('utm_term'),
      utm_content: searchParams?.get('utm_content'),
      // Bing-specific click ID
      msclkid: searchParams?.get('msclkid'),
      // Google-specific click ID
      gclid: searchParams?.get('gclid'),
      // Facebook-specific click ID
      fbclid: searchParams?.get('fbclid'),
    };

    // Check if any UTM parameters exist
    const hasUTMParams = Object.values(utmParams).some(value => value !== null);

    if (hasUTMParams) {
      // Store UTM parameters in sessionStorage for tracking across pages
      const utmData = {
        ...utmParams,
        timestamp: new Date().toISOString(),
        landing_page: window.location.pathname,
      };

      // Remove null values
      const cleanedData = Object.fromEntries(
        Object.entries(utmData).filter(([, value]) => value !== null)
      );

      sessionStorage.setItem('utm_params', JSON.stringify(cleanedData));

      // Send to Google Analytics if dataLayer exists
      interface GtagWindow extends Window {
        dataLayer?: unknown[];
      }
      if (typeof window !== 'undefined' && (window as GtagWindow).dataLayer) {
        (window as GtagWindow).dataLayer?.push({
          event: 'utm_capture',
          ...cleanedData,
        });
      }

      // Log for debugging (remove in production if needed)
      if (process.env.NODE_ENV === 'development') {
        console.log('UTM Parameters captured:', cleanedData);
      }
    }

    // Also capture referrer information
    if (document.referrer) {
      const referrerData = {
        referrer: document.referrer,
        timestamp: new Date().toISOString(),
      };
      sessionStorage.setItem('referrer_info', JSON.stringify(referrerData));
    }
  }, [searchParams]);

  // This component doesn't render anything
  return null;
}

/**
 * Helper function to retrieve stored UTM parameters
 * Use this when user fills out application form to include UTM data
 */
export function getStoredUTMParams(): Record<string, string> | null {
  if (typeof window === 'undefined') return null;
  
  try {
    const stored = sessionStorage.getItem('utm_params');
    return stored ? JSON.parse(stored) : null;
  } catch {
    return null;
  }
}

/**
 * Helper function to append UTM params to Apply Now links
 * This preserves UTM tracking when user clicks Apply Now button
 */
export function appendUTMToURL(baseURL: string): string {
  if (typeof window === 'undefined') return baseURL;
  
  const storedUTM = getStoredUTMParams();
  if (!storedUTM) return baseURL;

  const url = new URL(baseURL);
  
  // Append all stored UTM parameters to the application URL
  Object.entries(storedUTM).forEach(([key, value]) => {
    if (key.startsWith('utm_') || key === 'msclkid' || key === 'gclid' || key === 'fbclid') {
      url.searchParams.set(key, String(value));
    }
  });

  return url.toString();
}
