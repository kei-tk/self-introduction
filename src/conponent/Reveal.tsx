import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

// 画面に入るまでは下にずらして透明、入ったらフェードアップで表示する
const Wrap = styled.div<{ $visible: boolean }>`
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '28px')});
  transition: opacity 0.7s ease, transform 0.7s ease;
`;

type RevealProps = {
  children: React.ReactNode;
};

// スクロールで要素が現れる。一度表示したら監視を止める(再度隠さない)
export const Reveal: React.FC<RevealProps> = ({ children }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          io.disconnect();
        }
      },
      { threshold: 0.25 }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <Wrap ref={ref} $visible={visible}>
      {children}
    </Wrap>
  );
};
