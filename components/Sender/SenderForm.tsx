import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import { senderTypeSelector } from '../../Recoil/senderText';
import RadioButtonItem from '../Common/RadioButtonItem';
import tw, { styled, css, theme } from 'twin.macro';

const SenderForm: FC = () => {
  const [senderType, setSenderType] = useRecoilState(senderTypeSelector);
  const onSenderTypeChange = (e: any) => setSenderType(e.target.value);
  return (
    <>
      <div tw='flex flex-row'>
        <RadioButtonItem isChecked={senderType === 'bot'} value='bot' id='bot-sender' label='Bot' onChange={onSenderTypeChange} />
        <RadioButtonItem isChecked={senderType === 'user'} value='user' id='user-sender' label='User' onChange={onSenderTypeChange} />
        {/* <RadioButtonItem isChecked={senderType === 'none'} value='none' id='hidden-sender' label='Hidden Message' onChange={onSenderTypeChange} /> */}
      </div>
    </>
  );
};

export default SenderForm;
