const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'image.tmdb.org' }],
  },
  async rewrites() {
    const isLocalhost = process.env.NODE_ENV === 'development';
    return [
      { source: '/placeholder.png', destination: '/placeholder.png' },
      { source: isLocalhost ? '/' : '/:any*', destination: isLocalhost ? 'http://localhost:3000/' : '/' },
    ];
  },
};

module.exports = withContentlayer(nextConfig);
