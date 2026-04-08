export const dynamic = "force-static"

import { getAllPosts } from '@/lib/posts'
import { MetadataRoute } from 'next'

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts()
  const base = process.env.NEXT_PUBLIC_BASE_URL || 'https://okuwabara07-gif.github.io/haircolor-lab'

  return [
    { url: base, changeFrequency: 'daily', priority: 1.0 },
    { url: `${base}/blog`, changeFrequency: 'daily', priority: 0.9 },
    ...posts.map(p => ({
      url: `${base}/blog/${p.slug}`,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    })),
  ]
}
