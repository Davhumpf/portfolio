// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // No dejes que ESLint rompa el build en Vercel (los errores seguirán en "next lint")
  eslint: {
    ignoreDuringBuilds: true,
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      // útiles si luego cargas avatares o assets desde GitHub
      { protocol: "https", hostname: "avatars.githubusercontent.com" },
      { protocol: "https", hostname: "raw.githubusercontent.com" },
      // { protocol: "https", hostname: "plus.unsplash.com" }, // si lo necesitas
    ],
  },
};

export default nextConfig;
