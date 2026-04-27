import { getEnPostBySlug, getAllEnPosts } from '@/lib/posts'
import { MDXRemote } from 'next-mdx-remote/rsc'
import { notFound } from 'next/navigation'

export const revalidate = 60

export async function generateStaticParams() {
  try {
    const posts = getAllEnPosts()
    return posts.map((post: any) => ({ slug: post.slug }))
  } catch (error) {
    console.error('generateStaticParams error:', error)
    return []
  }
}

export async function generateMetadata({ params }: any) {
  const { slug } = await params
  const post = getEnPostBySlug(slug)
  if (!post) return {}
  return {
    title: post.title,
    description: post.description || post.excerpt || ''
  }
}

function img(kw: string, w: number, h: number) {
  const seed = Math.abs(kw.split('').reduce((a:number,c:string)=>a+c.charCodeAt(0),0)) % 9999
  const genre = kw.toLowerCase()
  let topic = 'beauty,salon,cosmetics'
  if(/hair|color|white/.test(kw)) topic = 'hair,salon,beauty'
  else if(/skin|skincare|moisture/.test(kw)) topic = 'skincare,cosmetics,beauty'
  else if(/makeup|cosmetics|lipstick/.test(kw)) topic = 'makeup,cosmetics,beauty'
  else if(/diet|fitness|weight/.test(kw)) topic = 'fitness,diet,health'
  else if(/finance|investment|money/.test(kw)) topic = 'finance,business,money'
  else if(/business|career|work/.test(kw)) topic = 'business,work,career'
  else if(/supplement|protein|nutrition/.test(kw)) topic = 'health,supplement,nutrition'
  else if(/nail/.test(kw)) topic = 'nail,beauty,hands'
  else if(/fragrance|perfume/.test(kw)) topic = 'perfume,fragrance,luxury'
  else if(/korean|kbeauty/.test(kw)) topic = 'korean,beauty,cosmetics'
  return `https://loremflickr.com/${w}/${h}/${topic}?lock=${seed}`
}

type Props = { params: Promise<{ slug: string }> }

export default async function EnPostPage({ params }: Props) {
  const { slug } = await params
  const post = getEnPostBySlug(slug)
  if (!post) notFound()
  const related = getAllEnPosts().filter((p: any) => p.slug !== slug).slice(0, 4)
  const amz = `https://www.amazon.com/s?k=${encodeURIComponent(post.title||'')}`

  return (
    <main>
      <header className="site-header">
        <div className="site-title">{post.title}</div>
      </header>
      <article style={{maxWidth:'860px',margin:'0 auto',padding:'2rem 1.5rem 4rem'}}>
        <img src={img(post.title,800,360)} alt={post.title} style={{width:'100%',height:'360px',objectFit:'cover',borderRadius:'16px',marginBottom:'1.5rem'}} />
        <span className="section-label">{post.genre}</span>
        <h1 style={{fontSize:'1.6rem',fontWeight:900,margin:'.75rem 0 .5rem',lineHeight:1.3,color:'var(--text)'}}>{post.title}</h1>
        <p style={{fontSize:'.75rem',opacity:.5,marginBottom:'2rem'}}>{post.date}</p>
        <div style={{marginBottom:'2rem',padding:'1.25rem',background:'var(--card)',borderRadius:'16px',border:'2px solid var(--secondary)'}}>
          <p style={{fontSize:'.75rem',color:'var(--accent)',fontWeight:700,marginBottom:'.75rem'}}>Before reading this article</p>
          <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'.75rem'}}>
            <a href={amz} target="_blank" rel="noopener noreferrer sponsored" style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px',background:'var(--bg)',borderRadius:'12px',textDecoration:'none',border:'1px solid var(--secondary)'}}>
              <span style={{fontSize:'1.2rem'}}>📦</span>
              <div><div style={{fontSize:'.75rem',fontWeight:700,color:'var(--text)'}}>Find on Amazon</div></div>
            </a>
            <a href={'#'} target="_blank" rel="noopener noreferrer sponsored" style={{display:'flex',alignItems:'center',gap:'8px',padding:'10px',background:'var(--bg)',borderRadius:'12px',textDecoration:'none',border:'1px solid var(--secondary)'}}>
              <span style={{fontSize:'1.2rem'}}>🛍</span>
              <div><div style={{fontSize:'.75rem',fontWeight:700,color:'var(--text)'}}>Shop Now</div></div>
            </a>
          </div>
        </div>
        <div style={{fontSize:'.95rem',lineHeight:1.9,color:'var(--text)'}}>
          <MDXRemote source={post.content} />
        </div>
        <img src={img(post.title,800,400)} alt={post.title} style={{width:'100%',height:'280px',objectFit:'cover',borderRadius:'12px',margin:'2rem 0'}} />
        <div style={{margin:'2rem 0',padding:'1.5rem',background:'var(--card)',borderRadius:'16px',border:'2px solid var(--primary)'}}>
          <p style={{fontSize:'.85rem',fontWeight:700,color:'var(--primary)',marginBottom:'1rem'}}>Recommended Products</p>
          <div style={{display:'flex',flexDirection:'column',gap:'10px'}}>
            <a href={amz} target="_blank" rel="noopener noreferrer sponsored" style={{display:'flex',alignItems:'center',gap:'12px',padding:'10px',background:'var(--bg)',borderRadius:'10px',textDecoration:'none',border:'1px solid var(--primary)'}}>
              <span style={{fontWeight:900,color:'var(--primary)',minWidth:'36px'}}>1</span>
              <span style={{fontSize:'.85rem',fontWeight:600,color:'var(--text)'}}>Amazon Best Seller</span>
              <span style={{marginLeft:'auto',fontSize:'.75rem',color:'var(--accent)'}}>→</span>
            </a>
            <a href={'#'} target="_blank" rel="noopener noreferrer sponsored" style={{display:'flex',alignItems:'center',gap:'12px',padding:'10px',background:'var(--bg)',borderRadius:'10px',textDecoration:'none',border:'1px solid var(--accent)'}}>
              <span style={{fontWeight:900,color:'var(--accent)',minWidth:'36px'}}>2</span>
              <span style={{fontSize:'.85rem',fontWeight:600,color:'var(--text)'}}>Popular Items</span>
              <span style={{marginLeft:'auto',fontSize:'.75rem',color:'var(--accent)'}}>→</span>
            </a>
          </div>
        </div>
        <img src={img((post.genre||'')+' '+post.title,800,350)} alt={post.title} style={{width:'100%',height:'240px',objectFit:'cover',borderRadius:'12px',margin:'2rem 0'}} />
        <div style={{marginTop:'3rem',borderTop:'2px solid var(--secondary)',paddingTop:'2rem'}}>
          <p style={{fontSize:'.8rem',color:'var(--accent)',fontWeight:700,marginBottom:'1rem'}}>Related Articles</p>
          <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(200px,1fr))',gap:'12px'}}>
            {related.map((r: any) => (
              <a key={r.slug} href={'/en/blog/'+r.slug} style={{display:'block',padding:'12px',background:'var(--card)',borderRadius:'12px',border:'1px solid var(--secondary)',textDecoration:'none'}}>
                <div style={{fontSize:'.65rem',color:'var(--accent)',marginBottom:'4px'}}>{r.genre}</div>
                <div style={{fontSize:'.8rem',fontWeight:700,color:'var(--text)',lineHeight:1.3}}>{r.title}</div>
              </a>
            ))}
          </div>
        </div>
      </article>
    </main>
  )
}
