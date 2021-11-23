import React from 'react';
import 'react-aspect-ratio/aspect-ratio.css';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { BsImage, BsPlay, BsFileEarmarkText } from 'react-icons/bs';
import { normalizedBodyTextSelector, renderedBodyTextSelector } from '../../Recoil/bodyText';
import { allCTAButtonSelector, allQuickReplyButtonSelector, buttonsTypeSelector, CTAButtonIndex, QuickReplyButtonIndex, quickReplyButtonSelector } from '../../Recoil/buttons';
import { normalizedFooterTextSelector } from '../../Recoil/footerText';
import { headerImageSelector, headerTextSelector, headerTypeSelector, headerVideoSelector } from '../../Recoil/header';
import tw, { styled, css, theme } from 'twin.macro';
import VideoPreview from './VideoPreview';
import { CTAButton, HeaderIllustration, ImagePreview, QuickReplyButton } from '../TemplateMessagePreview';

export const StyledUserMessage = styled.div`
  box-shadow: 1px 1px 1px rgba(0, 0, 0, 0.1);
  &::after {
    content: ' ';
    position: absolute;
    top: 1px;
    right: -8px;
    width: 12px;
    height: 12px;
    background-image: url('/ornament/chat-user.svg');
    background-size: cover;
    background-repeat: no-repeat;
  }
`;

const UserMessage = () => {
  const headerType = useRecoilValue(headerTypeSelector);
  const headerPathImage = useRecoilValue(headerImageSelector);
  const headerPathVideo = useRecoilValue(headerVideoSelector);
  const headerText = useRecoilValue(headerTextSelector);
  const bodyText = useRecoilValue(renderedBodyTextSelector);
  const footerText = useRecoilValue(normalizedFooterTextSelector);
  const buttonType = useRecoilValue(buttonsTypeSelector);

  return (
    <>
      <StyledUserMessage tw='relative w-full min-h-[20px] bg-leaf rounded-b-[5px] rounded-tr-none rounded-tl-[5px] z-10 px-1 py-1 pb-2 text-black font-normal font-sans'>
        {headerType === 'text' ? <div tw='font-bold px-[4px]'>{headerText}</div> : null}
        {headerType === 'image' ? <ImagePreview headerPathImage={headerPathImage} /> : null}
        {headerType === 'video' ? <VideoPreview headerPathVideo={headerPathVideo} /> : null}
        {headerType === 'document' ? <HeaderIllustration ratio='4/1' icon={<BsFileEarmarkText tw='h-6 w-6' />} /> : null}

        <div tw='relative px-[4px] pb-2'>
          <div tw='whitespace-pre-line	my-[6px]'>{bodyText ? <div dangerouslySetInnerHTML={{ __html: bodyText }}></div> : <div>&nbsp;</div>}</div>
          <div tw='text-gray-600 text-xs'>{footerText}</div>
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

        {buttonType === 'cta' ? (
          <>
            <div tw='border-t mx-[6px] my-[2px]'></div>

            <CTAButton order={0} />
            <CTAButton order={1} />
          </>
        ) : null}
      </StyledUserMessage>
      {buttonType === 'reply' ? (
        <div tw='grid grid-cols-2 gap-[2px] mt-[2px]'>
          <QuickReplyButton order={0} />
          <QuickReplyButton order={1} />
          <QuickReplyButton order={2} />
        </div>
      ) : null}
    </>
  );
};

export default UserMessage;
