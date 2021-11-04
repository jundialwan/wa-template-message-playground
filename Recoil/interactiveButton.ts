import { atom, DefaultValue, selector, selectorFamily } from 'recoil';

type interactiveButton = 'none' | 'listMessage' | 'reply';
export type CTAButtonIndex = 0 | 1;
type CTAButtonComponent = {
  enabled: boolean;
  type: 'visit-website' | 'call-phone';
  text: string;
  phone?: string;
  url?: string; // limit 2000 char, param on the end for dynamic type
};

export type QuickReplyButtonIndex = 0 | 1 | 2;
type QuickReplyButtonComponent = {
  enabled: boolean;
  text: string; // max 20 char
};

type ButtonComponent = {
  type: interactiveButton;
  cta?: CTAButtonComponent[];
  reply?: QuickReplyButtonComponent[]; // list of button text
};

const defaultValueQuickReplyButtons: QuickReplyButtonComponent[] = [
  { enabled: true, text: 'MyButton' },
  { enabled: false, text: '' },
  { enabled: false, text: '' },
];
const defaultValueCTAButtons: CTAButtonComponent[] = [
  {
    enabled: true,
    type: 'visit-website',
    text: 'Visit our website',
    url: 'https://bahasa.ai',
  },
  {
    enabled: true,
    type: 'call-phone',
    text: 'Call us',
    phone: '62813425160798',
  },
];

export const buttonsAtom = atom<ButtonComponent>({
  key: 'buttons',
  default: {
    type: 'none',
    cta: defaultValueCTAButtons,
    reply: defaultValueQuickReplyButtons,
  },
});
