import React, { FC, useState } from 'react';
import { Switch } from '@headlessui/react';
import { ReplyButtonSelector } from '@/Recoil/interactiveButton';
import { useRecoilState } from 'recoil';
import tw, { styled, css, theme } from 'twin.macro';

type ReplyButtonIndex = 0 | 1 | 2;

const ReplyButtonsInput: FC = () => {
  return (
    <div tw='flex flex-col p-2 mt-2 gap-1'>
      <QuickReplyButtonInput order={0} />
      <QuickReplyButtonInput order={1} />
      <QuickReplyButtonInput order={2} />
    </div>
  );
};

const QuickReplyButtonInput: FC<{ order: ReplyButtonIndex }> = ({ order }) => {
  const [thisButton, setThisButton] = useRecoilState(ReplyButtonSelector(order));
  const onToggleChange = (e: any) => setThisButton((curr) => ({ ...curr, enabled: e }));
  const onButtonTextChange = (e: any) => setThisButton((curr) => ({ ...curr, text: e.target.value }));

  return (
    <div tw='flex flex-row gap-1 items-center'>
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
      <input
        type='text'
        name={`reply-btn-${order}`}
        id={`reply-btn-${order}`}
        placeholder={`Reply button ${order + 1}`}
        value={thisButton.text}
        onChange={onButtonTextChange}
        tw='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600'
      />
      <span tw='text-xs'>{thisButton.text.length}/20</span>
    </div>
  );
};

export default ReplyButtonsInput;
