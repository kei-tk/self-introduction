import { atom } from 'jotai';

// 表示中のタブ (1:自己紹介 / 2:技術スタック / 3:作品集)
export const tabAtom = atom(1);

// イントロを抜けてサイト本体に入ったか (false ならイントロ画面)
export const enteredAtom = atom(false);
