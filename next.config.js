const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'image.tmdb.org' }],
  },

  // Remove while in devt on localhost
  // A must for prod SPA behavior tested on netlify
  // TODO replace for better solution,
  rewrites: async () => [
    { source: '/favicon.ico', destination: '/favicon.ico' },
    { source: '/:any*', destination: '/' },
  ],
};

module.exports = withContentlayer(nextConfig);
