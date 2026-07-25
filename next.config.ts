import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/collab-board",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
