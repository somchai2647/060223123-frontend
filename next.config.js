/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['storage.naiin.com', 'www.b2s.co.th'],

  },
}

module.exports = nextConfig
