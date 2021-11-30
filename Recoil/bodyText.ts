import { atom, selector } from 'recoil';

export const bodyTextAtom = atom({
  key: 'bodyText',
  default: '',
});

export const bodyTextLengthSelector = selector({
  key: 'bodyTextLengthSelector',
  get: ({ get }) => {
    const bodyText = get(bodyTextAtom);

    return bodyText
      .trim()
      .replace(/{{[0]}}/, '_____')
      .replace(/{{[0-9]+}}/g, '_').length;
  },
});

export const normalizedBodyTextSelector = selector({
  key: 'normalizedBodyTextSelector',
  get: ({ get }) => {
    const bodyText = get(bodyTextAtom);

    return bodyText.trim().replace(/[\r\n|\r|\n]{3,}/g, '\n\n');
  },
});

export const renderedBodyTextSelector = selector<string>({
  key: 'renderedBodyTextSelector',
  get: ({ get }) => {
    const normalizedBodyText = get(normalizedBodyTextSelector);
    const replaceBold = normalizedBodyText.replace(/\*(.*?)\*/g, (match, p1) => `<span class="font-semibold">${p1}</span>`);
    const replaceItalic = replaceBold.replace(/\_(.*?)\_/g, (match, p1) => `<i>${p1}</i>`);
    const replaceStrike = replaceItalic.replace(/\~(.*?)\~/g, (match, p1) => `<strike>${p1}</strike>`);
    const replaceMono = replaceStrike.replace(/\`\`\`(.*?)\`\`\`/g, (match, p1) => `<span class="font-mono">${p1}</span>`);

    return replaceMono;
  },
});
