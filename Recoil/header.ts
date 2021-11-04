import { atom, DefaultValue, selector } from 'recoil';

export type HeaderType = 'none' | 'image' | 'video' | 'document' | 'text';
export type HeaderComponent = {
  type: HeaderType;
  image?: {
    path: string;
  };
  video?: {
    path: string;
  };
  document?: {
    path: string;
    filename: string;
  };
  text?: string;
};

export const headerAtom = atom<HeaderComponent>({
  key: 'header',
  default: {
    type: 'none',
  },
});

export const headerTypeSelector = selector<HeaderType>({
  key: 'headerTypeSelector',
  get: ({ get }) => {
    const headerComponent = get(headerAtom);
    return headerComponent.type;
  },
  set: ({ set }, newButtonType) => {
    if (!(newButtonType instanceof DefaultValue)) {
      set(headerAtom, (prev) => ({
        ...prev,
        type: newButtonType,
      }));
    }

    return;
  },
});

export const headerImageSelector = selector<string>({
  key: 'headerImageSelector',
  get: ({ get }) => {
    const headerComponent = get(headerAtom);
    return headerComponent?.image?.path || ' ';
  },
  set: ({ set }, newHeaderImagePath) => {
    if (!(newHeaderImagePath instanceof DefaultValue)) {
      set(headerAtom, (prev) => ({
        ...prev,
        image: {
          ...prev.image,
          path: newHeaderImagePath,
        },
      }));
    }

    return;
  },
});

export const headerVideoSelector = selector<string>({
  key: 'headerVideoSelector',
  get: ({ get }) => {
    const headerComponent = get(headerAtom);
    return headerComponent?.video?.path || ' ';
  },
  set: ({ set }, newHeaderVideoPath) => {
    if (!(newHeaderVideoPath instanceof DefaultValue)) {
      set(headerAtom, (prev) => ({
        ...prev,

        video: {
          ...prev.video,
          path: newHeaderVideoPath,
        },
      }));
    }
    return;
  },
});

export const headerTextSelector = selector<string>({
  key: 'headerTextSelector',
  get: ({ get }) => {
    const headerComponent = get(headerAtom);

    return headerComponent.text || '';
  },
  set: ({ set }, newHeaderText) => {
    if (!(newHeaderText instanceof DefaultValue)) {
      set(headerAtom, (prev) => ({
        ...prev,
        text: newHeaderText.substring(0, 60),
      }));
    }

    return;
  },
});

export const headerDocumentsNameSelector = selector<string>({
  key: 'headerDocumentsNameSelector',
  get: ({ get }) => {
    const headerComponent = get(headerAtom);
    return headerComponent?.document?.filename || ' ';
  },
  set: ({ set }, newHeaderDocFilename) => {
    if (!(newHeaderDocFilename instanceof DefaultValue)) {
      set(headerAtom, (prev) => ({
        ...prev,

        document: {
          ...prev.document,
          filename: newHeaderDocFilename,
        } as HeaderComponent['document'],
      }));
    }

    return;
  },
});
export const headerDocumentsSelector = selector<string>({
  key: 'headerDocumentsSelector',
  get: ({ get }) => {
    const headerComponent = get(headerAtom);
    return headerComponent?.document?.path || ' ';
  },
  set: ({ set }, newHeaderDocFile) => {
    if (!(newHeaderDocFile instanceof DefaultValue)) {
      set(headerAtom, (prev) => ({
        ...prev,

        document: {
          ...prev.document,
          path: newHeaderDocFile,
        } as HeaderComponent['document'],
      }));
    }
    return;
  },
});
