/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://saleh-kamal.blog",
  generateRobotsTxt: true,

  sitemapSize: 7000,

  changefreq: "weekly",
  priority: 0.7,

  exclude: ["/admin/*", "/dashboard/*", "/api/*"],

  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/",
      },
    ],
  },
};
