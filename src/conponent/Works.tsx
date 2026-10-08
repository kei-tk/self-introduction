import React from 'react';
import styled from 'styled-components';
import { works } from './data';

const Section = styled.section`
  padding: 0 40px 120px;

  @media (max-width: 700px) {
    padding: 0 20px 100px;
  }
`;
const TitleRow = styled.div`
  padding: 72px 0 32px;
  display: flex;
  align-items: baseline;
  gap: 16px;
`;
const PageTitle = styled.h1`
  margin: 0;
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: clamp(40px, 7vw, 64px);
`;
const Count = styled.span`
  font-size: 13px;
  color: var(--color-neutral-700);
`;

// カードのグリッド。区切り線は各カードの box-shadow で引く。
// こうすると作品数が列数の倍数でなくても、空セルが灰色にならない
const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 0;

  @media (max-width: 900px) {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
  @media (max-width: 560px) {
    grid-template-columns: 1fr;
  }
`;
const Card = styled.a`
  display: flex;
  flex-direction: column;
  background: var(--color-bg);
  color: var(--color-text);
  text-decoration: none;
  box-shadow: 0 0 0 1px var(--color-divider);
  position: relative;

  &:hover {
    background: var(--color-accent-100);
    z-index: 1;
  }
`;
// サムネイル枠。画像があれば表示、なければハッチングのプレースホルダー
const Thumb = styled.div<{ $hasImage: boolean }>`
  position: relative;
  aspect-ratio: 16 / 10;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
  padding: 12px;
  font: 11px ui-monospace, Menlo, monospace;
  color: var(--color-neutral-700);
  background: ${({ $hasImage }) =>
    $hasImage
      ? 'var(--color-neutral-200)'
      : `repeating-linear-gradient(45deg, var(--color-neutral-200) 0 10px, var(--color-neutral-300) 10px 11px)`};
`;
const ThumbImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top center;
`;
// 画像の上でも読めるようにドメインを薄い下地のチップで表示
const Domain = styled.span`
  position: relative;
  z-index: 1;
  padding: 2px 6px;
  background: rgba(243, 242, 242, 0.88);
  color: var(--color-neutral-800);
`;
const Meta = styled.div`
  padding: 16px 20px 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const TitleLine = styled.div`
  display: flex;
  align-items: baseline;
  gap: 10px;
`;
const WNum = styled.span`
  font-size: 12px;
  font-weight: 600;
  color: var(--color-accent-700);
`;
const WTitle = styled.span`
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 18px;
`;
// 外部リンクがある作品に付く矢印マーク
const Ext = styled.span`
  display: inline-flex;
  color: var(--color-accent);

  svg {
    display: block;
  }
`;
const Tags = styled.div`
  display: flex;
  gap: 6px;
  flex-wrap: wrap;
`;
const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  padding: 3px 10px;
  background: var(--color-neutral-200);
  color: var(--color-neutral-800);
`;

// 外部リンクの矢印(↗)
const ExtArrow: React.FC = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="square" aria-hidden="true">
    <path d="M7 17 17 7" />
    <path d="M8 7h9v9" />
  </svg>
);

export const Works: React.FC = () => {
  return (
    <Section>
      <TitleRow>
        <PageTitle>作品集</PageTitle>
        <Count>{works.length}件</Count>
      </TitleRow>
      <Grid>
        {works.map((w) => (
          <Card
            key={w.num}
            href={w.url ?? '#'}
            target={w.url ? '_blank' : undefined}
            rel={w.url ? 'noopener noreferrer' : undefined}
          >
            {/* 画像があれば表示。url があれば枠内にドメインを重ねる */}
            <Thumb $hasImage={!!w.image}>
              {w.image && <ThumbImg src={w.image} alt={w.title} />}
              {w.url ? <Domain>{new URL(w.url).host}</Domain> : !w.image && 'サムネイル 16:10'}
            </Thumb>
            <Meta>
              <TitleLine>
                <WNum>{w.num}</WNum>
                <WTitle>{w.title}</WTitle>
                {w.url && (
                  <Ext>
                    <ExtArrow />
                  </Ext>
                )}
              </TitleLine>
              <Tags>
                {w.tags.map((g) => (
                  <Tag key={g}>{g}</Tag>
                ))}
              </Tags>
            </Meta>
          </Card>
        ))}
      </Grid>
    </Section>
  );
};
