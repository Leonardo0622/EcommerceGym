/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['localhost', 'ecommercegym.onrender.com'],
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '5000',
        pathname: '/uploads/**',
      },
      {
        protocol: 'https',
        hostname: 'ecommercegym.onrender.com',
        pathname: '/uploads/**',
      },
    ],
  },
};

export default nextConfig;
