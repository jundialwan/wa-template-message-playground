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
}> = ({ headerType, onHeaderTypeChange, messageId }) => {
  return (
    <>
      <div className='flex flex-row'>
        <RadioButtonItem
          isChecked={headerType === 'none'}
          value='none'
          id='no-header'
          label='None'
          onChange={onHeaderTypeChange}
        />
        <RadioButtonItem
          isChecked={headerType === 'text'}
          value='text'
          id='text'
          label='Text'
          onChange={onHeaderTypeChange}
        />
        <RadioButtonItem
          isChecked={headerType === 'image'}
          value='image'
          id='image'
          label='Image'
          onChange={onHeaderTypeChange}
        />
        <RadioButtonItem
          isChecked={headerType === 'video'}
          value='video'
          id='video'
          label='Video'
          onChange={onHeaderTypeChange}
        />
        <RadioButtonItem
          isChecked={headerType === 'document'}
          value='document'
          id='document'
          label='Document'
          onChange={onHeaderTypeChange}
        />
      </div>

      {/* {headerType === 'text' ? <HeaderTextInput messageId={messageId} /> : null}
      {headerType === 'image' ? <HeaderImageInput /> : null}
      {headerType === 'video' ? <HeaderVideoInput /> : null} */}
    </>
  );
};

export default HeaderForm;
