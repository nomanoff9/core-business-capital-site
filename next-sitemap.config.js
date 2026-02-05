/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://corebusinesscapital.com',
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
  exclude: ['/api/*', '/'],
  changefreq: 'monthly',
  priority: 0.7,
  sitemapSize: 5000,
  transform: async (config, path) => {
    // Custom priority and changefreq based on page type
    let priority = 0.7;
    let changefreq = 'monthly';

    // Homepage - highest priority
    if (path === '/en' || path === '/es') {
      priority = 1.0;
      changefreq = 'weekly';
    }
    // Services overview page
    else if (path.endsWith('/services')) {
      priority = 0.9;
      changefreq = 'monthly';
    }
    // Individual service pages
    else if (path.includes('/services/')) {
      priority = 0.8;
      changefreq = 'monthly';
    }
    // SBA Calculator - valuable tool page
    else if (path.includes('/sba-calculator')) {
      priority = 0.8;
      changefreq = 'monthly';
    }
    // Contact page - conversion page
    else if (path.includes('/contact')) {
      priority = 0.7;
      changefreq = 'yearly';
    }
    // About page
    else if (path.includes('/about')) {
      priority = 0.6;
      changefreq = 'yearly';
    }
    // Legal pages - lowest priority
    else if (path.includes('/privacy') || path.includes('/terms')) {
      priority = 0.3;
      changefreq = 'yearly';
    }

    return {
      loc: path,
      changefreq,
      priority,
      lastmod: config.autoLastmod ? new Date().toISOString() : undefined,
      alternateRefs: config.alternateRefs ?? [],
    };
  },
  additionalPaths: async (config) => {
    // Add contact pages that might be missing
    const result = [];
    const languages = ['en', 'es'];
    const additionalPages = ['contact', 'about'];
    
    for (const lang of languages) {
      for (const page of additionalPages) {
        result.push({
          loc: `/${lang}/${page}`,
          changefreq: page === 'contact' ? 'yearly' : 'yearly',
          priority: page === 'contact' ? 0.7 : 0.6,
          lastmod: new Date().toISOString(),
        });
      }
    }
    
    return result;
  },
};
