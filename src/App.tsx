import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import './App.css';
import { Intro } from './conponent/intro';
import { Page1 } from './conponent/1';
import { Page2 } from './conponent/2';
import { Page3 } from './conponent/3';
import { Buttons } from './conponent/Buttons';

// ページ番号 → コンポーネント / 背景色
const PAGES: Record<number, React.FC> = { 1: Page1, 2: Page2, 3: Page3 };
const PAGE_COLORS: Record<number, string> = { 1: '#B8CFD9', 2: '#DCEAF2', 3: '#DCEAF2' };

// intro の高さ(vh)。タブ部分と合わせて最初の画面(100vh)を埋める
const INTRO_VH = 80;

// フェーズの所要時間(ms)
const MOVE_MS = 450; // 形を変えて button を下へ
const SCROLL_MS = 700; // スクロールしながら枠線を表示

// 次ページの「タブ部分」。intro と合わせて最初の画面を埋めるので、次ページは画面外(下)から
// 始まり、押した瞬間に枠線・色が覗かない。$tabbed で高さを 0 に縮めてコンパクトなタブ帯へ。
const TabArea = styled.div<{ $tabbed: boolean }>`
  box-sizing: border-box;
  position: sticky;
  top: 0;
  z-index: 20;
  min-height: ${({ $tabbed }) => ($tabbed ? '0' : `${100 - INTRO_VH}vh`)};
  padding: 1rem 1rem 0; /* 左右 1rem = ボタン両端の隙間(本ページの両脇と揃える) */
  background-color: #DCEAF2;
  display: flex;
  flex-direction: column;
  transition: min-height ${SCROLL_MS}ms;
`;

// button の上下に置くスペーサー。flex-grow の比で button を上端↔下端へ動かす
const Spacer = styled.div<{ $grow: number }>`
  flex-basis: 0;
  flex-grow: ${({ $grow }) => $grow};
  transition: flex-grow ${MOVE_MS}ms;
`;

function App() {
  // 表示中のページ番号 / intro を表示するか
  const [selected, setSelected] = useState<number | null>(null);
  const [showIntro, setShowIntro] = useState(true);
  // moved: 形を変えて button を下へ / tabbed: スクロール+枠線表示+タブ帯を縮小
  const [moved, setMoved] = useState(false);
  const [tabbed, setTabbed] = useState(false);
  const tabRef = useRef<HTMLDivElement>(null);
  const animating = useRef(false);

  const handleSelect = (page: number) => {
    // intro 削除後はページ切替のみ
    if (!showIntro) {
      setSelected(page);
      window.scrollTo(0, 0);
      return;
    }
    if (animating.current) return; // アニメ中の多重起動を防ぐ
    animating.current = true;
    setSelected(page);

    // 1) 形を変えて button を下へ(CSS transition)
    setMoved(true);

    // 2) スクロールしながら枠線を表示、タブ帯を縮める
    window.setTimeout(() => {
      setTabbed(true);
      window.scrollTo({ top: tabRef.current?.offsetTop ?? 0, behavior: 'smooth' });
    }, MOVE_MS);

    // 3) 完了: intro を削除して先頭へ
    window.setTimeout(() => {
      setShowIntro(false);
      window.scrollTo(0, 0);
      animating.current = false;
    }, MOVE_MS + SCROLL_MS);
  };

  const SelectedPage = selected ? PAGES[selected] : null;

  return (
    <>
      {showIntro && <Intro />}
      <TabArea ref={tabRef} $tabbed={tabbed}>
        {/* moved で上下スペーサーの比を入れ替え、button を上端(元の位置)↔下端(ページ接続)へ */}
        <Spacer $grow={moved ? 1 : 0} />
        <Buttons
          onSelect={handleSelect}
          moved={moved}
          tabbed={tabbed}
          selected={selected}
          colors={PAGE_COLORS}
        />
        <Spacer $grow={moved ? 0 : 1} />
      </TabArea>
      {SelectedPage && <SelectedPage />}
    </>
  );
}

export default App;
