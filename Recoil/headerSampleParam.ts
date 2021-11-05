import { atom, atomFamily, DefaultValue, selector, selectorFamily } from 'recoil'
import { HeaderType } from './header'

type HeaderSampleParamType = {
  text: string, // param string {{1}}
  image: string, // url string
  video: string, // url string
  doc: {
    url: string,
    filename?: string
  }
}
const headerSampleParamDefaultValue: HeaderSampleParamType = {
  text: '',
  image: '',
  video: '',
  doc: {
    url: '',
    filename: ''
  }
}

const headerSampleParamAtom = atomFamily<HeaderSampleParamType, keyof HeaderSampleParamType>({
  key: 'headerSampleParamAtom',
  default: headerSampleParamDefaultValue
})

const headerSampleParamSelectorFactory = <H extends keyof HeaderSampleParamType>(headerType: H) => (
  selector<HeaderSampleParamType[H]>({
    key: `${headerType}HeaderSampleParam`,
    get: ({ get }) => {
      const headerSampleParam = get(headerSampleParamAtom(headerType))
      return headerSampleParam[headerType]
    },
    set: ({ set }, newHeaderValue) => {
      if (!(newHeaderValue instanceof DefaultValue)) {
        set(headerSampleParamAtom(headerType), prev => ({
          ...prev,
          [headerType]: newHeaderValue
        }))
      }
  
      return 
    }
  })
)

export const textHeaderSampleParamSelector  = headerSampleParamSelectorFactory<'text'>('text')
export const imageHeaderSampleParamSelector = headerSampleParamSelectorFactory<'image'>('image')
export const videoHeaderSampleParamSelector = headerSampleParamSelectorFactory<'video'>('video')
export const docHeaderSampleParamSelector   = headerSampleParamSelectorFactory<'doc'>('doc')