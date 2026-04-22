import Link from 'next/link'

export default function NotFound() {
  return (
    <main style={{maxWidth:'600px',margin:'0 auto',padding:'4rem 1rem',textAlign:'center'}}>
      <h1 style={{fontSize:'3rem',color:'#9333ea',marginBottom:'1rem'}}>404</h1>
      <h2 style={{fontSize:'1.2rem',marginBottom:'1rem',color:'#333'}}>ページが見つかりません</h2>
      <p style={{color:'#666',marginBottom:'2rem'}}>お探しのページは移動または削除された可能性があります。</p>
      <Link href="/blog" style={{background:'#9333ea',color:'#fff',padding:'12px 32px',borderRadius:'4px',textDecoration:'none',fontWeight:600}}>
        記事一覧へ戻る
      </Link>
    </main>
  )
}
