import { getAllItems } from "@/actions";

export async function GET(request) {
  const baseUrl = process.env.BASE_URL || "https://devpromote.online/";
  const allItems = await getAllItems();
  const sitemap = allItems.map((item) => ({
    url: `${baseUrl}/items/${item._id}`,
    lastModified: item.updatedAt || new Date(),
    changeFrequency: "weekly",
    priority: 0.5,
  }));
  const staticPages = [
    {
      url: `${baseUrl}`,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    {
      url: `${baseUrl}/OurMission`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
  ];
  const fullSitemap = [...staticPages, ...sitemap];
  const xmlSitemap = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      ${fullSitemap
        .map((urlInfo) => {
          return `
            <url>
              <loc>${urlInfo.url}</loc>
              <lastmod>${new Date(urlInfo.lastModified).toISOString()}</lastmod>
              <changefreq>${urlInfo.changeFrequency}</changefreq>
              <priority>${urlInfo.priority}</priority>
            </url>
          `;
        })
        .join("")}
    </urlset>
  `;

  // Kthe sitemap si XML response
  return new Response(xmlSitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}
