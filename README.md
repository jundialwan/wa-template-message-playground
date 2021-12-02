# wa-template-message-playground

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## To Do List

- Eslint and Prettier
- Supabase connect

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Data Structur Flow

```
[ // list of flows
  { // flow
    id: '', // unique ID of flow
    name: '', // flow name
​
    brand: {
      imageUrl: '', // image url from CDN, probably bisa pake https://imagekit.io/ or Cloudinary
      name: '' // brand name, i.e: Panorama JTB
    },
​
    bubbles: [ // list of bubbles
      { // bubble
        id: '', // unique ID of bubble
        flowId: '',
        order: 0, // bubble order 0 - N
        chatBy: 'brand', // brand, customer
        bubbleType: '', // push, single-product, multi-product, normal
​
        context: '', // bubble ID, only for customer - customer - text and customer - customer - image
​
        // payload of message, depends on the chatType and messageType
        header: {
          type: '', // text, image, video, doc, none
          url: '',
          text: ''
        },
        body: {
          text: ''
        },
        footer: {
          text: ''
        },
        buttons: {
          type: '', // quick-reply, cta, list-message, reply-buttons
          // normal message
          listMessage: {
            buttonText: '',
            menu: [ // max 10
              {
                title: '',
                description: ''
              }
            ]
          },
          replyButtons: [
            '',
            '',
            ''
          ],
          // push message
          quickReply: [
            '',
            '',
            ''
          ],
          cta: {
            visitWebsite: {
              buttonText: '',
              order: 0
            },

            callPhoneNumber: {
              buttonText: '',
              order: 1
            }
          }
        },
        // single/multi product message
        actions: {
          buttonText: ''
        }
      }
    ]
  }
]
​
// posibility of combination chatBy, messageType, bubbleType
// this combination will determine the WA preview
​
// brand - push - push ✅
​
// brand - bot - text ✅
// brand - bot - image ✅
// brand - bot - video ✅
// brand - bot - document ✅
// brand - bot - list-message ✅
// brand - bot - reply-buttons ✅
// brand - bot - single-product
// brand - bot - multi-product
​
// customer - customer - text ✅
// customer - customer - image ✅
```
