import { Switch } from '@headlessui/react';

import { FC, useState } from 'react';
import { useRecoilState } from 'recoil';
import { interactiveButtonSelector } from '../../../../Recoil/interactiveButton';
import { listMessageAtom } from '../../../../Recoil/listMessage';
import tw, { styled, css, theme } from 'twin.macro';

type ListMessageIndex = 0 | 1 | 2 | 3 | 4;

const ListMessageButtonInput: FC<{ order: ListMessageIndex; messageId: number; message: any }> = ({ order, messageId, message }) => {
  const [listMessage, setListMessage] = useRecoilState(listMessageAtom);
  const [buttonText, setButtonText] = useState(message.listMessage[order].title);
  const [buttonSubText, setButtonSubText] = useState(message.listMessage[order].subtitle);
  const [buttonSwitch, setButtonSwitch] = useState(message.listMessage[order].enabled);
  // const onButtonSubtitleChange = (e: any) => setButtonSubText((curr) => ({ ...curr, subtitle: e.target.value }));
  const handleSubtitleTextInput = (event: any, messageId: any) => {
    setButtonSubText(event?.target?.value.substring(0, 20));
    let newlistMessage = listMessage.map((data: any) => {
      return {
        ...data,
        interactive: {
          ...data.interactive,
          listMessage: {
            ...data.interactive.listMessage,
            [order]: {
              ...data.interactive.listMessage[order],
              subtitle: data.id === messageId ? event.target.value : data.interactive.listMessage[order].subtitle,
            },
          },
        },
      };
    });
    setListMessage(newlistMessage);
  };
  const handleTitleTextInput = (event: any, messageId: any) => {
    setButtonText(event?.target?.value.substring(0, 20));
    let newlistMessage = listMessage.map((data: any) => {
      return {
        ...data,
        interactive: {
          ...data.interactive,
          listMessage: {
            ...data.interactive.listMessage,
            [order]: {
              ...data.interactive.listMessage[order],
              title: data.id === messageId ? event.target.value : data.interactive.listMessage[order].title,
            },
          },
        },
      };
    });
    setListMessage(newlistMessage);
  };
  const handleToggleChange = (event: any, messageId: any) => {
    setButtonSwitch(event);
    let newlistMessage = listMessage.map((data: any) => {
      return {
        ...data,
        interactive: {
          ...data.interactive,
          listMessage: {
            ...data.interactive.listMessage,
            [order]: {
              ...data.interactive.listMessage[order],
              enabled: data.id === messageId ? event : data.interactive.listMessage[order].enabled,
            },
          },
        },
      };
    });
    setListMessage(newlistMessage);
  };
  // console.log(`ListMessageButtonInput ${order}`, message);
  return (
    <div tw='flex flex-row items-center gap-1 mt-2'>
      <div tw='gap-1'>
        <div tw='flex flex-row gap-1 items-center justify-center border px-3 py-2 rounded-lg'>
          {/* active inactive */}
          <div>
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
          </div>

          <div tw='flex flex-col'>
            <div tw='flex flex-row items-center gap-1 font-semibold'>
              <span tw='text-xs text-gray-500'>Title Text</span>
              <span tw='text-xs'>({buttonText?.length}/20)</span>
            </div>
            {/* Title */}
            <input type='text' name={`cta-text-${order}`} id={`cta-text-${order}`} value={buttonText} onChange={(e) => handleTitleTextInput(e, messageId)} tw='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' />
          </div>
          <div tw='flex flex-col'>
            <div tw='flex flex-row items-center gap-1 font-semibold'>
              <span tw='text-xs text-gray-500'>Subtitle Text</span>
              <span tw='text-xs'>({buttonSubText?.length}/20)</span>
            </div>
            {/* Subtitle */}
            <input type='text' name={`cta-text-${order}`} id={`cta-text-${order}`} value={buttonSubText} onChange={(e) => handleSubtitleTextInput(e, messageId)} tw='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListMessageButtonInput;
