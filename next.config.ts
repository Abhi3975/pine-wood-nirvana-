import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Lighter photos: a slightly lower quality (indistinguishable at these sizes), a tight set
    // of widths so each screen gets a right-sized file, and month-long caching.
    qualities: [60, 75],
    deviceSizes: [640, 828, 1080, 1280, 1600, 1920],
    minimumCacheTTL: 2_678_400,
    // YouTube thumbnails and ghumog.in blog covers.
    remotePatterns: [
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "ghumog.in" }, // blog cover images
    ],
  },
  turbopack: {
    root: __dirname,
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
