import AspectRatio from 'react-aspect-ratio';
import { FC } from 'react';
import { BsPlay } from 'react-icons/bs';
import { HeaderIllustration } from '../TemplateMessagePreview';
import tw, { styled, css, theme } from 'twin.macro';

const VideoPreview: FC<{ headerPathVideo?: string }> = ({ headerPathVideo }) => {
  if (headerPathVideo && headerPathVideo?.length > 1) {
    return (
      <AspectRatio ratio={16 / 9} tw='relative overflow-hidden rounded-md'>
        <video tw='w-full h-full' controls>
          <source src={headerPathVideo} type='video/mp4' />
        </video>
      </AspectRatio>
    );
  } else {
    return <HeaderIllustration ratio='16/9' icon={<BsPlay tw='h-6 w-6' />} />;
  }
};

export default VideoPreview;
