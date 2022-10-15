/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    loader: 'akamai',
    path: '',
  },
  basePath: '/Portofolio',
  assetPrefix: '/Portofolio',
};

module.exports = nextConfig;
