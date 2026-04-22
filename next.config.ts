import type { NextConfig } from 'next'
const nextConfig: NextConfig = {
  images: { unoptimized: true },
  headers: async () => {
    return [
      {
        source: '/blog/:slug',
        headers: [
          {
            key: 'Cache-Control',
            value: 'public, s-maxage=60, stale-while-revalidate=120',
          },
        ],
      },
    ]
  },
}
export default nextConfig
