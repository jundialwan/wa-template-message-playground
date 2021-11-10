import { ExternalLinkIcon, PhoneIcon } from '@chakra-ui/icons';
import React, { FC, useEffect } from 'react';
import { BsFileEarmarkText } from 'react-icons/bs';
import { CTAButtonIndex } from '../../Recoil/buttons';
import VideoPreview from '../TemplateMessage/VideoPreview';
import { ChatBot, HeaderIllustration, QuickReplyButton } from '../TemplateMessagePreview';

import ImagePreview from './Header/ImagePreview';

const BotBubble: FC<{ message: any }> = ({ message }) => {
  console.log('Message Bot', message);
  const replaceBold = message.body.text.replace(/\*(.*?)\*/g, (match: any, p1: any) => `<span class="font-semibold">${p1}</span>`);
  const replaceItalic = replaceBold.replace(/\_(.*?)\_/g, (match: any, p1: any) => `<i>${p1}</i>`);
  const replaceStrike = replaceItalic.replace(/\~(.*?)\~/g, (match: any, p1: any) => `<strike>${p1}</strike>`);
  const replaceMono = replaceStrike.replace(/\`\`\`(.*?)\`\`\`/g, (match: any, p1: any) => `<span class="font-mono">${p1}</span>`);
  useEffect(() => {}, [message]);
  return (
    <>
      <ChatBot className='relative w-full min-h-[20px] bg-white rounded-lg shadow z-10 px-1 py-1 pb-2 text-black font-normal font-sans'>
        {message.header.type === 'text' ? <div className='font-bold px-[4px]'>{message.header.text}</div> : null}
        {message.header.type === 'image' ? <ImagePreview headerPathImage={message.header.image.path} /> : null}
        {message.header.type === 'video' ? <VideoPreview headerPathVideo={message.header.video.path} /> : null}
        {message.header.type === 'document' ? <HeaderIllustration ratio='4/1' iconBoxSize='8' icon={BsFileEarmarkText} /> : null}
        {/* Body */}
        <div className='relative px-[4px] pb-2'>
          <div className='whitespace-pre-line	my-[6px]'>{replaceMono ? <div dangerouslySetInnerHTML={{ __html: replaceMono }}></div> : <div>&nbsp;</div>}</div>
          <div className='text-gray-600 text-xs'>{message.footer.text}</div>
          <div className='absolute bottom-0 right-[4px] text-right'>
            <span className='text-gray-400 text-xs'>10:10</span>
          </div>
        </div>
        {message.footer.button.type === 'cta' ? (
          <>
            <div className='border-t mx-[6px] my-[2px]'></div>

            <CTAButton order={0} message={message.footer.button.cta} />
            <CTAButton order={1} message={message.footer.button.cta} />
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

const CTAButton: FC<{ order: CTAButtonIndex; message: any }> = ({ order, message }) => {
  const allButtons = message;
  const thisButton = allButtons[order];

  if (thisButton.enabled) {
    return (
      <div className='font-sans text-base text-center text-[#00A5F4] py-1 flex flex-row gap-1 items-center justify-center'>
        {thisButton.type === 'call-phone' ? <PhoneIcon /> : <ExternalLinkIcon />}
        <span>{thisButton.text}</span>
      </div>
    );
  } else {
    return null;
  }
};
