import { atom, selector, DefaultValue } from 'recoil';

export type MessageType = 'pushMessage' | 'chatbotMessage';
export type MessageTypeComponent = {
  messageType: MessageType;
};
export const messageTypeAtom = atom<MessageTypeComponent>({
  key: 'messageType',
  default: {
    messageType: 'chatbotMessage',
  },
});

export const messageTypeSelector = selector<MessageType>({
  key: 'messageTypeSelector',
  get: ({ get }) => {
    const messageTypeComponent = get(messageTypeAtom);
    return messageTypeComponent.messageType;
  },
  set: ({ set }, newButtonType) => {
    if (!(newButtonType instanceof DefaultValue)) {
      set(messageTypeAtom, (prev) => ({
        ...prev,
        messageType: newButtonType,
      }));
    }

    return;
  },
});
