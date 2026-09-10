/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  experimental: {
    devtoolSegmentExplorer: false,
  },
  webpack: (config, { dev }) => {
    if (dev) {
      config.cache = false
    }

    return config
  },
}

export default nextConfig
