// pages/sitemap.js
import { getAllItems } from "@/actions";
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "https://yourdomain.com"; // Replace with your base URL
  const items = await getAllItems(); // Fetch all items from the database

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>${baseUrl}</loc>
      <priority>1.00</priority>
    </url>
    ${items
      .map(
        (item) => `
        <url>
          <loc>${baseUrl}/item/${item.slug}</loc>
          <priority>0.80</priority>
        </url>
      `
      )
      .join("")}
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      "Content-Type": "application/xml",
    },
  });
}

export const dynamic = "force-dynamic"; // Ensure dynamic generation on every request
