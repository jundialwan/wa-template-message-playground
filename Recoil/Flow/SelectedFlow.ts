import { atom } from 'recoil';

export const flowSelectedAtom = atom<string>({
  key: 'flowSelected',
  default: '',
});
