import { atom } from 'recoil';

type flowSelectedProps = {
  id: number;
  name: string;
};

export const flowSelectedAtom = atom<flowSelectedProps>({
  key: 'flowSelected',
  default: {
    id: 1,
    name: 'Checkout',
  },
});
