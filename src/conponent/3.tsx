import React from 'react';
import styled from 'styled-components';

const Section = styled.section`
  box-sizing: border-box;
  min-height: 100vh;
  margin: 0 1rem; /* 両脇 1rem の隙間。左右の枠が見える */
  background-color: #DCEAF2;
  /* タブと繋がるページ側の枠 */
  border: 2px solid #000000;

  display: flex;
  justify-content: center;
  align-items: center;
  font-size: clamp(1.25rem, 4vw, 2.5rem);
  font-weight: 700;
  color: #1a1a2e;
`;

export const Page3: React.FC = () => {
  return <Section>ページ3のコンテンツ</Section>;
};
