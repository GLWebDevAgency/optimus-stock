/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@optimus/ui', '@optimus/domain'],
  experimental: {
    optimizePackageImports: ['@optimus/ui'],
  },
};

module.exports = nextConfig;
