import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// 1つの文字列がフェードしきるまでの時間(ms)
const FADE_DURATION = 2000;

// 最初のページ本体。下に続くボタン(sticky)が最初の画面の下側に見えるよう 80vh にする
const IntroSection = styled.section`
  height: 80vh;
  background-color: #DCEAF2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

// $visible は DOM へ渡さないための transient prop($ 始まり)
// $delay で開始タイミングをずらし、順番に表示させる
const Text = styled.span<{ $visible: boolean; $delay: number }>`
  display: inline-block;
  margin: 0;
  font-size: clamp(1.5rem, 5vw, 3rem);
  font-weight: 700;
  letter-spacing: 0.08em;
  color: #1a1a2e;
  text-align: center;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transition: opacity ${FADE_DURATION}ms ease-in;
  transition-delay: ${({ $delay }) => $delay}ms;
`;

export const Intro: React.FC = () => {
  // マウント直後は opacity:0、次フレームで 1 に切り替えてフェードインさせる
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // 初回描画(opacity:0)を確定させてから true にしないと transition が走らない
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <IntroSection>
      <div>
        {/* 1つ目は遅延0、2つ目は1つ目が終わる頃に開始して順番に表示 */}
        <Text $visible={visible} $delay={0}>初めまして、</Text>
        <Text $visible={visible} $delay={FADE_DURATION}>Keiです</Text>
      </div>
    </IntroSection>
  );
};
