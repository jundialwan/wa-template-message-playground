import { atom, DefaultValue, selector } from 'recoil'

type ButtonType = 'none' | 'cta' | 'reply'
type CTAButtonComponent = {
  type: 'visit-website' | 'call-phone',
  text: string,
  phone?: string,
  url?: string // limit 2000 char, param on the end for dynamic type
}

type ButtonComponent = {
  type: ButtonType,
  cta?: CTAButtonComponent[],
  reply?: string[] // list of button text
}

export const buttonsAtom = atom<ButtonComponent>({
  key: 'buttons',
  default: {
    type: 'none'
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