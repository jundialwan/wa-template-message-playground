import { SectionHeading, SectionSubtitle } from '@/components/Common/LogiclessComponents';
import React, { FC } from 'react';
import BubbleTypeInput from './ChatbotMessage/BubbleTypeInput';

const ChatbotMessage: FC = () => {
  return (
    <div>
      <div tw='flex-none shadow-sm rounded-sm bg-white p-2'>
        <SectionHeading title='Bubble Type' />
        <SectionSubtitle subtitle="Choose which type of media you'll use for this bubble" />
        <BubbleTypeInput />
      </div>
    </div>
  );
};

export default ChatbotMessage;
