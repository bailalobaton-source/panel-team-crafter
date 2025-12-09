import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  images: {
    domains: [
      "end-point.team-crafter.com",
      "localhost",
      "files.team-crafter.com",
    ],
  },
};

export default nextConfig;
