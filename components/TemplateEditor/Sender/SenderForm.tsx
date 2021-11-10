import React, { ChangeEventHandler, FC, useState } from 'react';
import RadioButtonItem from '../../RadioButtonItem';

type SenderFormProps = {
  senderType: string;
  onSenderTypeChange: ChangeEventHandler<HTMLInputElement>;
  messageId: number;
};

const SenderForm: FC<SenderFormProps> = ({ senderType, onSenderTypeChange, messageId }) => {
  console.log('senderType', senderType);
  return (
    <>
      <div className='flex flex-row'>
        <RadioButtonItem isChecked={senderType === 'bot'} value='bot' id={'bot-sender-edit' + messageId} label='Bot' onChange={onSenderTypeChange} />
        <RadioButtonItem isChecked={senderType === 'user'} value='user' id={'user-sender-edit' + messageId} label='User' onChange={onSenderTypeChange} />
      </div>
    </>
  );
};

export default SenderForm;
