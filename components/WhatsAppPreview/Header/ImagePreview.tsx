import { FC } from 'react';
import AspectRatio from 'react-aspect-ratio';
import { BsImage } from 'react-icons/bs';
import { HeaderIllustration } from '../../TemplateMessagePreview';

const ImagePreview: FC<{ headerPathImage?: string }> = ({ headerPathImage }) => {
  if (headerPathImage && headerPathImage?.length > 1) {
    return (
      <AspectRatio ratio={16 / 9} tw='relative rounded-md overflow-hidden'>
        <img src={headerPathImage} alt='image' tw='absolute w-full h-full object-cover' />
      </AspectRatio>
    );
  } else {
    return <HeaderIllustration ratio='16/9' iconBoxSize='16' icon={BsImage} />;
  }
};

export default ImagePreview;
