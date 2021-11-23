import { Transition } from '@headlessui/react';
import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import tw, { styled, css, theme } from 'twin.macro';
import { overlayAtom } from '../Recoil/overlay';
import HeaderWhatsApp from './WhatsAppPreview/HeaderWhatsApp';

export const SectionHeading: FC<{ title: string } & React.HTMLAttributes<HTMLHeadingElement>> = ({ title, ...props }) => <Heading {...props}>{title}</Heading>;

const Heading = styled.h2`
  ${tw`font-semibold text-black`}
`;

export const SectionSubtitle: FC<{ subtitle: string }> = ({ subtitle }) => <p tw='text-xs mb-2 text-gray-500'>{subtitle}</p>;

const PreviewComponentContainer = styled.div`
  &::after {
    background: url('/bcg-wa.png');
    background-size: contain;
    content: '';
    height: 100%;
    width: 100%;
    position: absolute;
    opacity: 0.1;
    top: 0;
    z-index: -1;
  }

  & {
    z-index: 0;
  }

  & > * {
    z-index: 100;
  }
`;

export const PreviewComponent: FC = ({ children }) => {
  const isOpened = useRecoilValue(overlayAtom);
  return (
    <PreviewComponentContainer tw='relative flex-auto border-solid border shadow-sm rounded-sm bg-[#e5ddd5] '>
      <div tw='flex flex-col overflow-y-auto h-full'>
        <div tw='flex flex-col relative'>
          <Transition appear show={isOpened} tw='bg-black bg-opacity-40 top-0 left-0 right-0 bottom-0 absolute z-10'></Transition>
          <div tw='w-full flex justify-end items-center bg-whatsapp-500 py-1 px-2 space-x-1'>
            <svg width='20' height='16' viewBox='0 0 20 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path fillRule='evenodd' clipRule='evenodd' d='M0.977371 4.01593C3.48822 2.12256 6.61301 1 10 1C13.387 1 16.5118 2.12256 19.0226 4.01593L10 15L0.977371 4.01593Z' fill='white' />
            </svg>

            <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path fillRule='evenodd' clipRule='evenodd' d='M0 15H14V1L0 15Z' fill='white' />
            </svg>

            <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
              <path fillRule='evenodd' clipRule='evenodd' d='M9 1.875V1L6 1V1.875H3V15H12V1.875H9Z' fill='white' />
            </svg>
            <p tw='text-sm text-white font-semibold'>12:30</p>
          </div>
          <div tw='w-full flex items-center bg-whatsapp-600 pt-2 pb-3 px-2'>
            <HeaderWhatsApp />
            <svg width='12' height='24' viewBox='0 0 12 24' fill='none' tw='ml-auto mr-2' xmlns='http://www.w3.org/2000/svg'>
              <path fillRule='evenodd' clipRule='evenodd' d='M6 8C7.1 8 8 7.1 8 6C8 4.9 7.1 4 6 4C4.9 4 4 4.9 4 6C4 7.1 4.9 8 6 8ZM6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM6 16C4.9 16 4 16.9 4 18C4 19.1 4.9 20 6 20C7.1 20 8 19.1 8 18C8 16.9 7.1 16 6 16Z' fill='white' />
            </svg>
          </div>
        </div>
        <div tw='h-full overflow-y-auto relative max-h-[900px]'>
          <div tw='flex w-full'>
            <label htmlFor='' tw='my-3 mx-auto bg-ocean-100 shadow-day-bubble px-3  py-2 text-gray-600 uppercase font-semibold rounded-md'>
              Today
            </label>
          </div>
          <div tw=' p-2 h-auto'>{children}</div>
        </div>
      </div>
    </PreviewComponentContainer>
  );
};
