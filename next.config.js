/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ['res.cloudinary.com'], // Add Cloudinary domain for Next.js Image optimization
  },
}

module.exports = nextConfig

