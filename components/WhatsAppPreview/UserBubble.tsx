import React, { FC } from 'react';
import { BsFileEarmarkText } from 'react-icons/bs';
import { StyledUserMessage } from '../TemplateMessage/UserMessage';
import VideoPreview from '../TemplateMessage/VideoPreview';
import { ChatBot, CTAButton, HeaderIllustration, ImagePreview, QuickReplyButton } from '../TemplateMessagePreview';

const UserBubble: FC<{ message: any }> = ({ message }) => {
  console.log('Message User', message);
  const replaceBold = message.body.text.replace(/\*(.*?)\*/g, (match: any, p1: any) => `<span class="font-semibold">${p1}</span>`);
  const replaceItalic = replaceBold.replace(/\_(.*?)\_/g, (match: any, p1: any) => `<i>${p1}</i>`);
  const replaceStrike = replaceItalic.replace(/\~(.*?)\~/g, (match: any, p1: any) => `<strike>${p1}</strike>`);
  const replaceMono = replaceStrike.replace(/\`\`\`(.*?)\`\`\`/g, (match: any, p1: any) => `<span class="font-mono">${p1}</span>`);

  return (
    <>
      <StyledUserMessage tw='relative w-full min-h-[20px] bg-leaf rounded-b-[5px] rounded-tr-none rounded-tl-[5px] shadow-chat-bubble z-10 px-1 py-1 pb-2 text-black font-normal font-sans'>
        {message.header.type === 'text' ? <div tw='font-bold px-[4px]'>{message.header.text}</div> : null}
        {message.header.type === 'image' ? <ImagePreview headerPathImage={message.header.image.path} /> : null}
        {message.header.type === 'video' ? <VideoPreview headerPathVideo={message.header.video.path} /> : null}
        {message.header.type === 'document' ? <HeaderIllustration ratio='4/1' iconBoxSize='8' icon={BsFileEarmarkText} /> : null}
        {/* Body */}
        <div tw='relative px-[4px] pb-2'>
          <div tw='whitespace-pre-line	my-[6px]'>{replaceMono ? <div dangerouslySetInnerHTML={{ __html: replaceMono }}></div> : <div>&nbsp;</div>}</div>
          <div tw='text-gray-600 text-xs'>{message.footer.text}</div>
          <div tw='absolute bottom-[2px] right-[0px] text-right flex items-center'>
            <span tw='text-gray-400 text-xs mr-1'>10:10</span>
            <span>
              <svg width='17' height='9' viewBox='0 0 17 9' fill='none' xmlns='http://www.w3.org/2000/svg'>
                <path fillRule='evenodd' clipRule='evenodd' d='M8.625 6.75946L7.77051 6.013L6.93591 6.90546L8.625 8.50946L16.125 1.00946L15.25 0.13446L8.625 6.75946Z' fill='#35B7F1' />
                <path fillRule='evenodd' clipRule='evenodd' d='M3.625 6.75946L1 4.13446L0.125 5.00946L3.625 8.50946L11.125 1.00946L10.25 0.13446L3.625 6.75946Z' fill='#35B7F1' />
              </svg>
            </span>
          </div>
        </div>
      </StyledUserMessage>
    </>
  );
};

export default UserBubble;
