/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: [
      "res.cloudinary.com",
      "avatars.githubusercontent.com",
      "lh3.googleusercontent.com",
      "img.clerk.com",
      "a0.muscache.com",
      "vntraveller.com",
    ],
  },
};

module.exports = nextConfig;
