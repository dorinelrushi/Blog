/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ["img.clerk.com"],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "25mb", // You can adjust the size limit as needed
    },
  },
};

export default nextConfig;
