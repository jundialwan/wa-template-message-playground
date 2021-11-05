import { atom, DefaultValue, selector } from 'recoil'

export const buttonCTASampleParamAtom = atom<string>({
  key: 'buttonCTASampleParamAtom',
  default: '',
})