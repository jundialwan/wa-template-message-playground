import { atom, DefaultValue, selector } from 'recoil';

export type chatbotType = 'normalMessage' | 'productMessage';
export type ChatbotComponent = {
  chatbotType: chatbotType;
};

export const chatbotTypeAtom = atom<ChatbotComponent>({
  key: 'chatbotType',
  default: {
    chatbotType: 'normalMessage',
  },
});

export const chatbotTypeSelector = selector<chatbotType>({
  key: 'chatbotTypeSelector',
  get: ({ get }) => {
    const ChatbotComponent = get(chatbotTypeAtom);
    return ChatbotComponent.chatbotType;
  },
  set: ({ set }, newButtonType) => {
    if (!(newButtonType instanceof DefaultValue)) {
      set(chatbotTypeAtom, (prev) => ({
        ...prev,
        chatbotType: newButtonType,
      }));
    }

    return;
  },
});
