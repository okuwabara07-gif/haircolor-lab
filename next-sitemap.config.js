/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: 'https://haircolor-lab.vercel.app',
  generateRobotsTxt: true,
  robotsTxtOptions: {
    additionalSitemaps: ['https://haircolor-lab.vercel.app/sitemap.xml'],
  },
  changefreq: 'daily',
  priority: 0.7,
  sitemapSize: 5000,
}
