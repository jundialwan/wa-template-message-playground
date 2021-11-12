import { atom, DefaultValue, selector, selectorFamily } from 'recoil';

type InteractiveButtonType = 'none' | 'listMessage' | 'reply';

export type listMessageButtonIndex = 0 | 1 | 2 | 3 | 4;
type listMessageButtonComponent = {
  enabled: boolean;
  title: string; //limit 30 string
  subtitle?: string;
};

export type ReplyButtonIndex = 0 | 1 | 2;
type ReplyButtonComponent = {
  enabled: boolean;
  text: string; // max 20 char
};

type InteractiveButtonComponent = {
  type: InteractiveButtonType;
  listMessage?: listMessageButtonComponent[];
  reply?: ReplyButtonComponent[]; // list of button text
};

const defaultValueReplyButtons: ReplyButtonComponent[] = [
  { enabled: true, text: 'MyButton' },
  { enabled: false, text: '' },
  { enabled: false, text: '' },
];
const defaultValueInteractiveButtons: listMessageButtonComponent[] = [
  { enabled: true, title: 'Visit our website', subtitle: 'https://bahasa.ai' },
  { enabled: true, title: 'Call us', subtitle: '62813425160798' },
];

export const interactiveButtonsAtom = atom<InteractiveButtonComponent>({
  key: 'interactiveButton',
  default: {
    type: 'none',
    listMessage: defaultValueInteractiveButtons,
    reply: defaultValueReplyButtons,
  },
});

export const titleInteractiveButtonsAtom = atom<string>({
  key: 'titleInteractiveButton',
  default: 'Mengudara',
});

export const interactiveButtonsTypeSelector = selector<InteractiveButtonType>({
  key: 'interactiveButtonsTypeSelector',
  get: ({ get }) => {
    const interactiveButtonsComponent = get(interactiveButtonsAtom);
    return interactiveButtonsComponent.type;
  },
  set: ({ set }, newButtonType) => {
    if (!(newButtonType instanceof DefaultValue)) {
      set(interactiveButtonsAtom, (prev) => ({
        ...prev,
        type: newButtonType,
      }));
    }
    return;
  },
});

export const titleInteractiveButtonsTypeSelector = selector<string>({
  key: 'titleInteractiveButtonsTypeSelector',
  get: ({ get }) => {
    const titleInteractiveButtons = get(titleInteractiveButtonsAtom);
    return titleInteractiveButtons;
  },
  set: ({ set }, newValue) => {
    if (!(newValue instanceof DefaultValue)) {
      set(titleInteractiveButtonsAtom, newValue.substring(0, 40));
    }

    return;
  },
});

// ----------------------//
export const allInteractiveButtonSelector = selector<listMessageButtonComponent[]>({
  key: 'allInteractiveButtonSelector',
  get: ({ get }) => {
    const interactiveButtonsComponent = get(interactiveButtonsAtom);

    return interactiveButtonsComponent?.listMessage || defaultValueInteractiveButtons;
  },
});

export const interactiveButtonSelector = selectorFamily<listMessageButtonComponent, listMessageButtonIndex>({
  key: 'interactiveButtonSelector',
  get:
    (order) =>
    ({ get }) => {
      const interactiveButtonsComponent = get(interactiveButtonsAtom);

      return interactiveButtonsComponent.listMessage?.[order] || defaultValueInteractiveButtons[2];
    },
  set:
    (order) =>
    ({ set, get }, interactiveButton) => {
      if (order < 0 || order > 2) return; // not valid button index range

      if (!(interactiveButton instanceof DefaultValue)) {
        const interactiveButtonsComponent = get(interactiveButtonsAtom);

        const selectedButton = interactiveButtonsComponent?.listMessage?.[order];

        if (selectedButton) {
          set(interactiveButtonsAtom, (prev) => {
            let newInteractiveButtonState = prev.listMessage ? [...prev.listMessage] : [...defaultValueInteractiveButtons];
            newInteractiveButtonState[order] = { ...interactiveButton, title: interactiveButton.title.substring(0, 20) };

            return {
              ...prev,
              listMessage: [...newInteractiveButtonState],
            };
          });
        } else {
          set(interactiveButtonsAtom, (prev) => prev);
        }
      }

      return;
    },
});
