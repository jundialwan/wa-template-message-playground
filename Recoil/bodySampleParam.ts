import { atom, atomFamily, DefaultValue, selector, selectorFamily } from 'recoil'

export type ParamKey = `{{${number}}}`
type BodySampleParamType = {
  [paramKey: ParamKey]: string
}
const bodySampleParamDefaultValue: BodySampleParamType = {}

const bodySampleParamAtom = atomFamily<BodySampleParamType, keyof BodySampleParamType>({
  key: 'bodySampleParamAtom',
  default: bodySampleParamDefaultValue
})

export const bodyParamSelector = selectorFamily<string, ParamKey>({
  key: `bodyParamSelector`,
  get: paramKey => ({ get }) => {
    const bodySampleParam = get(bodySampleParamAtom(paramKey))
    return bodySampleParam[paramKey]
  },
  set: paramKey => ({ set }, newParamValue) => {
    if (!(/\{\{[\d]\}\}/.test(paramKey))) return // not valid format of paramKey

    if (!(newParamValue instanceof DefaultValue)) {
      set(bodySampleParamAtom(paramKey), prev => ({
        ...prev,
        [paramKey]: newParamValue
      }))
    }

    return 
  }
})