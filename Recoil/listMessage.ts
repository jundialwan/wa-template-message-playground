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

// export const listMessageSelector = selector<ListMessage>({
//   key: 'listMessageSelector',
//   get: ({ get }) => {
//     const ListMessage = get(listMessageAtom);
//     return ListMessage;
//   },
//   set: ({ set }, newButtonType) => {
//     if (!(newButtonType instanceof DefaultValue)) {
//       set(listMessageAtom, (prev) => ({
//         ...prev,
//         id: newButtonType.id + 1,
//         sender: newButtonType.sender,
//         type: newButtonType.type,
//       }));
//     }

//     return;
//   },
// });
