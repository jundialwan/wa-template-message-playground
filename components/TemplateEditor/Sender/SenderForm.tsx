import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import { senderTypeSelector } from '../../../Recoil/senderText';
import RadioButtonItem from '../../RadioButtonItem';

const SenderForm: FC = () => {
  const [senderType, setSenderType] = useRecoilState(senderTypeSelector);
  const onSenderTypeChange = (e: any) => setSenderType(e.target.value);
  return (
    <>
      <div className='flex flex-row'>
        <RadioButtonItem
          isChecked={senderType === 'bot'}
          value='bot'
          id='bot-sender'
          label='Bot'
          onChange={onSenderTypeChange}
        />
        <RadioButtonItem
          isChecked={senderType === 'user'}
          value='user'
          id='user-sender'
          label='User'
          onChange={onSenderTypeChange}
        />
        <RadioButtonItem
          isChecked={senderType === 'none'}
          value='none'
          id='hidden-sender'
          label='Hidden Message'
          onChange={onSenderTypeChange}
        />
      </div>
    </>
  );
};

export default SenderForm;
