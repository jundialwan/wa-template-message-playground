import React, { ChangeEventHandler, FC, useState } from 'react';
import { Switch } from '@headlessui/react';
import { ReplyButtonSelector } from '../../../../Recoil/interactiveButton';
import { useRecoilState } from 'recoil';
import { listMessageAtom } from '../../../../Recoil/listMessage';

type ReplyButtonIndex = 0 | 1 | 2;

const ReplyButtonsInput: FC<{ messageId: number; message: any }> = ({ messageId, message }) => {
  return (
    <div tw='flex flex-col p-2 mt-2 gap-1'>
      <QuickReplyButtonInput order={0} messageId={messageId} message={message.reply} />
      <QuickReplyButtonInput order={1} messageId={messageId} message={message.reply} />
      <QuickReplyButtonInput order={2} messageId={messageId} message={message.reply} />
    </div>
  );
};

const QuickReplyButtonInput: FC<{ order: ReplyButtonIndex; messageId: number; message: any }> = ({ order, messageId, message }) => {
  const [listMessage, setListMessage] = useRecoilState(listMessageAtom);
  const [buttonSwitch, setButtonSwitch] = useState(message[order]?.enabled);
  const [buttonText, setButtonText] = useState(message[order]?.text);
  console.log(' QuickReplyButtonInput ', message[order]);
  console.log(' QuickReplyButtonInput messageId', messageId);
  const handleToggleChange = (event: any, messageId: any) => {
    setButtonSwitch(event);
    let newlistMessage = listMessage.map((data: any) => {
      return {
        ...data,
        interactive: {
          ...data.interactive,
          reply: {
            ...data.interactive.reply,
            [order]: {
              ...data.interactive.reply[order],
              enabled: data.id === messageId ? event : data.interactive.reply[order].enabled,
            },
          },
        },
      };
    });
    setListMessage(newlistMessage);
  };
  const handleTextChange = (event: any, listId: any) => {
    setButtonText(event?.target?.value.substring(0, 20));
    let newlistMessage = listMessage.map((data: any) => {
      return {
        ...data,
        interactive: {
          ...data.interactive,
          reply: {
            ...data.interactive.reply,
            [order]: {
              ...data.interactive.reply[order],
              text: data.id === listId ? event.target.value : data.interactive.reply[order].text,
            },
          },
        },
      };
    });
    setListMessage(newlistMessage);
  };

  return (
    <div tw='flex flex-row gap-1 items-center'>
      <Switch disabled={order === 0} checked={buttonSwitch} onChange={(e) => handleToggleChange(e, messageId)} tw={`${buttonSwitch ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex items-center h-4 rounded-full w-7 transition-all`}>
        <span tw={`${buttonSwitch ? 'translate-x-4' : 'translate-x-1'} transition-all inline-block w-2 h-2 transform bg-white rounded-full`} />
      </Switch>
      <input type='text' name={`reply-btn-${order}`} id={`reply-btn-${order}`} placeholder={`Reply button ${order + 1}`} value={buttonText} onChange={(e) => handleTextChange(e, messageId)} tw='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' />
      <span tw='text-xs'>{buttonText.length}/20</span>
    </div>
  );
};

export default ReplyButtonsInput;
