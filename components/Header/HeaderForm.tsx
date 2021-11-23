import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import { headerTypeSelector } from '../../Recoil/header';
import RadioButtonItem from '../RadioButtonItem';
import HeaderImageInput from './HeaderImageInput';
import HeaderTextInput from './HeaderTextInput';
import HeaderVideoInput from './HeaderVideoInput';
import tw, { styled, css, theme } from 'twin.macro';

const HeaderForm: FC = () => {
  const [headerType, setHeaderType] = useRecoilState(headerTypeSelector);
  const onHeaderTypeChange = (e: any) => setHeaderType(e.target.value);

  return (
    <>
      <div tw='flex flex-row'>
        <RadioButtonItem isChecked={headerType === 'none'} value='none' id='no-header' label='None' onChange={onHeaderTypeChange} />
        <RadioButtonItem isChecked={headerType === 'text'} value='text' id='text' label='Text' onChange={onHeaderTypeChange} />
        <RadioButtonItem isChecked={headerType === 'image'} value='image' id='image' label='Image' onChange={onHeaderTypeChange} />
        <RadioButtonItem isChecked={headerType === 'video'} value='video' id='video' label='Video' onChange={onHeaderTypeChange} />
        <RadioButtonItem isChecked={headerType === 'document'} value='document' id='document' label='Document' onChange={onHeaderTypeChange} />
      </div>

      {headerType === 'text' ? <HeaderTextInput /> : null}
      {headerType === 'image' ? <HeaderImageInput /> : null}
      {headerType === 'video' ? <HeaderVideoInput /> : null}
    </>
  );
};

export default HeaderForm;
