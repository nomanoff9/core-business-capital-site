import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Image optimization configuration
  images: {
    // Define allowed quality values for next/image
    // Used in: Hero (60), CustomerReviews (75), Services/ServicesDetail icons (85), Banner badges (90)
    qualities: [60, 75, 85, 90, 100],
  },

  // Compiler options for modern browsers
  compiler: {
    // Remove console logs in production
    removeConsole: process.env.NODE_ENV === 'production',
  },

  // Webpack configuration for modern browsers
  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Target modern browsers with ES2020 features
      // This reduces polyfills and legacy JavaScript transforms
      config.target = ['web', 'es2020'];
    }
    return config;
  },
};

export default nextConfig;
