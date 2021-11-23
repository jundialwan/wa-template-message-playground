import 'react-aspect-ratio/aspect-ratio.css';
import { FC, ReactElement } from 'react';
import { useRecoilValue } from 'recoil';
import { BsImage, BsFileEarmarkText, BsTelephoneFill } from 'react-icons/bs';
import { BiLinkExternal } from 'react-icons/bi';
import { renderedBodyTextSelector } from '../Recoil/bodyText';
import { allCTAButtonSelector, allQuickReplyButtonSelector, buttonsTypeSelector, CTAButtonIndex, QuickReplyButtonIndex, quickReplyButtonSelector } from '../Recoil/buttons';
import { normalizedFooterTextSelector } from '../Recoil/footerText';
import { headerImageSelector, headerTextSelector, headerTypeSelector, headerVideoSelector } from '../Recoil/header';
// import { BiLinkExternal } from '@react-icons/bi/BiLinkExternal';
// import { BsTelephoneFill } from '@react-icons/all-files/bs/BsTelephoneFill';
import tw, { styled } from 'twin.macro';

import AspectRatio from 'react-aspect-ratio';
import { IconType } from 'react-icons';
import VideoPreview from './TemplateMessage/VideoPreview';

import { interactiveButtonsTypeSelector } from '../Recoil/interactiveButton';
import ListMessageButton from './ListMessage/ListMessageButton';
import ReplyButton from './ListMessage/ReplyButton';

export const HeaderIllustration: FC<{
  icon?: ReactElement<any, any>;
  ratio: string;
}> = ({ icon, ratio }) => {
  return (
    <AspectRatio ratio={ratio}>
      <div tw='w-full bg-gray-300 h-6 rounded-md font-bold text-gray-400 text-center items-center justify-center flex text-xl'>{icon ? icon : null}</div>
    </AspectRatio>
  );
};

export const ImagePreview: FC<{ headerPathImage?: string }> = ({ headerPathImage }) => {
  if (headerPathImage && headerPathImage?.length > 1) {
    return (
      <AspectRatio ratio={16 / 9} tw='relative rounded-md overflow-hidden'>
        <img src={headerPathImage} alt='image' tw='absolute w-full h-full object-cover' />
      </AspectRatio>
    );
  } else {
    return <HeaderIllustration ratio='16/9' icon={<BsImage tw='h-6 w-6' />} />;
  }
};
// Preview
const TemplateMessagePreview: FC = () => {
  const headerType = useRecoilValue(headerTypeSelector);
  const headerPathImage = useRecoilValue(headerImageSelector);
  const headerPathVideo = useRecoilValue(headerVideoSelector);
  const headerText = useRecoilValue(headerTextSelector);
  const bodyText = useRecoilValue(renderedBodyTextSelector);
  const footerText = useRecoilValue(normalizedFooterTextSelector);
  const buttonType = useRecoilValue(buttonsTypeSelector);
  const interactiveType = useRecoilValue(interactiveButtonsTypeSelector);
  return (
    <>
      <ChatBot tw='relative w-full min-h-[20px] bg-white rounded-b-[5px] rounded-tl-none rounded-tr-[5px] shadow z-10 px-1 py-1 pb-2 text-black font-normal font-sans'>
        {headerType === 'text' ? <div tw='font-bold px-[4px]'>{headerText}</div> : null}
        {headerType === 'image' ? <ImagePreview headerPathImage={headerPathImage} /> : null}
        {headerType === 'video' ? <VideoPreview headerPathVideo={headerPathVideo} /> : null}
        {headerType === 'document' ? <HeaderIllustration ratio='4/1' icon={<BsFileEarmarkText tw='h-6 w-6' />} /> : null}

        <div tw='px-[4px] pb-2'>
          <div tw='whitespace-pre-line	my-[6px]'>{bodyText ? <div dangerouslySetInnerHTML={{ __html: bodyText }}></div> : <div>&nbsp;</div>}</div>
          <div tw='text-gray-600 text-xs'>{footerText}</div>
          <div tw='absolute bottom-0 right-[4px] text-right'>
            <span tw='text-gray-400 text-xs'>10:10</span>
          </div>
        </div>

        {buttonType === 'cta' ? (
          <>
            <div tw='border-t mx-[6px] my-[2px]'></div>
            <CTAButton order={0} />
            <CTAButton order={1} />
          </>
        ) : null}
      </ChatBot>
      {buttonType === 'reply' ? (
        <div tw='grid grid-cols-2 gap-[2px] mt-[2px]'>
          <QuickReplyButton order={0} />
          <QuickReplyButton order={1} />
          <QuickReplyButton order={2} />
        </div>
      ) : null}
      {interactiveType === 'listMessage' ? (
        <div tw=' grid grid-cols-2 gap-[2px] mt-[2px]'>
          <ListMessageButton />
        </div>
      ) : null}
      {interactiveType === 'reply' ? (
        <div tw='grid grid-cols-2 gap-[2px] mt-[2px]'>
          <ReplyButton order={0} />
          <ReplyButton order={1} />
          <ReplyButton order={2} />
        </div>
      ) : null}
    </>
  );
};

export default TemplateMessagePreview;

export const QuickReplyButton: FC<{ order: QuickReplyButtonIndex }> = ({ order }) => {
  const allButtons = useRecoilValue(allQuickReplyButtonSelector);
  const thisButton = allButtons[order];

  // const cn = classNames('w-full min-h-[20px] bg-white rounded-lg shadow z-10 px-2 py-2 font-sans text-center text-[#00A5F4] font-normal', order === 2 || (order === 0 && !allButtons[1].enabled) ? 'col-span-2' : '');

  if (thisButton.enabled) {
    return (
      <ButtonWhatsApp order={order} allButtons={allButtons}>
        {thisButton.text}
      </ButtonWhatsApp>
    );
  } else {
    return null;
  }
};
interface ButtonWhatsappProps {
  order: QuickReplyButtonIndex;
  allButtons: any;
}
const ButtonWhatsApp = styled.div(({ order, allButtons }: ButtonWhatsappProps) => [tw`w-full min-h-[20px] bg-white rounded-lg shadow z-10 px-2 py-2 font-sans text-center text-[#00A5F4] font-normal`, order === 2 || (order === 0 && !allButtons[1].enabled) ? tw`col-span-2` : '']);

export const CTAButton: FC<{ order: CTAButtonIndex }> = ({ order }) => {
  const allButtons = useRecoilValue(allCTAButtonSelector);
  const thisButton = allButtons[order];

  if (thisButton.enabled) {
    return (
      <div tw='font-sans text-base text-center text-[#00A5F4] py-1 flex flex-row gap-1 items-center justify-center'>
        {thisButton.type === 'call-phone' ? <BsTelephoneFill /> : <BiLinkExternal />}
        <span>{thisButton.text}</span>
      </div>
    );
  } else {
    return null;
  }
};

export const ChatBot = styled.div`
  &::after {
    content: ' ';
    position: absolute;
    top: 1px;
    left: -9px;
    width: 12px;
    height: 12px;
    background-image: url('/ornament/chat-bot.svg');
    background-size: cover;
    background-repeat: no-repeat;
  }
`;
