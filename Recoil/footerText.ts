import { atom, DefaultValue, selector } from 'recoil';

export const footerTextAtom = atom<string>({
  key: 'footerText',
  default: '',
});

export const footerTextSelector = selector<string>({
  key: 'footerTextSelector',
  get: ({ get }) => {
    const footerText = get(footerTextAtom);
    return footerText;
  },
  set: ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      set(footerTextAtom, newValue.substring(0, 60));
    }

    return;
  },
});

export const normalizedFooterTextSelector = selector({
  key: 'normalizedFooterTextSelector',
  get: ({ get }) => {
    const footerText = get(footerTextAtom);

    return footerText.trim().replace(/[\s]{2,}/g, ' ');
  },
});

export const footerTextLengthSelector = selector({
  key: 'footerTextLengthSelector',
  get: ({ get }) => {
    const footerText = get(footerTextAtom);
    return footerText.trim().replace(/[\s]{2,}/g, ' ').length;
  },
});
