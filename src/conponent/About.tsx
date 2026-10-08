import React from 'react';
import styled from 'styled-components';
import { about } from './data';

// 2a: 本文カラム + 右の目次。見出し→本文を縦に積んで読みやすくする
const Section = styled.section`
  padding: 0 40px 120px;
  display: grid;
  grid-template-columns: minmax(0, 1fr) 200px;
  gap: 64px;

  @media (max-width: 900px) {
    grid-template-columns: minmax(0, 1fr);
    gap: 0;
  }
  @media (max-width: 700px) {
    padding: 0 20px 100px;
  }
`;

const PageTitle = styled.h1`
  margin: 0;
  padding: 72px 0 32px;
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: clamp(40px, 7vw, 64px);
`;

// 左160px(番号・ラベル) + 右(見出し→本文)
const Row = styled.div`
  display: grid;
  grid-template-columns: 160px minmax(0, 1fr);
  gap: 40px;
  padding: 48px 0 56px;
  border-top: 2px solid var(--color-divider);
  scroll-margin-top: 140px; /* 固定ヘッダーのぶん、目次ジャンプ位置をずらす */

  @media (max-width: 640px) {
    grid-template-columns: 1fr;
    gap: 16px;
  }
`;
const Num = styled.div`
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 48px;
  line-height: 1;
  color: var(--color-accent);
`;
const Label = styled.div`
  margin-top: 8px;
  font-size: 13px;
  letter-spacing: 0.1em;
  text-transform: uppercase;
`;
const Lead = styled.h2`
  margin: 0 0 20px;
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: clamp(22px, 3vw, 30px);
  line-height: 1.5;
  text-wrap: pretty;
`;
const Body = styled.p`
  margin: 0;
  max-width: 660px;
  font-size: 16px;
  line-height: 2.1;
  color: var(--color-neutral-800);
  text-wrap: pretty;
`;

// 右の目次(スクロールしても追従)。クリックで各節へ
const Toc = styled.nav`
  align-self: start;
  position: sticky;
  top: 104px;
  display: flex;
  flex-direction: column;

  @media (max-width: 900px) {
    display: none;
  }
`;
const TocTitle = styled.div`
  margin-bottom: 12px;
  font-size: 11px;
  letter-spacing: 0.1em;
  color: var(--color-neutral-700);
`;
const TocLink = styled.a`
  display: flex;
  gap: 10px;
  padding: 10px 0;
  border-top: 1px solid var(--color-divider);
  color: var(--color-text);
  text-decoration: none;
  font-size: 14px;

  &:hover {
    color: var(--color-accent-700);
  }
`;
const TocNum = styled.span`
  font-weight: 600;
  color: var(--color-accent-700);
`;

const rowId = (num: string) => `about-${num}`;

export const About: React.FC = () => {
  return (
    <Section>
      <div>
        <PageTitle>自己紹介</PageTitle>
        {about.map((r) => (
          <Row key={r.num} id={rowId(r.num)}>
            <div>
              <Num>{r.num}</Num>
              <Label>{r.label}</Label>
            </div>
            <div>
              <Lead>{r.lead}</Lead>
              <Body>{r.body}</Body>
            </div>
          </Row>
        ))}
      </div>

      <Toc aria-label="目次">
        <TocTitle>目次</TocTitle>
        {about.map((r) => (
          <TocLink key={r.num} href={`#${rowId(r.num)}`}>
            <TocNum>{r.num}</TocNum>
            {r.label}
          </TocLink>
        ))}
      </Toc>
    </Section>
  );
};
