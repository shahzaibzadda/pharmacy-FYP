import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    // turn off built-in optimization for problematic local WebP assets
    unoptimized: true,
    // you can also explicitly allow domains or store sizes here if needed
  },
};

export default nextConfig;
