import { atom } from 'recoil';

const defaultValueListFlow = [
  {
    id: '1',
    flow: 'Checkout',
    bubbleChat: [
      {
        id: '1',
        sender: 'bot',
        message: {
          type: 'pushMessage',
          header: {
            type: 'text',
            text: 'Hello, how can I help you?',
          },
          body: {
            text: 'Hallo from body',
          },
          footer: {
            text: 'hello from footer',
          },
          button: {
            type: 'cta',
            cta: [
              {
                enabled: true,
                type: 'call-phone',
                text: 'call us',
                phone: '0813345292',
              },
            ],
          },
        },
      },
    ],
  },
  {
    id: '2',
    flow: 'Sapaan',
    bubbleChat: [
      {
        id: '1',
        sender: 'bot',
        message: {
          type: 'pushMessage',
          header: {
            type: 'text',
            text: 'Hello, how can I help you?',
          },
          body: {
            text: 'Hallo from body',
          },
          footer: {
            text: 'hello from footer',
          },
          button: {
            type: 'cta',
            cta: [
              {
                enabled: true,
                type: 'call-phone',
                text: 'call us',
                phone: '0813345292',
              },
            ],
          },
        },
      },
    ],
  },
];

export const listFlowAtom = atom<any>({
  key: 'listFlow',
  default: defaultValueListFlow,
});
