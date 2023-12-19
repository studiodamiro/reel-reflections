const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'image.tmdb.org' }],
  },
  rewrite: [
    { source: '/placeholder.png', destination: '/placeholder.png' },
    { source: '/:any*', destination: '/' },
  ],
};

module.exports = withContentlayer(nextConfig);
