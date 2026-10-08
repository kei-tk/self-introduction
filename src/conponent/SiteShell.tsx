import React, { useEffect, useRef, useState } from 'react';
import { useAtom } from 'jotai';
import styled, { keyframes } from 'styled-components';
import { enteredAtom, tabAtom } from './atoms';
import { TABS } from './data';
import { About } from './About';
import { Tech } from './Tech';
import { Works } from './Works';

const FADE = 1400; // イントロのタイトル順番フェード
const MORPH = 550; // タブ帯がヘッダーへせり上がる変形時間(ms)

// intro: 画面いっぱいの縦並び / entered: 上部に貼り付くヘッダー。
// この1要素のまま見た目を transition させることで「ボタン→タブ」の変形を表現する
const Stage = styled.div<{ $entered: boolean }>`
  background: var(--color-bg);
  display: flex;
  flex-direction: column;
  ${({ $entered }) =>
    $entered
      ? 'position: sticky; top: 0; z-index: 10; min-height: 0;'
      : 'min-height: 100vh;'}
`;

const Brand = styled.div`
  display: flex;
  align-items: baseline;
  gap: 16px;
  padding: 20px 40px;
  border-bottom: 2px solid var(--color-divider);

  @media (max-width: 700px) {
    padding: 16px 20px;
  }
`;
const BrandName = styled.span`
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: 20px;
`;
const BrandSub = styled.span`
  font-size: 13px;
  color: var(--color-neutral-700);
`;

// タイトル領域。intro では伸びて画面を埋め、選択時に高さ0へ畳まれてタブ帯が上がる
const Hero = styled.div<{ $heroH: number | null; $entered: boolean }>`
  flex: ${({ $heroH }) => ($heroH === null ? '1' : 'none')};
  height: ${({ $heroH }) => ($heroH === null ? 'auto' : `${$heroH}px`)};
  overflow: hidden;
  opacity: ${({ $entered }) => ($entered ? 0 : 1)};
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 40px;
  transition: height ${MORPH}ms ease, opacity ${MORPH * 0.8}ms ease;

  @media (max-width: 700px) {
    padding: 0 20px;
  }
`;
const Title = styled.h1`
  margin: 0;
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: clamp(44px, 9vw, 104px);
  line-height: 1.1;
  letter-spacing: -0.01em;
`;
const Line = styled.span<{ $visible: boolean; $delay: number }>`
  display: block;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '16px')});
  transition: opacity ${FADE}ms ease, transform ${FADE}ms ease;
  transition-delay: ${({ $delay }) => $delay}ms;
`;

// タブ帯。intro は下向き矢印つきの大きなボタン、entered で小さなヘッダータブへ変形
const TabRow = styled.div<{ $entered: boolean }>`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  border-top: 2px solid ${({ $entered }) => ($entered ? 'transparent' : 'var(--color-divider)')};
  border-bottom: 2px solid ${({ $entered }) => ($entered ? 'var(--color-divider)' : 'transparent')};
  transition: border-color ${MORPH}ms ease;
`;
const TabBtn = styled.button<{ $entered: boolean; $active: boolean; $last: boolean }>`
  appearance: none;
  font: inherit;
  background: transparent;
  border: none;
  border-right: ${({ $last }) => ($last ? 'none' : '2px solid var(--color-divider)')};
  border-top: 4px solid
    ${({ $entered, $active }) => ($entered && $active ? 'var(--color-accent)' : 'transparent')};
  color: ${({ $entered, $active }) =>
    !$entered || $active ? 'var(--color-text)' : 'var(--color-neutral-700)'};
  cursor: pointer;
  text-align: left;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ $entered }) => ($entered ? '6px' : '12px')};
  padding: ${({ $entered }) => ($entered ? '14px 40px 16px' : '24px 40px 28px')};
  transition: padding ${MORPH}ms ease, gap ${MORPH}ms ease, color 0.3s ease, border-color 0.3s ease,
    background 0.15s ease;

  &:hover {
    background: var(--color-accent-100);
  }

  @media (max-width: 700px) {
    padding: ${({ $entered }) => ($entered ? '10px 10px 12px' : '16px 12px 18px')};
  }
`;
const TabNum = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: var(--color-accent-700);

  @media (max-width: 700px) {
    font-size: 11px;
  }
`;
const TabLabel = styled.span<{ $entered: boolean }>`
  display: flex;
  align-items: center;
  gap: 10px;
  font-family: var(--font-heading);
  font-weight: 800;
  font-size: ${({ $entered }) => ($entered ? '18px' : '24px')};
  transition: font-size ${MORPH}ms ease;

  @media (max-width: 700px) {
    font-size: ${({ $entered }) => ($entered ? '13px' : '15px')};
  }
`;
// 矢印は entered で幅・不透明度を 0 にして畳む
const Arrow = styled.span<{ $entered: boolean }>`
  display: inline-flex;
  overflow: hidden;
  width: ${({ $entered }) => ($entered ? '0' : '22px')};
  opacity: ${({ $entered }) => ($entered ? 0 : 1)};
  transition: width ${MORPH}ms ease, opacity ${MORPH * 0.7}ms ease;

  svg {
    display: block;
  }
`;

const DownArrow: React.FC = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="square" aria-hidden="true">
    <path d="M12 5v14" />
    <path d="m19 12-7 7-7-7" />
  </svg>
);

// タブ切替時に本文を軽くフェードイン
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(8px); }
  to   { opacity: 1; transform: translateY(0); }
`;
const Content = styled.main`
  animation: ${fadeIn} 0.4s ease;
`;

const PAGES: Record<number, React.FC> = { 1: About, 2: Tech, 3: Works };

export const SiteShell: React.FC = () => {
  const [tab, setTab] = useAtom(tabAtom);
  const [entered, setEntered] = useAtom(enteredAtom);
  // null = intro(タイトルが flex で伸びる) / 数値 = 変形中にロックした高さ(px)
  const [heroH, setHeroH] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setVisible(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const select = (id: number) => {
    setTab(id);
    if (entered) {
      window.scrollTo(0, 0); // ヘッダーのタブ間移動は先頭へ
      return;
    }
    // intro から初めて押したとき: 今のタイトル高さを固定 → 次のフレームで 0 へ縮めて
    // タブ帯を上部へせり上げる(高さを一度確定させてから変えると transition が走る)
    const h = heroRef.current?.offsetHeight ?? 0;
    setHeroH(h);
    window.setTimeout(() => {
      setEntered(true);
      setHeroH(0);
    }, 30);
  };

  const Page = PAGES[tab];

  return (
    <>
      <Stage $entered={entered}>
        <Brand>
          <BrandName>Kei</BrandName>
          <BrandSub>ポートフォリオ</BrandSub>
        </Brand>

        <Hero ref={heroRef} $heroH={heroH} $entered={entered}>
          <Title>
            <Line $visible={visible} $delay={0}>初めまして、</Line>
            <Line $visible={visible} $delay={FADE}>Keiです</Line>
          </Title>
        </Hero>

        <TabRow $entered={entered}>
          {TABS.map((t, i) => (
            <TabBtn
              key={t.id}
              $entered={entered}
              $active={tab === t.id}
              $last={i === TABS.length - 1}
              onClick={() => select(t.id)}
              aria-current={entered && tab === t.id ? 'page' : undefined}
            >
              <TabNum>{t.num}</TabNum>
              <TabLabel $entered={entered}>
                {t.label}
                <Arrow $entered={entered}>
                  <DownArrow />
                </Arrow>
              </TabLabel>
            </TabBtn>
          ))}
        </TabRow>
      </Stage>

      {entered && (
        <Content key={tab}>
          <Page />
        </Content>
      )}
    </>
  );
};
