// pages/robots.js
import { NextResponse } from "next/server";

export async function GET() {
  const baseUrl = "https://promote.online";

  const robotsTxt = `
    User-agent: *
    Allow: /
    Sitemap: ${baseUrl}/sitemap.xml
  `;

  return new NextResponse(robotsTxt, {
    headers: {
      "Content-Type": "text/plain",
    },
  });
}

export const dynamic = "force-dynamic"; // Ensure dynamic generation on every request
