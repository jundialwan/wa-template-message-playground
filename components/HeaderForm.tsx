import React, { FC } from 'react'
import { useRecoilState } from 'recoil'
import { headerTypeSelector } from '../Recoil/header'
import HeaderTextInput from './HeaderTextInput'
import { SectionHeading, SectionSubtitle } from './LogiclessComponents'
import RadioButtonItem from './RadioButtonItem'

const HeaderForm: FC = () => {
  const [headerType, setHeaderType] = useRecoilState(headerTypeSelector)
  const onHeaderTypeChange = (e: any) => setHeaderType(e.target.value)

  return (
    <>
      <div className="flex flex-row">
        <RadioButtonItem isChecked={headerType === 'none'} value="none" id="no-header" label="None" onClick={onHeaderTypeChange} />
        <RadioButtonItem isChecked={headerType === 'text'} value="text" id="text" label="Text" onClick={onHeaderTypeChange} />
        <RadioButtonItem isChecked={headerType === 'image'} value="image" id="image" label="Image" onClick={onHeaderTypeChange} />
        <RadioButtonItem isChecked={headerType === 'video'} value="video" id="video" label="Video" onClick={onHeaderTypeChange} />
        <RadioButtonItem isChecked={headerType === 'doc'} value="doc" id="doc" label="Document" onClick={onHeaderTypeChange} />
      </div>

      {headerType === 'text' ? <HeaderTextInput /> : null}
    </>
  )
}

export default HeaderForm