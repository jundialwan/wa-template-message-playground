import React from 'react';
import { useRecoilValue } from 'recoil';
import { listMessageAtom } from '../../Recoil/listMessage';
import { senderTypeSelector } from '../../Recoil/senderText';
import { PreviewComponent } from '../LogiclessComponents';
import UserMessage from '../TemplateMessage/UserMessage';
import TemplateMessagePreview from '../TemplateMessagePreview';
import BotBubble from './BotBubble';
import UserBubble from './UserBubble';

const WhatsAppPreview = () => {
  const userType = useRecoilValue(senderTypeSelector);
  const listMessage = useRecoilValue(listMessageAtom);
  return (
    <PreviewComponent>
      {listMessage.length > 0 &&
        listMessage.map((message: any, index: number) => {
          if (message.sender === 'user') {
            return (
              <div
                className='md:pr-1 md:ml-auto 2xl:pr-4 2xl:ml-auto max-w-[260px] my-2'
                key={index}
              >
                <UserBubble message={message} />
              </div>
            );
          }
          return (
            <div
              className='md:pl-1 md:mr-auto 2xl:pl-4 2xl:mr-auto max-w-[260px] my-2'
              key={index}
            >
              <BotBubble message={message} />
            </div>
          );
        })}
      {userType === 'bot' ? (
        <div className='md:pl-1 md:mr-auto 2xl:pl-4 2xl:mr-auto max-w-[260px] my-2'>
          <TemplateMessagePreview />
        </div>
      ) : null}

      {userType === 'user' ? (
        <div className='md:pr-1 md:ml-auto 2xl:pr-4 2xl:ml-auto max-w-[260px] my-2'>
          <UserMessage />
        </div>
      ) : null}
    </PreviewComponent>
  );
};

export default WhatsAppPreview;