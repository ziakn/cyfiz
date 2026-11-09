/** @type {import('next').NextConfig} */
const nextConfig = {
  // v1 pages that the v2 design folded into other pages.
  async redirects() {
    return [
      { source: "/connect", destination: "/contact", permanent: true },
      { source: "/quiz", destination: "/learn", permanent: true },
    ];
  },
  experimental: {
    serverActions: {
      bodySizeLimit: "25mb",
    },
  },
};

export default nextConfig;
