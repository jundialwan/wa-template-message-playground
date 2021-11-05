import React, { FC } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { bodyParamSelector, ParamKey } from '../Recoil/bodySampleParam'
import { renderedBodyTextSelector } from '../Recoil/bodyText'
import StyledInput from './StyledTextInput'

const BodyParamSampleForm: FC = () => {
  const bodyText = useRecoilValue(renderedBodyTextSelector)

  return (
    <div>
      <span className="text-black">Body Parameter</span>
      {
        bodyText.match(/\{\{[\d]\}\}/gm)?.map(param =>
          <BodyParamSampleInput key={param} paramKey={param as ParamKey} />
        )
      }
    </div>
  )
}

export default BodyParamSampleForm

const BodyParamSampleInput: FC<{ paramKey: ParamKey }> = ({ paramKey }) => {
  const [param, setParam] = useRecoilState(bodyParamSelector(paramKey))
  const onParamChange = (e: any) => setParam(e.target.value)

  return (
    <div>
      <span>{`Parameter ${paramKey}`}</span>
      <StyledInput id={`body-${paramKey}-param`} name={`body-${paramKey}-param`} value={param} onChange={onParamChange} />
    </div>
  )
}