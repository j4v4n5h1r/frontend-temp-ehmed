/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  webpack: (config) => {
    config.resolve.extensions = ['.js', '.jsx', '.ts', '.tsx', ...config.resolve.extensions];
    
    // Add fallback for context directory
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false,
      net: false,
      tls: false,
    };
    
    // Add alias for context
    config.resolve.alias = {
      ...config.resolve.alias,
      '@/context': require('path').resolve(__dirname, 'context'),
    };
    
    return config;
  },
};

module.exports = nextConfig;
