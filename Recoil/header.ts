import { atom, DefaultValue, selector } from 'recoil'

type HeaderType = 'none' | 'image' | 'video' | 'doc' | 'text'
type HeaderComponent = {
  type: HeaderType,
  image?: {
    path: string
  },
  video?: {
    path: string
  },
  doc?: {
    path: string,
    filename: string
  },
  text?: string
}

const headerAtom = atom<HeaderComponent>({
  key: 'header',
  default: {
    type: 'none'
  }
})

export const headerTypeSelector = selector<HeaderType>({
  key: 'headerTypeSelector',
  get: ({ get }) => {
    const headerComponent = get(headerAtom)
    return headerComponent.type
  },
  set: ({ set }, newButtonType) => {
    if (!(newButtonType instanceof DefaultValue)) {
      set(headerAtom, (prev) => ({
        ...prev,
        type: newButtonType
      }))
    }

    return
  }
})

export const headerTextSelector = selector<string>({
  key: 'headerTextSelector',
  get: ({ get }) => {
    const headerComponent = get(headerAtom)

    return headerComponent.text || ''
  },
  set: ({ set }, newHeaderText) => {
    if (!(newHeaderText instanceof DefaultValue)) {
      set(headerAtom, (prev) => ({
        ...prev,
        text: newHeaderText.substring(0, 60)
      }))
    }

    return
  }
})