import React, { ChangeEventHandler, FC, useState } from 'react';
import RadioButtonItem from '../../RadioButtonItem';

type SenderFormProps = {
  senderType: string;
  onSenderTypeChange: ChangeEventHandler<HTMLInputElement>;
};

const SenderForm: FC<SenderFormProps> = ({
  senderType,
  onSenderTypeChange,
}) => {
  console.log('senderType', senderType);
  return (
    <>
      <div className='flex flex-row'>
        <RadioButtonItem
          isChecked={senderType === 'bot'}
          value='bot'
          id='bot-sender-edit'
          label='Bot'
          onChange={onSenderTypeChange}
        />
        <RadioButtonItem
          isChecked={senderType === 'user'}
          value='user'
          id='user-sender-edit'
          label='User'
          onChange={onSenderTypeChange}
        />
      </div>
    </>
  );
};

export default SenderForm;
