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
    // Enable React strict mode in development
    reactRemoveProperties: process.env.NODE_ENV === 'production' ? { properties: ['^data-test'] } : false,
  },

  // Webpack configuration for modern browsers and aggressive optimization
  webpack: (config, { isServer, dev }) => {
    if (!isServer) {
      // Target modern browsers with ES2020 features
      // This reduces polyfills and legacy JavaScript transforms
      config.target = ['web', 'es2020'];
      
      // Production optimizations
      if (!dev) {
        // Enable aggressive tree-shaking
        config.optimization = {
          ...config.optimization,
          usedExports: true,
          sideEffects: true,
          minimize: true,
          // Split chunks more aggressively to reduce unused JavaScript
          splitChunks: {
            chunks: 'all',
            maxInitialRequests: 25,
            minSize: 20000,
            maxSize: 244000, // Smaller chunks = better caching and loading
            cacheGroups: {
              default: false,
              vendors: false,
              // Split React and React-DOM into separate chunks
              react: {
                name: 'react',
                chunks: 'all',
                test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
                priority: 50,
                enforce: true,
              },
              // Next.js framework code
              nextjs: {
                name: 'nextjs',
                chunks: 'all',
                test: /[\\/]node_modules[\\/](next)[\\/]/,
                priority: 45,
                enforce: true,
              },
              // Scheduler (React concurrent features)
              scheduler: {
                name: 'scheduler',
                chunks: 'all',
                test: /[\\/]node_modules[\\/](scheduler)[\\/]/,
                priority: 40,
                enforce: true,
              },
              // Shared libraries - split by package for better caching
              lib: {
                test: /[\\/]node_modules[\\/]/,
                name(module: any) {
                  const packageName = module.context.match(
                    /[\\/]node_modules[\\/](.*?)([\\/]|$)/
                  )?.[1];
                  return `lib.${packageName?.replace('@', '')}`;
                },
                priority: 30,
                minChunks: 1,
                reuseExistingChunk: true,
              },
              // Common code used across pages
              commons: {
                name: 'commons',
                minChunks: 2,
                priority: 20,
                reuseExistingChunk: true,
              },
            },
          },
        };
      }
    }
    return config;
  },
  
  // Enable compression
  compress: true,
  
  // Optimize for production
  productionBrowserSourceMaps: false,
  
  // Enable experimental features for better performance
  experimental: {
    optimizePackageImports: ['react-icons'],
  },
};

export default nextConfig;
