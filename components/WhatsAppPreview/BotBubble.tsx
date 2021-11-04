import React, { FC } from 'react';
import { BsFileEarmarkText } from 'react-icons/bs';
import VideoPreview from '../TemplateMessage/VideoPreview';
import {
  ChatBot,
  CTAButton,
  HeaderIllustration,
  ImagePreview,
  QuickReplyButton,
} from '../TemplateMessagePreview';

const BotBubble: FC<{ message: any }> = ({ message }) => {
  console.log('Message Bot', message);
  return (
    <>
      <ChatBot className='relative w-full min-h-[20px] bg-white rounded-lg shadow z-10 px-1 py-1 pb-2 text-black font-normal font-sans'>
        {message.header.type === 'text' ? (
          <div className='font-bold px-[4px]'>{message.header.text}</div>
        ) : null}
        {message.header.type === 'image' ? (
          <ImagePreview headerPathImage={message.header.image.path} />
        ) : null}
        {message.header.type === 'video' ? (
          <VideoPreview headerPathVideo={message.header.video.path} />
        ) : null}
        {message.header.type === 'document' ? (
          <HeaderIllustration
            ratio='4/1'
            iconBoxSize='8'
            icon={BsFileEarmarkText}
          />
        ) : null}
        {/* Body */}
        <div className='relative px-[4px] pb-2'>
          <div className='whitespace-pre-line	my-[6px]'>
            {message.body.text ? (
              <div
                dangerouslySetInnerHTML={{ __html: message.body.text }}
              ></div>
            ) : (
              <div>&nbsp;</div>
            )}
          </div>
          <div className='text-gray-600 text-xs'>{message.footer.text}</div>
          <div className='absolute bottom-0 right-[4px] text-right'>
            <span className='text-gray-400 text-xs'>10:10</span>
          </div>
        </div>
        {message.footer.button.type === 'cta' ? (
          <>
            <div className='border-t mx-[6px] my-[2px]'></div>

            <CTAButton order={0} />
            <CTAButton order={1} />
          </>
        ) : null}
      </ChatBot>
      {message.footer.button.type === 'reply' ? (
        <div className='grid grid-cols-2 gap-[2px] mt-[2px]'>
          <QuickReplyButton order={0} />
          <QuickReplyButton order={1} />
          <QuickReplyButton order={2} />
        </div>
      ) : null}
    </>
  );
};

export default BotBubble;
