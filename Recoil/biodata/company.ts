import { atom, DefaultValue, selector } from 'recoil';

export const companyNameAtom = atom({
  key: 'companyName',
  default: 'Xendit',
});

export const companyNameSelector = selector<string>({
  key: 'companyNameSelector',
  get: ({ get }) => {
    const companyText = get(companyNameAtom);
    return companyText;
  },
  set: ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      set(companyNameAtom, newValue.substring(0, 15));
    }

    return;
  },
});
