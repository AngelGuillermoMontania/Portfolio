/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [
      'localhost',
      'https://api-portfolio-angel.herokuapp.com/'
    ]
  },
}

module.exports = nextConfig
