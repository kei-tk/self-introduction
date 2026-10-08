// サイトに出す文章・データをまとめた場所。文言はここだけ直せばよい。

export const TABS = [
  { id: 1, num: '01', label: '自己紹介' },
  { id: 2, num: '02', label: '技術スタック' },
  { id: 3, num: '03', label: '作品集' },
] as const;

export type About = { num: string; label: string; lead: string; body: string };

export const about: About[] = [
  {
    num: '01',
    label: 'About',
    lead: '本名は飛田啓斗と言います。',
    body: '察しの通り Kei という名前は、下の名前をもじっただけです。小さい頃、圭という友達がいて、二文字って呼びやすくていいなと羨ましく思ったのがきっかけです。',
  },
  {
    num: '02',
    label: 'Goal',
    lead: '人を楽しませることができるエンジニアになりたいです。',
    body: '「おっ」と目を引く面白さと面倒だと思わせない使いやすさ、その両方を大切にしながら、長く使ってもらえるものを作りたいと考えています。',
  },
  {
    num: '03',
    label: 'Hobby',
    lead: '趣味はゲームとラノベ、漫画などです。',
    body: '小さい頃からゲームをするのが好きで、人生の楽しみになるようなおもしろいゲームを作れるようになったらいいなとおもったのが、IT 業界に興味をもったきっかけです。',
  },
  {
    num: '04',
    label: 'Learning',
    lead: '大学生でプログラミングを中心に勉強しました。',
    body: '大学ではどちらかというと Arduino を操作するようなことを勉強することが多かったため、ほとんど独学でした。一度バイブコーディングでアプリケーションを作ったのですが、細かいところを修正したいと思った時に不便だと思い勉強するようになりました。Web 開発に手をつけたとき、プログラムを書いていて少しづつ出来上がっていくのがわかりやすく、それが楽しいと思い自分に合っていると感じました。',
  },
];

export type Tech = { num: string; name: string; sub: string; ctx: string; body: string };

export const tech: Tech[] = [
  { num: '01', name: 'Unity', sub: 'C#', ctx: 'サークル', body: 'ゲームを作成するサークルに所属したのでそこで利用していました。' },
  { num: '02', name: 'Python', sub: 'pandas · NumPy', ctx: '大学', body: '大学の講義で頻繁に利用する。チームでオセロゲームの開発を行ったりpandasやNumPyライブラリを利用してマルサスモデルの計算など行なっていました。' },
  { num: '03', name: 'HTML/CSS', sub: '', ctx: '独学', body: '軽くしか大学の授業では触れていませんでしたが、バイブコーディングでWebサイトを作っていた時に勉強をしたほうがいいと感じ、独学で学んでいたところこれは面白いなと感じ、Reactまで勉強を始めました。' },
  { num: '04', name: 'React', sub: '', ctx: '独学', body: 'HTMLやCSSを勉強をしていたこともあり、フロントエンドから勉強してひとまず個人制作を行えるようになりたいと思い着手しました。' },
  { num: '05', name: 'Next.js', sub: '', ctx: '独学', body: 'バックエンドまで触れるようになりたいと思い、DjangoやRest APIなどと悩みましたが、個人開発をする上ではこのようなフルスタックフレームワークがいいと思い着手しました。' },
];

import lightNovelFinderThumb from '../assets/light-novel-finder.jpg';

// url があれば外部サイトへのリンクになる。image があればサムネイルに使う(なければ枠のみ)
export type Work = {
  num: string;
  title: string;
  cat: string;
  tags: string[];
  url?: string;
  image?: string;
};

export const works: Work[] = [
  {
    num: '01',
    title: 'ライトノベル推薦サイト',
    cat: 'Web',
    tags: ['React', 'TypeScript', 'Supabase', 'Gemini'],
    url: 'https://light-novel-finder.vercel.app/',
    image: lightNovelFinderThumb,
  },
];
