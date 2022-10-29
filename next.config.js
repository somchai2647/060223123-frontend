/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['storage.naiin.com', 'www.b2s.co.th'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60
  },

}

module.exports = nextConfig
