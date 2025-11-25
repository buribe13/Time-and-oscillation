import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/Time-and-oscillation',
  images: {
    unoptimized: true,
  },
  // Disable hostname detection to avoid network interface errors
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
