import { getAllPosts } from '@/lib/posts'
import Link from 'next/link'

export default function Home() {
  const posts = getAllPosts().slice(0, 12)
  return (
    <main style={{fontFamily:'-apple-system,sans-serif',maxWidth:'860px',margin:'0 auto',background:'#faf7ff',minHeight:'100vh'}}>
      <div style={{background:'linear-gradient(135deg,#7c3aed,#a855f7)',padding:'2.5rem 2rem',textAlign:'center'}}>
        <p style={{color:'rgba(255,255,255,0.7)',fontSize:'0.75rem',letterSpacing:'0.15em',marginBottom:'8px'}}>HAIR COLOR LAB</p>
        <h1 style={{color:'white',fontSize:'1.8rem',fontWeight:700,marginBottom:'0.75rem',lineHeight:1.3}}>ヘアカラー・白髪染め<br/>完全ガイド</h1>
        <p style={{color:'rgba(255,255,255,0.85)',fontSize:'0.9rem',marginBottom:'1.5rem'}}>市販カラーからサロン専売品まで徹底比較</p>
        <Link href="/blog" style={{display:'inline-block',padding:'10px 28px',background:'white',color:'#7c3aed',borderRadius:'24px',textDecoration:'none',fontWeight:700,fontSize:'0.9rem'}}>記事一覧を見る →</Link>
      </div>
      <div style={{padding:'1.5rem'}}>
        <div style={{background:'white',borderRadius:'14px',padding:'1rem 1.25rem',marginBottom:'1.5rem',border:'1.5px solid #e8d4ff'}}>
          <p style={{fontSize:'0.7rem',color:'#9333ea',fontWeight:700,marginBottom:'10px'}}>おすすめピックアップ</p>
          <a href="https://px.a8.net/svt/ejp?a8mat=4AZR8U+GDF5O2+3HS2+UVBPU" target="_blank" rel="noopener noreferrer sponsored"
            style={{display:'flex',alignItems:'center',gap:'12px',padding:'10px 14px',background:'#faf7ff',borderRadius:'10px',textDecoration:'none',border:'1px solid #e8d4ff'}}>
            <div style={{width:'36px',height:'36px',borderRadius:'8px',background:'#7c3aed',display:'flex',alignItems:'center',justifyContent:'center',flexShrink:0}}>
              <span style={{color:'white',fontSize:'1.1rem'}}>P</span>
            </div>
            <div style={{flex:1}}>
              <div style={{fontSize:'0.85rem',fontWeight:700,color:'#333',marginBottom:'2px'}}>ビューティーパーク</div>
              <div style={{fontSize:'0.72rem',color:'#888'}}>プロ用ヘアケア・カラー剤通販</div>
            </div>
            <span style={{fontSize:'0.75rem',color:'#9333ea',fontWeight:700}}>詳しく</span>
          </a>
        </div>
        <div style={{marginBottom:'1rem',display:'flex',justifyContent:'space-between',alignItems:'center'}}>
          <h2 style={{fontSize:'1rem',fontWeight:700,color:'#333'}}>新着記事</h2>
          <Link href="/blog" style={{fontSize:'0.78rem',color:'#9333ea',textDecoration:'none'}}>すべて見る</Link>
        </div>
        <div style={{display:'flex',flexDirection:'column',gap:'10px',marginBottom:'2rem'}}>
          {posts.map((post: any) => (
            <Link key={post.slug} href={`/blog/${post.slug}`}
              style={{display:'block',padding:'1rem 1.25rem',background:'white',borderRadius:'12px',border:'1px solid #ede9fe',textDecoration:'none'}}>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'12px'}}>
                <div style={{flex:1}}>
                  <div style={{fontSize:'0.9rem',fontWeight:700,color:'#222',lineHeight:1.4,marginBottom:'4px'}}>
                    {post.title ? String(post.title) : String(post.slug).replace(/-/g,' ')}
                  </div>
                  {post.description && (
                    <div style={{fontSize:'0.75rem',color:'#888',lineHeight:1.5}}>
                      {String(post.description).slice(0,80)}
                    </div>
                  )}
                  {post.date && (
                    <div style={{fontSize:'0.65rem',color:'#bbb',marginTop:'4px'}}>
                      {String(post.date).slice(0,10)}
                    </div>
                  )}
                </div>
                <span style={{color:'#c084fc',fontSize:'1.2rem',flexShrink:0}}>›</span>
              </div>
            </Link>
          ))}
        </div>
        <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:'10px',marginBottom:'2rem'}}>
          <a href="https://www.amazon.co.jp/s?k=ヘアカラー+おすすめ&tag=haircolorab22-22" target="_blank" rel="noopener noreferrer sponsored"
            style={{display:'flex',alignItems:'center',gap:'8px',padding:'12px',borderRadius:'10px',background:'#fff8e6',border:'1px solid #fcd34d',textDecoration:'none'}}>
            <span style={{fontSize:'1.3rem'}}>A</span>
            <div>
              <div style={{fontSize:'0.78rem',fontWeight:700,color:'#92400e'}}>Amazon</div>
              <div style={{fontSize:'0.65rem',color:'#b45309'}}>ヘアカラー検索</div>
            </div>
          </a>
          <a href="https://hb.afl.rakuten.co.jp/hgc/5253b9ed.08f9d938.5253b9ee.e71aefe8/?pc=https%3A%2F%2Fsearch.rakuten.co.jp%2Fsearch%2Fmall%2F%E3%83%98%E3%82%A2%E3%82%AB%E3%83%A9%E3%83%BC%2F" target="_blank" rel="noopener noreferrer sponsored"
            style={{display:'flex',alignItems:'center',gap:'8px',padding:'12px',borderRadius:'10px',background:'#fff0f0',border:'1px solid #fca5a5',textDecoration:'none'}}>
            <span style={{fontSize:'1.3rem'}}>R</span>
            <div>
              <div style={{fontSize:'0.78rem',fontWeight:700,color:'#991b1b'}}>楽天市場</div>
              <div style={{fontSize:'0.65rem',color:'#b91c1c'}}>ヘアカラー検索</div>
            </div>
          </a>
        </div>
        <div style={{textAlign:'center',padding:'1rem 0',borderTop:'1px solid #ede9fe'}}>
          <p style={{fontSize:'0.7rem',color:'#bbb',marginBottom:'4px'}}>2026 ヘアカラーLab | AOKAE合同会社</p>
          <p style={{fontSize:'0.65rem',color:'#ddd'}}>本サイトはアフィリエイト広告を含みます</p>
        </div>
      </div>
    </main>
  )
}
