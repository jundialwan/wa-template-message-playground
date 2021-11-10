import { atom, DefaultValue, selector } from 'recoil';

export const companyImageAtom = atom({
  key: 'companyImage',
  default: '/logo-brand/panorama.png',
});

export const companyImageSelector = selector<string>({
  key: 'companyImageSelector',
  get: ({ get }) => {
    const companyImage = get(companyImageAtom);
    return companyImage;
  },
  set: ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      set(companyImageAtom, newValue);
    }
    return;
  },
});
