import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'このサイトについて | ヘアカラーLab',
  description: 'ヘアカラーLabの運営者情報・サイトポリシーについて',
}

export default function AboutPage() {
  return (
    <main style={{maxWidth:'700px',margin:'0 auto',padding:'3rem 1rem'}}>
      <h1 style={{fontSize:'1.6rem',color:'#9333ea',marginBottom:'2rem',borderBottom:'2px solid #e8d4ff',paddingBottom:'1rem'}}>このサイトについて</h1>
      
      <section style={{marginBottom:'2rem'}}>
        <h2 style={{fontSize:'1.1rem',marginBottom:'0.8rem',color:'#333'}}>運営者情報</h2>
        <p style={{color:'#555',lineHeight:1.8}}>本サイト「ヘアカラーLab」は、AOKAE合同会社が運営するヘアカラー・白髪染め専門の情報メディアです。</p>
        <p style={{color:'#555',lineHeight:1.8,marginTop:'0.5rem'}}>運営者はヘンケルジャパン（シュワルツコフ）での15年以上の毛髪化粧品開発経験を持ち、科学的根拠に基づいた正確な情報をお届けします。</p>
      </section>

      <section style={{marginBottom:'2rem'}}>
        <h2 style={{fontSize:'1.1rem',marginBottom:'0.8rem',color:'#333'}}>サイトの目的</h2>
        <p style={{color:'#555',lineHeight:1.8}}>ヘアカラーや白髪染めに関する正確で役立つ情報を提供し、読者の方が自分に合ったヘアカラーを選べるようサポートすることを目的としています。</p>
      </section>

      <section style={{marginBottom:'2rem'}}>
        <h2 style={{fontSize:'1.1rem',marginBottom:'0.8rem',color:'#333'}}>広告・アフィリエイトについて</h2>
        <p style={{color:'#555',lineHeight:1.8}}>本サイトはAmazonアソシエイト・楽天アフィリエイト等のアフィリエイトプログラムに参加しています。記事内のリンクから商品をご購入いただいた場合、サイト運営者に報酬が発生することがあります。</p>
        <p style={{color:'#555',lineHeight:1.8,marginTop:'0.5rem'}}>また、Google AdSenseによる広告を掲載しています。広告収益はサイト運営・コンテンツ制作に充てています。</p>
      </section>

      <section>
        <h2 style={{fontSize:'1.1rem',marginBottom:'0.8rem',color:'#333'}}>お問い合わせ</h2>
        <p style={{color:'#555',lineHeight:1.8}}>ご質問・ご意見は <a href="https://aokae.net" style={{color:'#9333ea'}}>AOKAE合同会社</a> までお問い合わせください。</p>
      </section>
    </main>
  )
}
