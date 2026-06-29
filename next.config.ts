import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/medbyclick-site",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
