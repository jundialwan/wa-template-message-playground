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
        id: '1', // unique ID of bubble
        flowId: '',
        order: 0, // bubble order 0 - N
        chatBy: 'brand', // brand, customer
        bubbleType: '', // push, single-product, multi-product, normal
        context: '', // bubble ID, only for customer - customer - text and customer - customer - image
        // payload of message, depends on the chatType and messageType
        header: {
          type: '', // text, image, video, doc, none
          url: '',
          text: '',
        },
        body: {
          text: '',
        },
        footer: {
          text: '',
        },
        buttons: {
          type: '', // quick-reply, cta, list-message, reply-buttons
          // normal message
          listMessage: {
            buttonText: '',
            menu: [
              // max 10
              {
                title: '',
                description: '',
              },
            ],
          },
          replyButtons: ['', '', ''],
          // push message
          quickReply: ['', '', ''],
          cta: {
            visitWebsite: {
              buttonText: '',
              order: 0,
            },

            callPhoneNumber: {
              buttonText: '',
              order: 1,
            },
          },
        },
        // single/multi product message
        actions: {
          buttonText: '',
        },
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
