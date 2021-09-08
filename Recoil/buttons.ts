import { atom, DefaultValue, selector, selectorFamily } from 'recoil'

type ButtonType = 'none' | 'cta' | 'reply'
type CTAButtonComponent = {
  type: 'visit-website' | 'call-phone',
  text: string,
  phone?: string,
  url?: string // limit 2000 char, param on the end for dynamic type
}

export type QuickReplyButtonIndex = 0 | 1 | 2
type QuickReplyButtonComponent = {
  enabled: boolean,
  text: string // max 20 char
}

type ButtonComponent = {
  type: ButtonType,
  cta?: CTAButtonComponent[],
  reply?: QuickReplyButtonComponent[] // list of button text
}

const defaultValueQuickReplyButtons: QuickReplyButtonComponent[] = [{ enabled: true, text: 'MyButton' }, { enabled: false, text: '' }, { enabled: false, text: '' }]

export const buttonsAtom = atom<ButtonComponent>({
  key: 'buttons',
  default: {
    type: 'none',
    cta: [
      {
        type: 'visit-website',
        text: '',
        phone: '',
      }
    ],
    reply: defaultValueQuickReplyButtons
  }
})

export const buttonsTypeSelector = selector<ButtonType>({
  key: 'buttonsTypeSelector',
  get: ({ get }) => {
    const buttonsComponent = get(buttonsAtom)
    return buttonsComponent.type
  },
  set: ({ set }, newButtonType) => {
    if (!(newButtonType instanceof DefaultValue)) {
      set(buttonsAtom, (prev) => ({
        ...prev,
        type: newButtonType
      }))
    }

    return
  }
})

export const allQuickReplyButtonSelector = selector<QuickReplyButtonComponent[]>({
  key: 'allQuickReplyButtonSelector',
  get: ({ get }) => {
    const buttonsComponent = get(buttonsAtom)

    return buttonsComponent?.reply || defaultValueQuickReplyButtons
  }
})

export const enabledQuickReplyButtonSelector = selector<QuickReplyButtonComponent[]>({
  key: 'enabledQuickReplyButtonSelector',
  get: ({ get }) => {
    const buttonsComponent = get(buttonsAtom)

    return buttonsComponent?.reply?.filter(btn => btn.enabled) || defaultValueQuickReplyButtons.filter(btn => btn.enabled)
  }
})

export const quickReplyButtonSelector = selectorFamily<QuickReplyButtonComponent, QuickReplyButtonIndex>({
  key: 'quickReplyButtonSelector',
  get: (order) => ({ get }) => {
    const buttonsComponent = get(buttonsAtom)

    return buttonsComponent.reply?.[order] || defaultValueQuickReplyButtons[2]
  },
  set: (order) => ({ set, get }, quickReplyButton) => {
    if(order < 0 || order > 2) return // not valid button index range

    if (!(quickReplyButton instanceof DefaultValue)) {
      const buttonsComponent = get(buttonsAtom)
  
      const selectedButton = buttonsComponent?.reply?.[order]

      if (selectedButton) {
        set(buttonsAtom, (prev) => {
          let newReplyButtonState = prev.reply ? [...(prev.reply)] : [...defaultValueQuickReplyButtons]
          newReplyButtonState[order] = quickReplyButton

          return {
            ...prev,
            reply: [...newReplyButtonState]
          }
        })
      } else {
        set(buttonsAtom, prev => prev)  
      }
    }

    return
  }
})