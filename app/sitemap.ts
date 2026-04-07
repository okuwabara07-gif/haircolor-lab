export const dynamic = 'force-static'
export const revalidate = false

import { getAllPosts } from '@/lib/posts';

export default function sitemap() {
  const posts = getAllPosts();
  const baseUrl = 'https://okuwabara07-gif.github.io/haircolor-lab';

  const postUrls = posts.map(post => ({
    url: `${baseUrl}/blog/${post.slug}`,
    lastModified: post.date || new Date().toISOString(),
  }));

  return [
    { url: baseUrl, lastModified: new Date().toISOString() },
    ...postUrls,
  ];
}
