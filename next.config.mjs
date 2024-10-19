/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.clerk.com", "images.clerk.dev"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "35mb", // You can adjust the size limit as needed
    },
  },
  async rewrites() {
    return [
      {
        source: "/sitemap.xml",
        destination: "/sitemap",
      },
      {
        source: "/robots.txt",
        destination: "/robots",
      },
    ];
  },
};

export default nextConfig;
