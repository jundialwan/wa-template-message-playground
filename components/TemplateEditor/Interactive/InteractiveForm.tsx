import React, { ChangeEventHandler, FC, useState } from 'react';
import { useRecoilState } from 'recoil';
import { interactiveButtonsTypeSelector } from '../../../Recoil/interactiveButton';
import { listMessageAtom } from '../../../Recoil/listMessage';
import ListMessageButtonInput from './Input/ListMessageButtonInput';
import ReplyButtonsInput from './Input/ReplyButtonsInput';
import TitleListMessage from './Input/TitleListMessage';
import RadioButtonItem from '../../Common/RadioButtonItem';
import tw, { styled, css, theme } from 'twin.macro';

const InteractiveForm: FC<{ buttonType: string; onButtonTypeChange: ChangeEventHandler<HTMLInputElement>; messageId: number; titleInteractive: string; interactiveMessage: any }> = ({ buttonType, onButtonTypeChange, messageId, titleInteractive, interactiveMessage }) => {
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
            <TitleListMessage messageId={messageId} titleInteractive={titleInteractive} />
            <ListMessageButtonInput order={0} messageId={messageId} message={interactiveMessage} />
            <ListMessageButtonInput order={1} messageId={messageId} message={interactiveMessage} />
            <ListMessageButtonInput order={2} messageId={messageId} message={interactiveMessage} />
            <ListMessageButtonInput order={3} messageId={messageId} message={interactiveMessage} />
            <ListMessageButtonInput order={4} messageId={messageId} message={interactiveMessage} />
          </div>
        ) : null}
        {buttonType === 'reply' ? <ReplyButtonsInput messageId={messageId} message={interactiveMessage} /> : null}
      </div>
    </div>
  );
};

export default InteractiveForm;
