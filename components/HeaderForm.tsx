import React, { FC } from 'react'
import { useRecoilState } from 'recoil'
import { headerTypeSelector } from '../Recoil/header'
import HeaderTextInput from './HeaderTextInput'
import RadioButtonItem from './RadioButtonItem'

const HeaderForm: FC = () => {
  const [headerType, setHeaderType] = useRecoilState(headerTypeSelector)
  const onHeaderTypeChange = (e: any) => setHeaderType(e.target.value)

  return (
    <>
      <div className="flex flex-row">
        <RadioButtonItem isChecked={headerType === 'none'} value="none" id="no-header" label="None" onChange={onHeaderTypeChange} />
        <RadioButtonItem isChecked={headerType === 'text'} value="text" id="text" label="Text" onChange={onHeaderTypeChange} />
        <RadioButtonItem isChecked={headerType === 'image'} value="image" id="image" label="Image" onChange={onHeaderTypeChange} />
        <RadioButtonItem isChecked={headerType === 'video'} value="video" id="video" label="Video" onChange={onHeaderTypeChange} />
        <RadioButtonItem isChecked={headerType === 'doc'} value="doc" id="doc" label="Document" onChange={onHeaderTypeChange} />
      </div>

      {headerType === 'text' ? <HeaderTextInput /> : null}
    </>
  )
}

export default HeaderForm