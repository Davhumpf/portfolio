// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
      // si luego usas otras variantes de Unsplash, añádelas:
      // { protocol: "https", hostname: "plus.unsplash.com" },
    ],
  },
};

export default nextConfig;
