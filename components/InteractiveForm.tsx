import React, { FC, useState } from 'react';
import RadioButtonItem from './RadioButtonItem';

const InteractiveForm: FC = () => {
  const [interactiveMessage, setInteractiveMessage] = useState('none');
  const onRadioButtonChange = (e: any) => {
    setInteractiveMessage(e.target.value);
  };
  return (
    <div className='flex flex-col'>
      <div className='flex flex-row'>
        <RadioButtonItem label='None' value='none' onChange={onRadioButtonChange} isChecked={interactiveMessage === 'none'} />
        <RadioButtonItem label='List Message' value='listMessage' onChange={onRadioButtonChange} isChecked={interactiveMessage === 'listMessage'} />
        <RadioButtonItem label='Reply Button' value='replyButton' onChange={onRadioButtonChange} isChecked={interactiveMessage === 'replyButton'} />
      </div>
      <div className='flex flex-col mt-4'>
        {interactiveMessage === 'listMessage' ? <ListMessage /> : null}
        {interactiveMessage === 'replyButton' ? <ReplyButton /> : null}
      </div>
    </div>
  );
};

const ListMessage: FC = () => {
  return <div>List Message</div>;
};
const ReplyButton: FC = () => {
  return <div>Reply Button</div>;
};

export default InteractiveForm;
