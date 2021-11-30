import { atom } from 'recoil';

const defaultValueListFlow = [
  {
    id: '1',
    name: 'Checkout',
    brand: {
      imageUrl: '', // image url from CDN, probably bisa pake https://imagekit.io/ or Cloudinary
      name: '', // brand name, i.e: Panorama JTB
    },
    bubbles: [
      // list of bubbles
      {
        // bubble
        id: '', // unique ID of bubble
        order: 0, // bubble order 0 - N
        chatBy: 'brand', // brand, customer
        messageType: '', // push, bot, customer
        bubbleType: '', // push, single-product, multi-product, text, image, video, list-messages, reply-buttons
        context: '', // bubble ID, only for customer - customer - text and customer - customer - image
        // payload of message, depends on the chatType and messageType
      },
    ],
  },
  {
    id: '2',
    name: 'Sapaan',
    brand: {
      imageUrl: '', // image url from CDN, probably bisa pake https://imagekit.io/ or Cloudinary
      name: '', // brand name, i.e: Panorama JTB
    },
    bubbles: [
      // list of bubbles
      {
        // bubble
        id: '', // unique ID of bubble
        order: 0, // bubble order 0 - N
        chatBy: 'brand', // brand, customer
        messageType: '', // push, bot, customer
        bubbleType: '', // push, single-product, multi-product, text, image, video, list-messages, reply-buttons
        context: '', // bubble ID, only for customer - customer - text and customer - customer - image
        // payload of message, depends on the chatType and messageType
      },
    ],
  },
];

export const listFlowAtom = atom<any>({
  key: 'listFlow',
  default: defaultValueListFlow,
});
