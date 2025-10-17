import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  
  // Image optimization configuration
  images: {
    qualities: [60, 75, 90], // Allow custom quality values for optimized LCP
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
