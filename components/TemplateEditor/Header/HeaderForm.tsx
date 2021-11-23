import React, { ChangeEventHandler, FC } from 'react';
import { useRecoilState } from 'recoil';
import RadioButtonItem from '../../RadioButtonItem';
import HeaderImageInput from './HeaderImageInput';
import HeaderTextInput from './HeaderTextInput';
import HeaderVideoInput from './HeaderVideoInput';
import tw, { styled, css, theme } from 'twin.macro';

const HeaderForm: FC<{
  headerType: string;
  messageId: number;
  onHeaderTypeChange: ChangeEventHandler<HTMLInputElement>;
  headerText: string;
  headerImagePath: string;
  headerVideoPath: string;
}> = ({ headerType, onHeaderTypeChange, messageId, headerText, headerImagePath, headerVideoPath }) => {
  return (
    <>
      <div tw='flex flex-row'>
        <RadioButtonItem isChecked={headerType === 'none'} value='none' id={'no-header' + messageId} label='None' onChange={onHeaderTypeChange} />
        <RadioButtonItem isChecked={headerType === 'text'} value='text' id={'text-edit' + messageId} label='Text' onChange={onHeaderTypeChange} />
        <RadioButtonItem isChecked={headerType === 'image'} value='image' id={'image-edit' + messageId} label='Image' onChange={onHeaderTypeChange} />
        <RadioButtonItem isChecked={headerType === 'video'} value='video' id={'video-edit' + messageId} label='Video' onChange={onHeaderTypeChange} />
        <RadioButtonItem isChecked={headerType === 'document'} value='document' id={'document-edit' + messageId} label='Document' onChange={onHeaderTypeChange} />
      </div>

      {headerType === 'text' ? <HeaderTextInput messageId={messageId} headerText={headerText} /> : null}
      {headerType === 'image' ? <HeaderImageInput messageId={messageId} headerImagePath={headerImagePath} /> : null}
      {headerType === 'video' ? <HeaderVideoInput messageId={messageId} headerVideoPath={headerVideoPath} /> : null}
    </>
  );
};

export default HeaderForm;
