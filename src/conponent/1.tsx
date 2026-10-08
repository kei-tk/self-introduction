import React from 'react';
import styled from 'styled-components';
import { Reveal } from './Reveal';
import { Toc, TocSection } from './Toc';

// タブと繋がるページ本体。縦に長い記事にして、スクロールで各ブロックを表示する
const Page = styled.section`
  box-sizing: border-box;
  min-height: 100vh;
  margin: 0 1rem;
  background-color: #B8CFD9;
  border: 2px solid #6E8F9E;
  color: #1a1a2e;
`;

// 本文(Main)と右側の目次(Toc)を横並びにする器
const Shell = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 14vh 1.5rem 18vh;
  display: flex;
  align-items: flex-start;
  gap: 2.5rem;
`;

// 本文カラム。ブロック間を広くとり 1 つずつ出す
const Main = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 14vh;
`;

// カードと見出しを左右に振り分ける。$side='left' はカード左・見出し右、'right' はその逆。
// 狭い画面では縦積み(見出しは隠す)
const Block = styled.div<{ $side: 'left' | 'right' }>`
  scroll-margin-top: 80px; /* 上部に固定されたタブ帯のぶん、スクロール位置をずらす */
  display: flex;
  align-items: center;
  gap: 2.5rem;
  flex-direction: ${({ $side }) => ($side === 'left' ? 'row' : 'row-reverse')};

  @media (max-width: 760px) {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
  }
`;

// 一文目(大見出し)と本文をまとめる白カード
const Card = styled.div`
  flex: 0 1 560px;
  min-width: 0;
  background-color: #ffffff;
  border-radius: 16px;
  padding: 1.8rem 2rem;
`;

// カードの反対側の余白を埋める、大きく薄いセクション見出し(装飾)
const Side = styled.div<{ $side: 'left' | 'right' }>`
  flex: 1;
  min-width: 0;
  color: rgba(46, 64, 73, 0.3);
  text-align: ${({ $side }) => ($side === 'left' ? 'right' : 'left')};

  @media (max-width: 760px) {
    display: none;
  }
`;

const Num = styled.div`
  font-size: clamp(3rem, 7vw, 5.5rem);
  font-weight: 700;
  line-height: 1;
`;

const SideLabel = styled.div`
  margin-top: 0.4rem;
  font-size: 1.1rem;
  font-weight: 500;
  letter-spacing: 0.15em;
`;

// 一文目(大見出し)。カード内に置き、少し小さめ
const Lead = styled.h2`
  margin: 0 0 1rem;
  font-size: clamp(1.25rem, 3.2vw, 1.75rem);
  font-weight: 700;
  line-height: 1.5;
  letter-spacing: 0.02em;
`;

// 一文目以外をまとめた本文
const Body = styled.p`
  margin: 0;
  font-size: 1rem;
  line-height: 2;
  color: #33474f;
`;

const Stack = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
`;

const Chip = styled.span`
  font-size: 1rem;
  font-weight: 500;
  color: #294049;
  background-color: #DCEAF2;
  border: 1px solid #6E8F9E;
  padding: 8px 18px;
  border-radius: 999px;
`;

const TECH = ['C#', 'Unity', 'Python', 'HTML', 'CSS', 'React'];

// 目次の項目(各ブロックの id と一致させる)
const SECTIONS: TocSection[] = [
  { id: 'about', label: 'About' },
  { id: 'goal', label: 'Goal' },
  { id: 'hobby', label: 'Hobby' },
  { id: 'learning', label: 'Learning' },
  { id: 'skills', label: 'Skills' },
];

export const Page1: React.FC = () => {
  return (
    <Page>
      <Shell>
        <Main>
          <Reveal>
            <Block id="about" $side="left">
              <Card>
                <Lead>本名は飛田啓斗と言います。</Lead>
                <Body>
                  察しの通り Kei という名前は、下の名前をもじっただけです。小さい頃、圭という友達がいて、二文字って呼びやすくていいなと羨ましく思ったのがきっかけです。
                </Body>
              </Card>
              <Side $side="left" aria-hidden="true">
                <Num>01</Num>
                <SideLabel>About</SideLabel>
              </Side>
            </Block>
          </Reveal>

          <Reveal>
            <Block id="goal" $side="right">
              <Card>
                <Lead>人の人生に、楽しみを増やせるエンジニアになりたいです。</Lead>
                <Body>
                  「おっ」と目を引く面白さと面倒だと思わせない使いやすさ、その両方を大切にしながら、長く使ってもらえるものを作りたいと考えています。
                </Body>
              </Card>
              <Side $side="right" aria-hidden="true">
                <Num>02</Num>
                <SideLabel>Goal</SideLabel>
              </Side>
            </Block>
          </Reveal>

          <Reveal>
            <Block id="hobby" $side="left">
              <Card>
                <Lead>趣味はゲームとラノベ、漫画などです。</Lead>
                <Body>
                  小さい頃からゲームをするのが好きで、人生の楽しみになるようなおもしろいゲームを作れるようになったらいいなとおもったのが、IT 業界に興味をもったきっかけです。
                </Body>
              </Card>
              <Side $side="left" aria-hidden="true">
                <Num>03</Num>
                <SideLabel>Hobby</SideLabel>
              </Side>
            </Block>
          </Reveal>

          <Reveal>
            <Block id="learning" $side="right">
              <Card>
                <Lead>大学生でプログラミングを中心に勉強しました。</Lead>
                <Body>
                  大学ではどちらかというと Arduino を操作するようなことを勉強することが多かったため、ほとんど独学でした。一度バイブコーディングでアプリケーションを作ったのですが、保守が難しいものができてしまったので勉強するようになりました。Web 開発にも手をつけたとき、プログラムを書いていて少しづつ出来上がっていくのがわかりやすく、それが楽しいと思い自分に合っていると感じました。
                </Body>
              </Card>
              <Side $side="right" aria-hidden="true">
                <Num>04</Num>
                <SideLabel>Learning</SideLabel>
              </Side>
            </Block>
          </Reveal>

          <Reveal>
            <Block id="skills" $side="left">
              <Card>
                <Lead>自分が使っている技術スタック</Lead>
                <Stack>
                  {TECH.map((t) => (
                    <Chip key={t}>{t}</Chip>
                  ))}
                </Stack>
              </Card>
              <Side $side="left" aria-hidden="true">
                <Num>05</Num>
                <SideLabel>Skills</SideLabel>
              </Side>
            </Block>
          </Reveal>

          {/* 目次の最下部判定を確実に起動させるためのセンチネル */}
          <div id="page-bottom" aria-hidden="true" style={{ height: '1px' }} />
        </Main>

        <Toc sections={SECTIONS} />
      </Shell>
    </Page>
  );
};
