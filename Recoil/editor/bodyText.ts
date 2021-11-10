import { atom, selector } from 'recoil';

export const bodyTextEditorAtom = atom({
  key: 'bodyTextEditor',
  default: '',
});

export const bodyTextEditorLengthSelector = selector({
  key: 'bodyTextEditorLengthSelector',
  get: ({ get }) => {
    const bodyTextEditor = get(bodyTextEditorAtom);

    return bodyTextEditor
      .trim()
      .replace(/{{[0]}}/, '_____')
      .replace(/{{[0-9]+}}/g, '_').length;
  },
});

export const normalizedBodyTextEditorSelector = selector({
  key: 'normalizedBodyTextEditorSelector',
  get: ({ get }) => {
    const bodyTextEditor = get(bodyTextEditorAtom);

    return bodyTextEditor.trim().replace(/[\r\n|\r|\n]{3,}/g, '\n\n');
  },
});

export const renderedBodyTextEditorSelector = selector<string>({
  key: 'renderedBodyTextEditorSelector',
  get: ({ get }) => {
    const normalizedBodyTextEditor = get(normalizedBodyTextEditorSelector);
    const replaceBold = normalizedBodyTextEditor.replace(/\*(.*?)\*/g, (match, p1) => `<span class="font-semibold">${p1}</span>`);
    const replaceItalic = replaceBold.replace(/\_(.*?)\_/g, (match, p1) => `<i>${p1}</i>`);
    const replaceStrike = replaceItalic.replace(/\~(.*?)\~/g, (match, p1) => `<strike>${p1}</strike>`);
    const replaceMono = replaceStrike.replace(/\`\`\`(.*?)\`\`\`/g, (match, p1) => `<span class="font-mono">${p1}</span>`);

    return replaceMono;
  },
});
