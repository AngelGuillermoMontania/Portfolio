/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'portfolio-production-bfb2.up.railway.app',
      'localhost'
    ]
  },
}

module.exports = nextConfig
