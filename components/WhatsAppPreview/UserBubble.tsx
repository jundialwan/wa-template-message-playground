import React, { FC } from 'react';
import { BsFileEarmarkText } from 'react-icons/bs';
import { StyledUserMessage } from '../TemplateMessage/UserMessage';
import VideoPreview from '../TemplateMessage/VideoPreview';
import {
  ChatBot,
  CTAButton,
  HeaderIllustration,
  ImagePreview,
  QuickReplyButton,
} from '../TemplateMessagePreview';

const UserBubble: FC<{ message: any }> = ({ message }) => {
  console.log('Message User', message);
  return (
    <>
      <StyledUserMessage className='relative w-full min-h-[20px] bg-leaf rounded-lg shadow z-10 px-1 py-1 pb-2 text-black font-normal font-sans'>
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
          <div className='absolute bottom-[2px] right-[0px] text-right flex items-center'>
            <span className='text-gray-400 text-xs mr-1'>10:10</span>
            <span>
              <svg
                width='17'
                height='9'
                viewBox='0 0 17 9'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M8.625 6.75946L7.77051 6.013L6.93591 6.90546L8.625 8.50946L16.125 1.00946L15.25 0.13446L8.625 6.75946Z'
                  fill='#35B7F1'
                />
                <path
                  fillRule='evenodd'
                  clipRule='evenodd'
                  d='M3.625 6.75946L1 4.13446L0.125 5.00946L3.625 8.50946L11.125 1.00946L10.25 0.13446L3.625 6.75946Z'
                  fill='#35B7F1'
                />
              </svg>
            </span>
          </div>
        </div>
        {message.footer.button.type === 'cta' ? (
          <>
            <div className='border-t mx-[6px] my-[2px]'></div>

            <CTAButton order={0} />
            <CTAButton order={1} />
          </>
        ) : null}
      </StyledUserMessage>
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

export default UserBubble;
