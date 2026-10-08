import React from 'react';
import styled from 'styled-components';

// 変形アニメーションの時間
const DURATION = '0.4s';
// 枠線の色(ページ側の枠と合わせる)
const BORDER_COLOR = '#6E8F9E';

const Row = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  width: 100%;
`;

type NavProps = {
  $active: boolean; // 選択中(表示中)のページのタブか
  $moved: boolean; // タブ形状に変形したか(角丸・矢印・背景)
  $tabbed: boolean; // 枠線を表示するか
  $pageColor: string; // このボタンに対応するページの背景色
};

// 形(角丸・矢印・背景)は $moved、枠線は $tabbed と別々に切り替える。
// 値は 2 状態のみで、間の補間は CSS transition に任せる。
const NavButton = styled.button<NavProps>`
  box-sizing: border-box;
  flex: 1;
  padding: 0.75rem 0;
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a2e;
  cursor: pointer;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  /* 選択タブは変形後にページ色、その他は白 */
  background-color: ${({ $active, $moved, $pageColor }) => ($active && $moved ? $pageColor : '#ffffff')};

  /* intro は全角丸、タブ形状は上だけ角丸 */
  border-radius: ${({ $moved }) => ($moved ? '10px 10px 0 0' : '12px')};

  /* 上・左・右の枠線は $tabbed で表示。下線は常に無し */
  border: 2px solid ${({ $tabbed }) => ($tabbed ? BORDER_COLOR : 'transparent')};
  border-bottom: none;

  /* 選択タブは押した時点で下のページ上枠へ 2px 食い込み、下の線を消す。
     非選択はページ上枠が下を横切るので線が残る */
  position: relative;
  margin-bottom: ${({ $active }) => ($active ? '-2px' : '0')};
  z-index: ${({ $active }) => ($active ? 1 : 0)};

  transition: background-color ${DURATION}, border-color ${DURATION}, border-radius ${DURATION};

  &:hover {
    background-color: ${({ $pageColor }) => $pageColor};
  }
`;

// 文字下の二重下向き矢印。タブ形状になると畳んで消す
const Arrow = styled.span<{ $moved: boolean }>`
  display: flex;
  justify-content: center;
  overflow: hidden;
  max-height: ${({ $moved }) => ($moved ? '0' : '20px')};
  opacity: ${({ $moved }) => ($moved ? 0 : 1)};
  margin-top: ${({ $moved }) => ($moved ? '0' : '0.35rem')};
  transition: max-height ${DURATION}, opacity ${DURATION}, margin-top ${DURATION};
`;

// 下向きシェブロンを 2 つ縦に並べたアイコン
const DoubleChevron: React.FC = () => (
  <svg width="20" height="16" viewBox="0 0 20 16" fill="none" aria-hidden="true">
    <path d="M4 2 L10 7 L16 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M4 8 L10 13 L16 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

type ButtonsProps = {
  // ボタンが押されたとき、対応するページ番号(1-3)を親に渡す
  onSelect: (page: number) => void;
  moved: boolean; // タブ形状に変形したか
  tabbed: boolean; // 枠線を表示するか
  selected: number | null; // 表示中のページ番号
  colors: Record<number, string>; // ページ番号 → 背景色
};

// ページ切り替え用のボタン3つ
export const Buttons: React.FC<ButtonsProps> = ({ onSelect, moved, tabbed, selected, colors }) => {
  return (
    <Row>
      {[1, 2, 3].map((n) => (
        <NavButton
          key={n}
          onClick={() => onSelect(n)}
          $active={selected === n}
          $moved={moved}
          $tabbed={tabbed}
          $pageColor={colors[n]}
        >
          <span>ページ{n}</span>
          <Arrow $moved={moved}>
            <DoubleChevron />
          </Arrow>
        </NavButton>
      ))}
    </Row>
  );
};
