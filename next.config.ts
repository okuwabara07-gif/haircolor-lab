import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: '/haircolor-lab',
  assetPrefix: '/haircolor-lab',
}
export default nextConfig
