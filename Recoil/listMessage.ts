import { SenderType } from './senderText';
import { atom, atomFamily, DefaultValue, selector } from 'recoil';
import { HeaderType } from './header';

type ListMessage = {
  id: number;
  sender: SenderType;
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

export const messageIdAtom = atom<number>({
  key: 'messageId',
  default: 0,
});

export const listMessageAtom = atom<any>({
  key: 'listMessage',
  default: [],
});

// export const listMessageUserTypeSelector = selector<SenderType>({
//   key: 'buttonsTypeSelector',
//   get: ({ get }) => {
//     const listMessageComponent = get(listMessageAtom);
//     return listMessageComponent.sender;
//   },
//   set: ({ set }, newButtonType) => {
//     if (!(newButtonType instanceof DefaultValue)) {
//       set(listMessageAtom, (prev) => ({
//         ...prev,
//         type: newButtonType,
//       }));
//     }

//     return;
//   },
// });
