import { getAllPosts } from '@/lib/posts';

export default function DashboardPage() {
  const posts = getAllPosts();
  const total = posts.length;
  const haircolor = posts.filter(p => p.genre === 'haircolor').length;
  const haircare = posts.filter(p => p.genre === 'haircare').length;
  const skincare = posts.filter(p => p.genre === 'skincare').length;
  const today = new Date().toLocaleDateString('ja-JP');

  return (
    <div style={{maxWidth:900,margin:'0 auto',padding:'32px 24px',fontFamily:'var(--ff-body)'}}>
      <h1 style={{fontSize:24,fontWeight:700,marginBottom:8,color:'var(--ink)'}}>アフィリエイト進捗ダッシュボード</h1>
      <p style={{fontSize:13,color:'var(--muted)',marginBottom:32}}>{today} 現在</p>
      <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginBottom:32}}>
        {[
          {label:'総記事数',val:`${total}本`,sub:'自動更新中'},
          {label:'今月推定収益',val:'¥0〜',sub:'流入開始まで2〜3ヶ月'},
          {label:'自動投稿',val:'週40本',sub:'月水金日 2回/日'},
          {label:'アフィリエイト',val:'2社',sub:'Amazon + 楽天'},
        ].map(s=>(
          <div key={s.label} style={{background:'var(--pink-lt)',borderRadius:10,padding:'16px 18px'}}>
            <div style={{fontSize:12,color:'var(--muted)',marginBottom:6}}>{s.label}</div>
            <div style={{fontSize:22,fontWeight:700,color:'var(--ink)'}}>{s.val}</div>
            <div style={{fontSize:11,color:'var(--muted)',marginTop:4}}>{s.sub}</div>
          </div>
        ))}
      </div>
      <div style={{display:'grid',gridTemplateColumns:'1fr 1fr',gap:20,marginBottom:32}}>
        <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:12,padding:'20px'}}>
          <h2 style={{fontSize:15,fontWeight:700,marginBottom:16,color:'var(--ink)'}}>ジャンル別記事数</h2>
          {[
            {label:'🎨 ヘアカラー',val:haircolor,color:'#E91E8C'},
            {label:'✨ ヘアケア',val:haircare,color:'#00BCD4'},
            {label:'🌸 スキンケア',val:skincare,color:'#FF7043'},
          ].map(g=>(
            <div key={g.label} style={{marginBottom:12}}>
              <div style={{display:'flex',justifyContent:'space-between',fontSize:13,marginBottom:4}}>
                <span style={{color:'var(--ink)'}}>{g.label}</span>
                <span style={{color:'var(--muted)'}}>{g.val}本</span>
              </div>
              <div style={{height:6,background:'var(--border)',borderRadius:3,overflow:'hidden'}}>
                <div style={{height:'100%',width:`${total?Math.round(g.val/total*100):0}%`,background:g.color,borderRadius:3}}/>
              </div>
            </div>
          ))}
        </div>
        <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:12,padding:'20px'}}>
          <h2 style={{fontSize:15,fontWeight:700,marginBottom:16,color:'var(--ink)'}}>収益化ロードマップ</h2>
          {[
            {label:'記事量産・自動投稿',status:'完了',color:'#10B981'},
            {label:'Amazon・楽天登録',status:'完了',color:'#10B981'},
            {label:'Search Console登録',status:'完了',color:'#10B981'},
            {label:'Googleインデックス開始',status:'2〜4週後',color:'#F59E0B'},
            {label:'初収益発生',status:'2〜3ヶ月後',color:'#aaa'},
            {label:'月収10万円達成',status:'6ヶ月後目標',color:'#aaa'},
          ].map(r=>(
            <div key={r.label} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 0',borderBottom:'1px solid var(--border)',fontSize:12}}>
              <span style={{color:'var(--ink)'}}>{r.label}</span>
              <span style={{color:r.color,fontWeight:600,fontSize:11}}>{r.status}</span>
            </div>
          ))}
        </div>
      </div>
      <div style={{background:'#fff',border:'1px solid var(--border)',borderRadius:12,padding:'20px',marginBottom:32}}>
        <h2 style={{fontSize:15,fontWeight:700,marginBottom:16,color:'var(--ink)'}}>クイックリンク</h2>
        <div style={{display:'flex',gap:10,flexWrap:'wrap'}}>
          {[
            {label:'サイトを見る',url:'https://haircolor-lab.vercel.app'},
            {label:'記事一覧',url:'https://haircolor-lab.vercel.app/blog'},
            {label:'GitHub Actions',url:'https://github.com/okuwabara07-gif/haircolor-lab/actions'},
            {label:'Search Console',url:'https://search.google.com/search-console'},
            {label:'Amazon アソシエイト',url:'https://affiliate.amazon.co.jp'},
            {label:'楽天アフィリエイト',url:'https://affiliate.rakuten.co.jp'},
          ].map(l=>(
            <a key={l.label} href={l.url} target="_blank" style={{background:'var(--pink-lt)',color:'var(--pink)',borderRadius:20,padding:'6px 14px',fontSize:12,fontWeight:600,textDecoration:'none'}}>{l.label}</a>
          ))}
        </div>
      </div>
      <p style={{fontSize:12,color:'var(--muted)',textAlign:'center'}}>このページをブックマークしてデスクトップに保存してください</p>
    </div>
  );
}
