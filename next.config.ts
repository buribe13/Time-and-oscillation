import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Disable hostname detection to avoid network interface errors
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
};

export default nextConfig;
