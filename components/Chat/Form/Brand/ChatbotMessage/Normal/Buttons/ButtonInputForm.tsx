import React, { FC, useState } from 'react';
import { useRecoilState } from 'recoil';
import { interactiveButtonsTypeSelector } from '@/Recoil/interactiveButton';
import ListMessageButtonInput from './ListMessageButtonInput';
import ReplyButtonsInput from './ReplyButtonInput';
import RadioButtonItem from '@/components/Common/RadioButtonItem';
import tw, { styled, css, theme } from 'twin.macro';

const ButtonInputForm: FC = () => {
  const [buttonType, setButtonType] = useRecoilState(interactiveButtonsTypeSelector);
  const onButtonTypeChange = (e: any) => setButtonType(e.target.value);

  return (
    <div tw='flex flex-col'>
      <div tw='flex flex-row'>
        <RadioButtonItem label='None' value='none' onChange={onButtonTypeChange} isChecked={buttonType === 'none'} />
        <RadioButtonItem label='List Message' value='listMessage' onChange={onButtonTypeChange} isChecked={buttonType === 'listMessage'} />
        <RadioButtonItem label='Reply Button' value='reply' onChange={onButtonTypeChange} isChecked={buttonType === 'reply'} />
      </div>
      <div tw='flex flex-col mt-4'>
        {buttonType === 'listMessage' ? (
          <div tw='flex flex-col'>
            <ListMessageButtonInput order={0} />
            <ListMessageButtonInput order={1} />
            <ListMessageButtonInput order={2} />
            <ListMessageButtonInput order={3} />
            <ListMessageButtonInput order={4} />
            <ListMessageButtonInput order={5} />
            <ListMessageButtonInput order={6} />
            <ListMessageButtonInput order={7} />
            <ListMessageButtonInput order={8} />
            <ListMessageButtonInput order={9} />
          </div>
        ) : null}
        {buttonType === 'reply' ? <ReplyButtonsInput /> : null}
      </div>
    </div>
  );
};

export default ButtonInputForm;
