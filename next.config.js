const { withContentlayer } = require('next-contentlayer');

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    remotePatterns: [{ protocol: 'https', hostname: 'image.tmdb.org' }],
  },

  rewrites() {
    const isLocalhost = process.env.NODE_ENV === 'development';

    // Remove while in devt on localhost
    // A must for prod SPA behavior tested on netlify
    // TODO replace for better solution,
    const rewrites = [
      { source: '/placeholder.png', destination: '/placeholder.png' },
      { source: isLocalhost ? '/' : '/:any*', destination: isLocalhost ? 'http://localhost:3000/' : '/' },
    ];

    return rewrites;
  },
};

module.exports = withContentlayer(nextConfig);
