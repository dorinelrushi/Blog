// next-sitemap.js
module.exports = {
  siteUrl: "https://devpromote.online", // Replace with your site's URL
  generateRobotsTxt: true, // This will generate a robots.txt file
  changefreq: "daily", // Set frequency of updates for the sitemap
  priority: 0.7, // Default priority for URLs
  sitemapSize: 5000, // Maximum number of entries per sitemap file
  // Additional robots.txt options
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: "/", // Allow search engines to access all pages
      },
    ],
    additionalSitemaps: [
      "https://devpromote.online/sitemap.xml", // Add any additional sitemaps here if needed
    ],
  },
};
