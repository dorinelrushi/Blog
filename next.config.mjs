/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.clerk.com", "images.clerk.dev"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "25mb", // Adjust the size limit as needed
    },
  },
  async headers() {
    return [
      {
        // Match all API routes
        source: "/api/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,OPTIONS,PATCH,DELETE,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version",
          },
        ],
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/old-url", // Original URL
        destination: "/new-url", // Target URL
        permanent: true, // Set to true for 301 redirects (permanent), false for 302 (temporary)
      },
      // Add more redirects as needed
    ];
  },
};

export default nextConfig;
