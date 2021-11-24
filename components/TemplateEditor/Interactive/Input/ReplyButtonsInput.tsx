import React, { ChangeEventHandler, FC, useState } from 'react';
import { Switch } from '@headlessui/react';
import { ReplyButtonSelector } from '../../../../Recoil/interactiveButton';
import { useRecoilState } from 'recoil';
import { listMessageAtom } from '../../../../Recoil/listMessage';
import tw, { styled, css, theme } from 'twin.macro';

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
      <Switch
        checked={buttonSwitch}
        onChange={(e) => handleToggleChange(e, messageId)}
        css={[
          tw`h-[18px] w-[34px]
            relative inline-flex flex-shrink-0
            border-2 border-transparent rounded-full cursor-pointer
            transition-colors ease-in-out duration-200
            focus:outline-none focus-visible:(ring-2 ring-white ring-opacity-75)`,
          buttonSwitch ? tw`bg-blue-700` : tw`bg-gray-200`,
        ]}
      >
        <span
          aria-hidden='true'
          css={[
            tw`h-[14px] w-[14px]
              pointer-events-none inline-block
              rounded-full bg-white shadow-lg transform ring-0
              transition ease-in-out duration-200`,
            buttonSwitch ? tw`translate-x-4` : tw`translate-x-0`,
          ]}
        />
      </Switch>
      <input type='text' name={`reply-btn-${order}`} id={`reply-btn-${order}`} placeholder={`Reply button ${order + 1}`} value={buttonText} onChange={(e) => handleTextChange(e, messageId)} tw='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' />
      <span tw='text-xs'>{buttonText.length}/20</span>
    </div>
  );
};

export default ReplyButtonsInput;
