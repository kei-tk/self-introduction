import React from 'react';
import styled from 'styled-components';
import { tech } from './data';

const Section = styled.section`
  padding: 0 40px 120px;

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

// 技術 / 使った場面 / 説明 の3列。狭い画面では縦積み
const grid = `
  display: grid;
  grid-template-columns: 240px 160px minmax(0, 1fr);
  gap: 40px;
  @media (max-width: 760px) {
    grid-template-columns: 1fr;
    gap: 10px;
  }
`;
const HeadRow = styled.div`
  ${grid}
  padding: 0 0 10px;
  border-bottom: 2px solid var(--color-divider);
  font-size: 11px;
  letter-spacing: 0.08em;
  color: var(--color-neutral-700);

  @media (max-width: 760px) {
    display: none;
  }
`;
const Row = styled.div`
  ${grid}
  padding: 32px 0;
  border-bottom: 1px solid var(--color-divider);
  align-items: baseline;
`;
const Name = styled.div`
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 32px;
  line-height: 1.1;
`;
const Sub = styled.div`
  margin-top: 6px;
  font-size: 13px;
  color: var(--color-neutral-700);
`;
const Tag = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 11px;
  letter-spacing: 0.02em;
  padding: 3px 10px;
  background: var(--color-accent-100);
  color: var(--color-accent-800);
`;
const Body = styled.p`
  margin: 0;
  font-size: 15px;
  line-height: 2;
  color: var(--color-neutral-800);
`;

export const Tech: React.FC = () => {
  return (
    <Section>
      <PageTitle>技術スタック</PageTitle>
      <HeadRow>
        <span>技術</span>
        <span>使った場面</span>
        <span>説明</span>
      </HeadRow>
      {tech.map((r) => (
        <Row key={r.num}>
          <div>
            <Name>{r.name}</Name>
            {r.sub && <Sub>{r.sub}</Sub>}
          </div>
          <div>
            <Tag>{r.ctx}</Tag>
          </div>
          <Body>{r.body}</Body>
        </Row>
      ))}
    </Section>
  );
};
