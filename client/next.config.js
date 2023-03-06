/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      process.env.NEXT_PUBLIC_PORTFOLIO_API.slice(8,-1),
      'localhost'
    ]
  },
}

module.exports = nextConfig
