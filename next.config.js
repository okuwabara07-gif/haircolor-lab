/** @type {import('next').NextConfig} */
const nextConfig = {
  images: { unoptimized: true },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transpilePackages: ['next-mdx-remote'],
};
module.exports = nextConfig;
