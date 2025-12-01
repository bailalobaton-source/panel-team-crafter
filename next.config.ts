import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    domains: ["end-point.team-crafter.com", "localhost"],
  },
};

export default nextConfig;
