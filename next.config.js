// const withNextIntl = require('next-intl/plugin')()

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "clubdizital-media.s3.ap-south-1.amazonaws.com",
        port: "",
        pathname: "/**"
      },
    ],
  }
}

module.exports = nextConfig
