import RadioButtonItem from '@/components/Common/RadioButtonItem';
import React from 'react';
import { SectionHeading, SectionSubtitle } from '@/components/Common/LogiclessComponents';
import 'twin.macro';
import { useRecoilState } from 'recoil';
import { messageTypeSelector } from '@/Recoil/messageType';

const MessageType = () => {
  const [messageType, setMessageType] = useRecoilState(messageTypeSelector);
  const onMessageTypeChange = (e: any) => setMessageType(e.target.value);
  return (
    <>
      <SectionHeading title='Message Type' />
      <SectionSubtitle subtitle='Choose which type of message for chat bot' />
      <div tw='flex flex-row'>
        <RadioButtonItem isChecked={messageType === 'pushMessage'} value='pushMessage' id='push-message' label='Push Message' onChange={onMessageTypeChange} />
        <RadioButtonItem isChecked={messageType === 'chatbotMessage'} value='chatbotMessage' id='chatbot-message' label='Chatbot Message' onChange={onMessageTypeChange} />
      </div>
    </>
  );
};

export default MessageType;
