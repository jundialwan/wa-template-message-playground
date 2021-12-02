import { SectionHeading, SectionSubtitle } from '@/components/Common/LogiclessComponents';
import React, { FC } from 'react';
import ChatbotTypeInput from './ChatbotMessage/ChatbotTypeInput';
import HeaderForm from './ChatbotMessage/Normal/Header/HeaderForm';
import BodyForm from './ChatbotMessage/Normal/Body/BodyForm';
import ButtonInputForm from './ChatbotMessage/Normal/Buttons/ButtonInputForm';
import 'twin.macro';
import { useRecoilValue } from 'recoil';
import { chatbotTypeSelector } from '@/Recoil/chatbotType';
const ChatbotMessage: FC = () => {
  const chatbotType = useRecoilValue(chatbotTypeSelector);
  return (
    <div tw='divide-y-2'>
      <div tw='flex-none shadow-sm rounded-sm bg-white p-2'>
        <SectionHeading title='Chatbot Mesage Type' />
        <SectionSubtitle subtitle="Choose which type of chatbot you'll use for this bubble" />
        <ChatbotTypeInput />
      </div>
      {chatbotType === 'normalMessage' ? (
        <>
          {' '}
          <div tw='flex-none shadow-sm rounded-sm bg-white p-2'>
            <SectionHeading title='Header (optional)' />
            <SectionSubtitle subtitle="Choose which type of media you'll use for this header" />
            <HeaderForm />
          </div>
          <div tw='flex-none shadow-sm rounded-sm bg-white p-2 mb-6'>
            <SectionHeading title='Body' />
            <SectionSubtitle subtitle='Enter the body text for your message.' />
            <BodyForm />
          </div>
          <div tw='flex-none shadow-sm rounded-sm bg-white p-2'>
            <SectionHeading title='Buttons (optional)' />
            <SectionSubtitle subtitle="Create buttons that let customers respond to your message. Available: 'Call to action' and 'Quick Reply' button." />
            <ButtonInputForm />
          </div>{' '}
        </>
      ) : (
        <div tw='flex-none shadow-sm rounded-sm bg-white p-2'>
          <SectionHeading title='Product Type Message' />
          <SectionSubtitle subtitle="Choose which type of product you'll use for this bubble" />
          <div>
            <p>Under Development. Sorry</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatbotMessage;
