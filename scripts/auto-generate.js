const https = require('https');
const fs = require('fs');
const path = require('path');

const ANTHROPIC_API_KEY = process.env.ANTHROPIC_API_KEY;
const AMAZON_TRACKING_ID = process.env.AMAZON_TRACKING_ID || 'haircolorab22-22';
const RAKUTEN_AFFILIATE_ID = process.env.RAKUTEN_AFFILIATE_ID || '5253b9ed.08f9d938.5253b9ee.e71aefe8';
const MOSHIMO_ID = '1184522';
const SITE_NAME = 'ヘアカラーLAB';
const TOPIC = 'ヘアカラー・白髪染め・セルフカラー';
const CRITERIA = '染まりやすさ・色持ち・ダメージ・コスパ・使いやすさ';

function moshimoAmazonLink(keyword) {
  const searchUrl = encodeURIComponent('https://www.amazon.co.jp/s?k=' + encodeURIComponent(keyword) + '&tag=' + AMAZON_TRACKING_ID);
  return 'https://af.moshimo.com/af/c/click?a_id=' + MOSHIMO_ID + '&p_id=170&pc_id=185&pl_id=4062&url=' + searchUrl;
}

function moshimoRakutenLink(keyword) {
  const searchUrl = encodeURIComponent('https://search.rakuten.co.jp/search/mall/' + encodeURIComponent(keyword) + '/?f=1&af=' + RAKUTEN_AFFILIATE_ID);
  return 'https://af.moshimo.com/af/c/click?a_id=' + MOSHIMO_ID + '&p_id=54&pc_id=54&pl_id=616&url=' + searchUrl;
}

function request(options, body) {
  return new Promise((resolve, reject) => {
    const req = https.request(options, res => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => resolve({ status: res.statusCode, body: data }));
    });
    req.on('error', reject);
    if (body) req.write(body);
    req.end();
  });
}

const KEYWORD_PATTERNS = {
  ranking: (topic) => [
    topic + 'おすすめランキング',
    topic + '人気ランキング',
    topic + 'コスパ最強ランキング',
    topic + 'プロおすすめランキング',
    topic + '口コミランキング',
  ],
  question: (topic) => [
    topic + 'どれがいい',
    topic + '選び方 失敗しない',
    topic + '違いは何',
    topic + '効果ある',
    topic + '初心者 どれ',
  ],
  worry: (topic) => [
    topic + '効果なかった 原因',
    topic + '失敗した 対処法',
    topic + 'デメリット',
    topic + '注意点',
  ],
  howto: (topic) => [
    topic + '正しい使い方',
    topic + '始め方 初心者',
    topic + '効果的な方法',
  ],
  comparison: (topic) => [
    topic + '市販 サロン 違い',
    topic + 'プチプラ デパコス 比較',
  ],
};

function getKeywords() {
  const topicBase = TOPIC.split('・')[0];
  const all = [];
  Object.values(KEYWORD_PATTERNS).forEach(fn => all.push(...fn(topicBase)));
  return all;
}

function getArticleType(keyword) {
  if (keyword.includes('どれ') || keyword.includes('選び方') || keyword.includes('違い')) return 'question';
  if (keyword.includes('失敗') || keyword.includes('効果なかった') || keyword.includes('注意')) return 'worry';
  if (keyword.includes('方法') || keyword.includes('使い方') || keyword.includes('始め方')) return 'howto';
  if (keyword.includes('比較') || keyword.includes('vs') || keyword.includes('市販')) return 'comparison';
  return 'ranking';
}

async function generateArticle(keyword) {
  const year = new Date().getFullYear();
  const articleType = getArticleType(keyword);
  const amazonLink = moshimoAmazonLink(keyword);
  const rakutenLink = moshimoRakutenLink(keyword);
  const imgSeed = Math.abs(keyword.split('').reduce((a,c) => a + c.charCodeAt(0), 0));

  const titles = {
    question: '【' + year + '年】' + keyword + '｜プロが本音で答えます',
    worry: keyword + 'を解決｜原因と正しい対処法【' + year + '年版】',
    howto: '【' + year + '年最新】' + keyword + '完全ガイド｜プロが徹底解説',
    comparison: '【' + year + '年】' + keyword + '｜違いをプロが徹底比較',
    ranking: '【' + year + '年最新】' + keyword + 'おすすめTOP5｜専門家が徹底比較',
  };
  const title = titles[articleType];

  const prompt = 'あなたはCRO専門家でもあるプロのレビューライターです。\n' +
    '「' + keyword + '」について、購買意欲を高める高品質な比較記事を日本語で書いてください。\n\n' +
    '以下の形式でMDXファイルとして出力してください：\n\n' +
    '---\n' +
    'title: "' + title + '"\n' +
    'date: "' + new Date().toISOString().split('T')[0] + '"\n' +
    'genre: "' + TOPIC.split('・')[0] + '"\n' +
    'excerpt: "' + keyword + 'について専門家が解説。選び方のポイントと実際におすすめできる商品を紹介します。"\n' +
    '---\n\n' +
    '![' + keyword + '](https://picsum.photos/seed/' + imgSeed + '/800/450)\n\n' +
    '## 結論：迷ったらこれを買えば間違いなし\n\n' +
    '[→ Amazonで' + keyword + 'を探す](' + amazonLink + ')\n' +
    '[→ 楽天で' + keyword + 'を探す](' + rakutenLink + ')\n\n' +
    '## ' + keyword + 'おすすめTOP5比較表\n\n' +
    '| 順位 | 商品名 | 総合評価 | 価格帯 | おすすめの人 |\n' +
    '|------|--------|---------|--------|------------|\n' +
    '| 🥇1位 | 商品A | ★★★★★ | ¥○○○○ | ○○な人 |\n' +
    '| 🥈2位 | 商品B | ★★★★☆ | ¥○○○○ | ○○な人 |\n' +
    '| 🥉3位 | 商品C | ★★★★☆ | ¥○○○○ | ○○な人 |\n\n' +
    '## 選び方のポイント（300文字以上で解説）\n\n' +
    '## 第1位〜第5位 詳細レビュー（各150文字以上）\n\n' +
    '[→ Amazonで今すぐ確認する](' + amazonLink + ')\n' +
    '[→ 楽天市場で最安値を見る](' + rakutenLink + ')\n\n' +
    '## まとめ（200文字以上）\n\n' +
    '※本記事はアフィリエイト広告を含みます。';

  const body = JSON.stringify({
    model: 'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages: [{ role: 'user', content: prompt }]
  });

  const res = await request({
    hostname: 'api.anthropic.com',
    path: '/v1/messages',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'x-api-key': ANTHROPIC_API_KEY,
      'anthropic-version': '2023-06-01',
      'Content-Length': Buffer.byteLength(body)
    }
  }, body);

  const data = JSON.parse(res.body);
  if (!data.content || !data.content[0]) throw new Error('API error: ' + res.body.slice(0, 200));
  return data.content[0].text;
}

async function main() {
  const blogDir = path.join(process.cwd(), 'content/blog');
  if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

  const keywords = getKeywords();
  const targets = keywords.slice(0, 5);
  console.log('Generating ' + targets.length + ' articles for ' + SITE_NAME + '...');

  for (const keyword of targets) {
    try {
      console.log('Generating: ' + keyword);
      const content = await generateArticle(keyword);
      const filename = Date.now() + '.mdx';
      fs.writeFileSync(path.join(blogDir, filename), content);
      console.log('Saved: ' + filename);
      await new Promise(r => setTimeout(r, 15000));
    } catch (e) {
      console.error('Error: ' + keyword, e.message);
    }
  }
  console.log('Done!');
}

main();
