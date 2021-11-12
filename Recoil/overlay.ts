import { atom } from 'recoil';

export const overlayAtom = atom<boolean>({
  key: 'overlay',
  default: false,
});
