import { Switch } from '@headlessui/react';

import { FC, useState } from 'react';
import { useRecoilState } from 'recoil';
import { interactiveButtonSelector } from '../../../../Recoil/interactiveButton';
import { listMessageAtom } from '../../../../Recoil/listMessage';

type ListMessageIndex = 0 | 1 | 2 | 3 | 4;

const ListMessageButtonInput: FC<{ order: ListMessageIndex; messageId: number; message: any }> = ({ order, messageId, message }) => {
  const [thisButton, setThisButton] = useRecoilState(interactiveButtonSelector(order));
  const [listMessage, setListMessage] = useRecoilState(listMessageAtom);
  const [buttonText, setButtonText] = useState(message.listMessage[order].title);
  const [buttonSwitch, setButtonSwitch] = useState(message.listMessage[order].enabled);
  const onButtonSubtitleChange = (e: any) => setThisButton((curr) => ({ ...curr, subtitle: e.target.value }));
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
    <div className='flex flex-row items-center gap-1 mt-2'>
      <div className='gap-1'>
        <div className='flex flex-row gap-1 items-center justify-center border px-3 py-2 rounded-lg'>
          {/* active inactive */}
          <div>
            <Switch checked={buttonSwitch} onChange={(e) => handleToggleChange(e, messageId)} className={`${buttonSwitch ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex items-center h-4 rounded-full w-7 transition-all`}>
              <span className={`${buttonSwitch ? 'translate-x-4' : 'translate-x-1'} transition-all inline-block w-2 h-2 transform bg-white rounded-full`} />
            </Switch>
          </div>

          <div className='flex flex-col'>
            <div className='flex flex-row items-center gap-1 font-semibold'>
              <span className='text-xs text-gray-500'>Title Text</span>
              <span className='text-xs'>({thisButton.title.length}/20)</span>
            </div>
            {/* Title */}
            <input type='text' name={`cta-text-${order}`} id={`cta-text-${order}`} value={buttonText} onChange={(e) => handleTitleTextInput(e, messageId)} className='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' />
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-row items-center gap-1 font-semibold'>
              <span className='text-xs text-gray-500'>Subtitle Text</span>
              <span className='text-xs'>({thisButton?.subtitle?.length}/20)</span>
            </div>
            {/* Subtitle */}
            <input type='text' name={`cta-text-${order}`} id={`cta-text-${order}`} value={thisButton.subtitle} onChange={onButtonSubtitleChange} className='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListMessageButtonInput;
