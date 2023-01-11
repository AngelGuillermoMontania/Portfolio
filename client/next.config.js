/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'portfolio-production-3145.up.railway.app',
      'localhost'
    ]
  },
}

module.exports = nextConfig
