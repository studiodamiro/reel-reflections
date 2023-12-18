const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'image.tmdb.org' }],
  },

  // Remove while in devt on localhost
  async rewrites() {
    return [{ source: '/:any*', destination: '/' }];
  },
};

module.exports = withContentlayer(nextConfig);
