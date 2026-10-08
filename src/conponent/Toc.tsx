import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

// 右側に固定表示する目次。狭い画面では隠す
const Nav = styled.nav`
  position: sticky;
  top: 90px;
  align-self: flex-start;
  flex: 0 0 160px;
  display: flex;
  flex-direction: column;
  gap: 2px;

  @media (max-width: 900px) {
    display: none;
  }
`;

const Title = styled.div`
  margin-bottom: 10px;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: 0.15em;
  color: #6e8f9e;
`;

// 現在地は濃く・左線を強調、それ以外は薄く
const Item = styled.button<{ $active: boolean }>`
  appearance: none;
  background: none;
  cursor: pointer;
  text-align: left;
  padding: 6px 0 6px 14px;
  border: none;
  border-left: 2px solid ${({ $active }) => ($active ? '#2e4049' : 'rgba(46, 64, 73, 0.2)')};
  color: ${({ $active }) => ($active ? '#1a1a2e' : '#50707c')};
  font-size: 14px;
  font-weight: ${({ $active }) => ($active ? 500 : 400)};
  transition: color 0.2s, border-color 0.2s;

  &:hover {
    color: #1a1a2e;
  }
`;

export type TocSection = { id: string; label: string };

export const Toc: React.FC<{ sections: TocSection[] }> = ({ sections }) => {
  const [active, setActive] = useState(sections[0]?.id);

  useEffect(() => {
    // 各節の交差が変わるたびに現在地を再計算する。
    // クリックで節を上端に合わせるので「上端ラインを越えた最後の節」を現在地にし、
    // 最下部に着いたときは最後の節(上端に届かない)をハイライトする。
    // ※ この環境では scroll イベントが来ないため、判定の起動に IntersectionObserver を使う
    const LINE = 120;
    const last = sections[sections.length - 1]?.id;

    const update = () => {
      const atBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom && last) {
        setActive(last);
        return;
      }
      let current = sections[0]?.id;
      for (const s of sections) {
        const el = document.getElementById(s.id);
        if (el && el.getBoundingClientRect().top <= LINE) current = s.id;
      }
      if (current) setActive(current);
    };

    const io = new IntersectionObserver(update, { threshold: [0, 0.25, 0.5, 0.75, 1] });
    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    // 最下部のセンチネル。到達時に update を確実に起動させる
    const sentinel = document.getElementById('page-bottom');
    if (sentinel) io.observe(sentinel);
    update();
    return () => io.disconnect();
  }, [sections]);

  const go = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <Nav aria-label="目次">
      <Title>目次</Title>
      {sections.map((s) => (
        <Item key={s.id} $active={active === s.id} onClick={() => go(s.id)}>
          {s.label}
        </Item>
      ))}
    </Nav>
  );
};
