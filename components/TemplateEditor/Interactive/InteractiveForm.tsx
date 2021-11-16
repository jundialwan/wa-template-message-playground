import React, { ChangeEventHandler, FC, useState } from 'react';
import { useRecoilState } from 'recoil';
import { interactiveButtonsTypeSelector } from '../../../Recoil/interactiveButton';
import { listMessageAtom } from '../../../Recoil/listMessage';
import ListMessageButtonInput from './Input/ListMessageButtonInput';
import ReplyButtonsInput from '../../InteractiveForm/ReplyButtonInput';
import TitleListMessage from './Input/TitleListMessage';
import RadioButtonItem from '../../RadioButtonItem';

const InteractiveForm: FC<{ buttonType: string; onButtonTypeChange: ChangeEventHandler<HTMLInputElement>; messageId: number; titleInteractive: string }> = ({ buttonType, onButtonTypeChange, messageId, titleInteractive }) => {
  const [listMessage, setListMessage] = useRecoilState(listMessageAtom);
  // const [buttonType, setButtonType] = useRecoilState(interactiveButtonsTypeSelector);
  // const onButtonTypeChange = (e: any) => setButtonType(e.target.value);

  return (
    <div className='flex flex-col'>
      <div className='flex flex-row'>
        <RadioButtonItem label='None' value='none' onChange={onButtonTypeChange} isChecked={buttonType === 'none'} />
        <RadioButtonItem label='List Message' value='listMessage' onChange={onButtonTypeChange} isChecked={buttonType === 'listMessage'} />
        <RadioButtonItem label='Reply Button' value='reply' onChange={onButtonTypeChange} isChecked={buttonType === 'reply'} />
      </div>
      <div className='flex flex-col mt-4'>
        {buttonType === 'listMessage' ? (
          <div className='flex flex-col'>
            <TitleListMessage messageId={messageId} titleInteractive={titleInteractive} />
            <ListMessageButtonInput order={0} messageId={messageId} />
            <ListMessageButtonInput order={1} />
            <ListMessageButtonInput order={2} />
            <ListMessageButtonInput order={3} />
            <ListMessageButtonInput order={4} />
          </div>
        ) : null}
        {buttonType === 'reply' ? <ReplyButtonsInput /> : null}
      </div>
    </div>
  );
};

export default InteractiveForm;
