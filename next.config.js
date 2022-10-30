/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ['storage.naiin.com', 'cdn-local.mebmarket.com', 'www.b2s.co.th'],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60
  },

}

module.exports = nextConfig
