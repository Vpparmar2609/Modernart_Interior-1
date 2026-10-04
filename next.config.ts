import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
    ],
  },

  async rewrites() {
    return {
      beforeFiles: [
        {
          source: '/newprojects/:path*',
          destination: '/api/images/path/:path*',
        },
      ],
    };
  },
};

export default nextConfig;