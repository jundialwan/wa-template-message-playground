import { ExternalLinkIcon, PhoneIcon } from '@chakra-ui/icons';
import { Transition } from '@headlessui/react';
import React, { FC, useEffect, useState } from 'react';
import { BsFileEarmarkText } from 'react-icons/bs';
import { CTAButtonIndex, QuickReplyButtonIndex } from '../../Recoil/buttons';
import { ReplyButtonIndex } from '../../Recoil/interactiveButton';
import { classNames } from '../../util';
import VideoPreview from '../TemplateMessage/VideoPreview';
import { ChatBot, HeaderIllustration } from '../TemplateMessagePreview';

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
          <QuickReplyButton order={0} message={message.footer.button.reply} />
          <QuickReplyButton order={1} message={message.footer.button.reply} />
          <QuickReplyButton order={2} message={message.footer.button.reply} />
        </div>
      ) : null}
      {message.interactive.type === 'listMessage' ? (
        <div className='grid grid-cols-2 gap-[2px] mt-[2px]'>
          <ListMessageButton />
        </div>
      ) : null}
      {message.interactive.type === 'reply' ? (
        <div className='grid grid-cols-2 gap-[2px] mt-[2px]'>
          <ReplyButton order={0} message={message.interactive.reply} />
          <ReplyButton order={1} message={message.interactive.reply} />
          <ReplyButton order={2} message={message.interactive.reply} />
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

const QuickReplyButton: FC<{ order: QuickReplyButtonIndex; message: any }> = ({ order, message }) => {
  const thisButton = message[order];

  const cn = classNames('w-full min-h-[20px] bg-white rounded-lg shadow z-10 px-2 py-2 font-sans text-center text-[#00A5F4] font-normal', order === 2 || (order === 0 && !message[1].enabled) ? 'col-span-2' : '');

  if (thisButton.enabled) {
    return <div className={cn}>{thisButton.text}</div>;
  } else {
    return null;
  }
};

const ListMessageButton: FC = () => {
  const [isShowMessage, setShowMessage] = useState(false);
  return (
    <>
      <div className='w-full min-h-[20px] bg-white rounded-lg shadow z-10 px-2 py-2 font-sans text-center text-[#0099CB] font-normal col-span-full flex items-center justify-center' onClick={() => setShowMessage(!isShowMessage)}>
        <svg width='16' height='14' viewBox='0 0 16 14' fill='none' xmlns='http://www.w3.org/2000/svg'>
          <path d='M14.9968 2.67981H5.81604C5.35232 2.67981 4.9776 2.14974 4.9776 1.50189C4.9776 0.854037 5.35232 0.323975 5.81604 0.323975H14.9968C15.4605 0.323975 15.8352 0.854037 15.8352 1.50189C15.8352 2.14974 15.4605 2.67981 14.9968 2.67981Z' fill='#0099CB' />
          <path d='M1.50184 3.00369C2.33129 3.00369 3.00369 2.33129 3.00369 1.50184C3.00369 0.672398 2.33129 0 1.50184 0C0.672398 0 0 0.672398 0 1.50184C0 2.33129 0.672398 3.00369 1.50184 3.00369Z' fill='#0099CB' />
          <path d='M14.9968 7.97546H5.81604C5.35232 7.97546 4.9776 7.4454 4.9776 6.79754C4.9776 6.14969 5.35232 5.61963 5.81604 5.61963H14.9968C15.4605 5.61963 15.8352 6.14969 15.8352 6.79754C15.8352 7.4454 15.4605 7.97546 14.9968 7.97546Z' fill='#0099CB' />
          <path d='M1.50184 8.29934C2.33129 8.29934 3.00369 7.62694 3.00369 6.7975C3.00369 5.96805 2.33129 5.29565 1.50184 5.29565C0.672398 5.29565 0 5.96805 0 6.7975C0 7.62694 0.672398 8.29934 1.50184 8.29934Z' fill='#0099CB' />
          <path d='M14.9968 13.2711H5.81604C5.35232 13.2711 4.9776 12.7411 4.9776 12.0932C4.9776 11.4453 5.35232 10.9153 5.81604 10.9153H14.9968C15.4605 10.9153 15.8352 11.4453 15.8352 12.0932C15.8352 12.7411 15.4605 13.2711 14.9968 13.2711Z' fill='#0099CB' />
          <path d='M1.50184 13.595C2.33129 13.595 3.00369 12.9226 3.00369 12.0932C3.00369 11.2637 2.33129 10.5913 1.50184 10.5913C0.672398 10.5913 0 11.2637 0 12.0932C0 12.9226 0.672398 13.595 1.50184 13.595Z' fill='#0099CB' />
        </svg>
        <p className='text-sm ml-2'> List Message</p>
      </div>

      <Transition appear show={isShowMessage} className='absolute top-[30%] left-0 right-0 '>
        <Transition.Child enter='ease-out duration-300' enterFrom='opacity-0 scale-95' enterTo='opacity-100 scale-100' leave='ease-in duration-200' leaveFrom='opacity-100 scale-100' leaveTo='opacity-0 scale-95' as='div' className='bg-white rounded-tr-2xl rounded-tl-2xl w-full absolute h-[375px] left-0 right-0 z-20 px-[18px] py-[23px]'>
          <div className='flex flex-col'>
            <div className='flex flex-col'>
              <div className='flex items-center justify-center relative'>
                <button className='absolute top-0 left-0 h-4 w-6 flex items-center justify-center' onClick={() => setShowMessage(!isShowMessage)}>
                  <svg className=' h-4 w-4' viewBox='0 0 15 15' fill='none' xmlns='http://www.w3.org/2000/svg'>
                    <path d='M8.87422 7.50011L14.7149 1.65911C15.095 1.27918 15.095 0.664882 14.7149 0.28495C14.335 -0.0949832 13.7207 -0.0949832 13.3408 0.28495L7.49991 6.12595L1.65921 0.28495C1.27911 -0.0949832 0.665002 -0.0949832 0.285077 0.28495C-0.0950257 0.664882 -0.0950257 1.27918 0.285077 1.65911L6.12578 7.50011L0.285077 13.3411C-0.0950257 13.721 -0.0950257 14.3353 0.285077 14.7153C0.474417 14.9048 0.72337 15 0.972145 15C1.22092 15 1.46969 14.9048 1.65921 14.7153L7.49991 8.87428L13.3408 14.7153C13.5303 14.9048 13.7791 15 14.0279 15C14.2766 15 14.5254 14.9048 14.7149 14.7153C15.095 14.3353 15.095 13.721 14.7149 13.3411L8.87422 7.50011Z' fill='#7D8489' />
                  </svg>
                </button>
                <h3 className='font-bold text-sm text-black'>Pilih Kelas Kereta Api</h3>
              </div>
              <p className='mt-5 text-[#00796B] text-sm'>Menu</p>
            </div>
            <div className='flex flex-col mt-7 space-y-6'>
              <div className='flex space-between items-center '>
                <label className='inline-flex items-center w-full'>
                  <span className='text-sm text-black'>Personal</span>
                  <input type='radio' className='form-radio radio-wa h-4 w-4 ml-auto' name='accountType' value='personal' />
                </label>
              </div>
              <div className='flex space-between items-center '>
                <label className='inline-flex items-center w-full'>
                  <span className='text-sm text-black'>Personal</span>
                  <input type='radio' className='form-radio radio-wa h-4 w-4 ml-auto' name='accountType' value='personal' />
                </label>
              </div>
              <div className='flex space-between items-center '>
                <label className='inline-flex items-center w-full'>
                  <span className='text-sm text-black'>Personal</span>
                  <input type='radio' className='form-radio radio-wa h-4 w-4 ml-auto' name='accountType' value='personal' />
                </label>
              </div>
              <div className='flex space-between items-center '>
                <label className='inline-flex items-center w-full'>
                  <span className='text-sm text-black'>Personal</span>
                  <input type='radio' className='form-radio radio-wa h-4 w-4 ml-auto' name='accountType' value='personal' />
                </label>
              </div>
            </div>
            <button className='bg-[#00BF56] rounded-md w-full h-[46px] flex items-center justify-center text-white mt-8'>KIRIM</button>
          </div>
        </Transition.Child>
      </Transition>
    </>
  );
};

const ReplyButton: FC<{ order: ReplyButtonIndex; message: any }> = ({ order, message }) => {
  const thisButton = message[order];

  if (thisButton.enabled) {
    return <div className='w-full min-h-[20px] bg-white rounded-lg shadow z-10 px-2 py-2 font-sans text-center text-[#00A5F4] font-normal col-span-full'>{thisButton.text}</div>;
  } else {
    return null;
  }
};
