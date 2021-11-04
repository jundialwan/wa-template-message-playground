import { AspectRatio } from '@chakra-ui/layout';
import { FC } from 'react';
import { BsPlay } from 'react-icons/bs';
import { HeaderIllustration } from '../TemplateMessagePreview';

const VideoPreview: FC<{ headerPathVideo?: string }> = ({
  headerPathVideo,
}) => {
  if (headerPathVideo && headerPathVideo?.length > 1) {
    return (
      <AspectRatio
        ratio={16 / 9}
        position='relative'
        overflow='hidden'
        borderRadius='md'
      >
        <video className='w-full h-full' controls>
          <source src={headerPathVideo} type='video/mp4' />
        </video>
      </AspectRatio>
    );
  } else {
    return <HeaderIllustration ratio='16/9' iconBoxSize='16' icon={BsPlay} />;
  }
};

export default VideoPreview;
