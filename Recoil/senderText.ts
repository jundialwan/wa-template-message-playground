import { atom, DefaultValue, selector } from 'recoil';

export type SenderType = 'bot' | 'user' | 'none' | 'brand';
export type SenderComponent = {
  sender: SenderType;
};

const senderAtom = atom<SenderComponent>({
  key: 'sender',
  default: {
    sender: 'bot',
  },
});

export const senderTypeSelector = selector<SenderType>({
  key: 'senderTypeSelector',
  get: ({ get }) => {
    const senderComponent = get(senderAtom);
    return senderComponent.sender;
  },
  set: ({ set }, newButtonType) => {
    if (!(newButtonType instanceof DefaultValue)) {
      set(senderAtom, (prev) => ({
        ...prev,
        sender: newButtonType,
      }));
    }

    return;
  },
});
