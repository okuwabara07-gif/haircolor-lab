/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: '/haircolor-lab',
  assetPrefix: '/haircolor-lab',
  pageExtensions: ['ts', 'tsx', 'js', 'jsx'],
  transpilePackages: ['next-mdx-remote'],
};
module.exports = nextConfig;
