import React, { ChangeEventHandler, FC } from 'react';
import { useRecoilState } from 'recoil';
import RadioButtonItem from '../../RadioButtonItem';
import HeaderImageInput from './HeaderImageInput';
import HeaderTextInput from './HeaderTextInput';
import HeaderVideoInput from './HeaderVideoInput';

const HeaderForm: FC<{
  headerType: string;
  messageId: number;
  onHeaderTypeChange: ChangeEventHandler<HTMLInputElement>;
  headerText: string;
}> = ({ headerType, onHeaderTypeChange, messageId, headerText }) => {
  return (
    <>
      <div className='flex flex-row'>
        <RadioButtonItem isChecked={headerType === 'none'} value='none' id={'no-header' + messageId} label='None' onChange={onHeaderTypeChange} />
        <RadioButtonItem isChecked={headerType === 'text'} value='text' id={'text-edit' + messageId} label='Text' onChange={onHeaderTypeChange} />
        <RadioButtonItem isChecked={headerType === 'image'} value='image' id={'image-edit' + messageId} label='Image' onChange={onHeaderTypeChange} />
        <RadioButtonItem isChecked={headerType === 'video'} value='video' id={'video-edit' + messageId} label='Video' onChange={onHeaderTypeChange} />
        <RadioButtonItem isChecked={headerType === 'document'} value='document' id={'document-edit' + messageId} label='Document' onChange={onHeaderTypeChange} />
      </div>

      {headerType === 'text' ? <HeaderTextInput messageId={messageId} headerText={headerText} /> : null}
      {/* {headerType === 'image' ? <HeaderImageInput /> : null}
      {headerType === 'video' ? <HeaderVideoInput /> : null} */}
    </>
  );
};

export default HeaderForm;
