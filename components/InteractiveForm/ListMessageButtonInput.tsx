import { Switch } from '@headlessui/react';

import { FC, useState } from 'react';
import { useRecoilState } from 'recoil';
import { interactiveButtonSelector, interactiveSubtitleButtonSelector } from '../../Recoil/interactiveButton';

type ListMessageIndex = 0 | 1 | 2 | 3 | 4;

const ListMessageButtonInput: FC<{ order: ListMessageIndex }> = ({ order }) => {
  const [thisButton, setThisButton] = useRecoilState(interactiveButtonSelector(order));
  const [thisButtonSub, setThisButtonSub] = useRecoilState(interactiveSubtitleButtonSelector(order));
  const onToggleChange = (e: any) => setThisButton((curr) => ({ ...curr, enabled: e }));
  const onButtonTitleChange = (e: any) => setThisButton((curr) => ({ ...curr, title: e.target.value }));
  const onButtonSubtitleChange = (e: any) => setThisButtonSub((curr) => ({ ...curr, subtitle: e.target.value }));
  // console.log('ListMessageButtonInput', thisButton);
  return (
    <div className='flex flex-row items-center gap-1 mt-2'>
      <div className='gap-1'>
        <div className='flex flex-row gap-1 items-center justify-center border px-3 py-2 rounded-lg'>
          {/* active inactive */}
          <div>
            <Switch checked={thisButton?.enabled} onChange={onToggleChange} className={`${thisButton?.enabled ? 'bg-blue-600' : 'bg-gray-200'} relative inline-flex items-center h-4 rounded-full w-7 transition-all`}>
              <span className={`${thisButton?.enabled ? 'translate-x-4' : 'translate-x-1'} transition-all inline-block w-2 h-2 transform bg-white rounded-full`} />
            </Switch>
          </div>

          <div className='flex flex-col'>
            <div className='flex flex-row items-center gap-1 font-semibold'>
              <span className='text-xs text-gray-500'>Title Text</span>
              <span className='text-xs'>({thisButton.title.length}/20)</span>
            </div>
            {/* Title */}
            <input type='text' name={`cta-text-${order}`} id={`cta-text-${order}`} value={thisButton.title} onChange={onButtonTitleChange} className='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' />
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-row items-center gap-1 font-semibold'>
              <span className='text-xs text-gray-500'>Subtitle Text</span>
              <span className='text-xs'>({thisButtonSub?.subtitle?.length}/20)</span>
            </div>
            {/* Subtitle */}
            <input type='text' name={`cta-text-${order}`} id={`cta-text-${order}`} value={thisButtonSub.subtitle} onChange={onButtonSubtitleChange} className='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListMessageButtonInput;
