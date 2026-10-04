import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Don't fail the build on ESLint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
