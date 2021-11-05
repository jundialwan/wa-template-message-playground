import { atom, DefaultValue, selector, selectorFamily } from 'recoil';

type interactiveButtonType = 'none' | 'listMessage' | 'reply';
export type ListMessageButtonIndex = 0 | 1 | 2 | 3;
type listMessageButtonComponent = {
  enabled: boolean;
  text: string;
  value: boolean;
  subtitle?: string; // limit 2000 char, param on the end for dynamic type
};

export type QuickReplyButtonIndex = 0 | 1 | 2;
type ReplyButtonComponent = {
  enabled: boolean;
  text: string; // max 20 char
};

type ButtonComponent = {
  type: interactiveButtonType;
  listMessage?: listMessageButtonComponent[];
  reply?: ReplyButtonComponent[]; // list of button text
};

const defaultValueReplyButtons: ReplyButtonComponent[] = [
  { enabled: true, text: 'Lanjutkan' },
  { enabled: false, text: '' },
  { enabled: false, text: '' },
];
const defaultValueListMessageButton: listMessageButtonComponent[] = [
  {
    enabled: true,
    text: 'Ekonomi',
    value: false,
  },
  {
    enabled: true,
    text: 'Bisnis',
    value: false,
  },
  {
    enabled: true,
    text: 'Eksekutif',
    value: false,
  },
];

export const buttonsInteractiveAtom = atom<ButtonComponent>({
  key: 'buttons',
  default: {
    type: 'none',
    listMessage: defaultValueListMessageButton,
    reply: defaultValueReplyButtons,
  },
});

export const buttonsInteractiveTypeSelector = selector<interactiveButtonType>({
  key: 'buttonsInteractiveTypeSelector',
  get: ({ get }) => {
    const buttonsComponent = get(buttonsInteractiveAtom);
    return buttonsComponent.type;
  },
  set: ({ set }, newButtonType) => {
    if (!(newButtonType instanceof DefaultValue)) {
      set(buttonsInteractiveAtom, (prev) => ({
        ...prev,
        type: newButtonType,
      }));
    }
    return;
  },
});

// -------------------------------------------------- //

export const allListMessageButtonSelector = selector<
  listMessageButtonComponent[]
>({
  key: 'allListMessageButtonSelector',
  get: ({ get }) => {
    const buttonsComponent = get(buttonsInteractiveAtom);

    return buttonsComponent?.listMessage || defaultValueListMessageButton;
  },
});

export const ListMessageButtonSelector = selectorFamily<
  listMessageButtonComponent,
  ListMessageButtonIndex
>({
  key: 'ListMessageButtonSelector',
  get:
    (order) =>
    ({ get }) => {
      const buttonsComponent = get(buttonsInteractiveAtom);

      return (
        buttonsComponent.listMessage?.[order] ||
        defaultValueListMessageButton[3]
      );
    },
  set:
    (order) =>
    ({ set, get }, ListMessageButton) => {
      if (order < 0 || order > 4) return; // not valid button index range

      if (!(ListMessageButton instanceof DefaultValue)) {
        const buttonsComponent = get(buttonsInteractiveAtom);

        const selectedButton = buttonsComponent?.listMessage?.[order];

        if (selectedButton) {
          set(buttonsInteractiveAtom, (prev) => {
            let newListMessageButtonState = prev.listMessage
              ? [...prev.listMessage]
              : [...defaultValueListMessageButton];
            newListMessageButtonState[order] = {
              ...ListMessageButton,
              text: ListMessageButton.text.substring(0, 20),
            };

            return {
              ...prev,
              cta: [...newListMessageButtonState],
            };
          });
        } else {
          set(buttonsInteractiveAtom, (prev) => prev);
        }
      }

      return;
    },
});
