import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import { senderTypeSelector } from '@/Recoil/senderText';
import RadioButtonItem from '@/components/Common/RadioButtonItem';
import tw, { styled, css, theme } from 'twin.macro';

const SenderTypeInput: FC = () => {
  const [senderType, setSenderType] = useRecoilState(senderTypeSelector);
  const onSenderTypeChange = (e: any) => setSenderType(e.target.value);
  return (
    <>
      <div tw='flex flex-row'>
        <RadioButtonItem isChecked={senderType === 'brand'} value='brand' id='brand-sender' label='Brand' onChange={onSenderTypeChange} />
        <RadioButtonItem isChecked={senderType === 'user'} value='user' id='user-sender' label='User' onChange={onSenderTypeChange} />
        {/* <RadioButtonItem isChecked={senderType === 'none'} value='none' id='hidden-sender' label='Hidden Message' onChange={onSenderTypeChange} /> */}
      </div>
    </>
  );
};

export default SenderTypeInput;
