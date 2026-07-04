import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async redirects() {
    return [
      // Legacy pages superseded by the medai/mededu/medtravel modules.
      // Kept as redirects (not deletions) so old bookmarks/links still resolve.
      { source: "/education", destination: "/mededu", permanent: true },
      { source: "/ai-diagnostics", destination: "/medai", permanent: true },
      { source: "/medical-travel", destination: "/medtravel", permanent: true },
    ];
  },
};

export default nextConfig;
