/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'api-portfolio-angel.herokuapp.com',
      'localhost'
    ]
  },
}

module.exports = nextConfig
