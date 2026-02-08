import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */ images: {
    remotePatterns: [
      {
        hostname: 'wildish.lon1.cdn.digitaloceanspaces.com',
        pathname: '/**',
        port: '',
        protocol: 'https',
      },
    ],
  },
};

export default nextConfig;
