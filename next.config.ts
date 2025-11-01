import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'community.cloudflare.steamstatic.com',
        pathname: '/economy/image/**',
      },
      {
        protocol: 'https',
        hostname: 'steamcommunity.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'avatars.steamstatic.com',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
