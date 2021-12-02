import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import RadioButtonItem from '@/components/Common/RadioButtonItem';
import tw, { styled, css, theme } from 'twin.macro';
import { chatbotTypeSelector } from '@/Recoil/chatbotType';

const ChatbotTypeInput: FC = () => {
  const [chatbotType, setChatbotType] = useRecoilState(chatbotTypeSelector);
  const onChatbotTypeChange = (e: any) => setChatbotType(e.target.value);
  return (
    <>
      <div tw='flex flex-row'>
        <RadioButtonItem isChecked={chatbotType === 'normalMessage'} value='normalMessage' id='normal-message' label='Normal Message' onChange={onChatbotTypeChange} />
        <RadioButtonItem isChecked={chatbotType === 'productMessage'} value='productMessage' id='product-message' label='Product Message' onChange={onChatbotTypeChange} />
      </div>
    </>
  );
};

export default ChatbotTypeInput;
