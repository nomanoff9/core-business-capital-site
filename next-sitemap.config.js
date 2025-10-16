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
  changefreq: 'weekly',
  priority: 0.7,
  sitemapSize: 5000,
};
