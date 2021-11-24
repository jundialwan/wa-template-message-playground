import { Switch } from '@headlessui/react';
import tw, { styled, css, theme } from 'twin.macro';

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
    <div tw='flex flex-row items-center gap-1 mt-2'>
      <div tw='gap-1'>
        <div tw='flex flex-row gap-1 items-center justify-center border px-3 py-2 rounded-lg'>
          {/* active inactive */}
          <div>
            <Switch
              checked={thisButton?.enabled}
              onChange={onToggleChange}
              css={[
                tw`h-[18px] w-[34px]
            relative inline-flex flex-shrink-0
            border-2 border-transparent rounded-full cursor-pointer
            transition-colors ease-in-out duration-200
            focus:outline-none focus-visible:(ring-2 ring-white ring-opacity-75)`,
                thisButton?.enabled ? tw`bg-blue-700` : tw`bg-gray-200`,
              ]}
            >
              <span
                aria-hidden='true'
                css={[
                  tw`h-[14px] w-[14px]
              pointer-events-none inline-block
              rounded-full bg-white shadow-lg transform ring-0
              transition ease-in-out duration-200`,
                  thisButton?.enabled ? tw`translate-x-4` : tw`translate-x-0`,
                ]}
              />
            </Switch>
          </div>

          <div tw='flex flex-col'>
            <div tw='flex flex-row items-center gap-1 font-semibold'>
              <span tw='text-xs text-gray-500'>Title Text</span>
              <span tw='text-xs'>({thisButton.title.length}/20)</span>
            </div>
            {/* Title */}
            <input type='text' name={`cta-text-${order}`} id={`cta-text-${order}`} value={thisButton.title} onChange={onButtonTitleChange} tw='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' />
          </div>
          <div tw='flex flex-col'>
            <div tw='flex flex-row items-center gap-1 font-semibold'>
              <span tw='text-xs text-gray-500'>Subtitle Text</span>
              <span tw='text-xs'>({thisButtonSub?.subtitle?.length}/20)</span>
            </div>
            {/* Subtitle */}
            <input type='text' name={`cta-text-${order}`} id={`cta-text-${order}`} value={thisButtonSub.subtitle} onChange={onButtonSubtitleChange} tw='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListMessageButtonInput;
