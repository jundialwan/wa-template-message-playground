import { FC } from 'react';
import styled from 'styled-components';
import HeaderWhatsApp from './WhatsAppPreview/HeaderWhatsApp';

export const SectionHeading: FC<{ title: string } & React.HTMLAttributes<HTMLHeadingElement>> = ({ title, className, ...props }) => (
  <h2 className={`font-semibold text-black ${className}`} {...props}>
    {title}
  </h2>
);

export const SectionSubtitle: FC<{ subtitle: string }> = ({ subtitle }) => <p className='text-xs mb-2 text-gray-500'>{subtitle}</p>;

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
  return (
    <PreviewComponentContainer className='relative flex-auto border-solid border-1 shadow-sm rounded-sm bg-[#e5ddd5]'>
      <div className='flex flex-col'>
        <div className='w-full flex justify-end items-center bg-whatsapp-500 py-1 px-2 space-x-1'>
          <svg width='20' height='16' viewBox='0 0 20 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path fillRule='evenodd' clipRule='evenodd' d='M0.977371 4.01593C3.48822 2.12256 6.61301 1 10 1C13.387 1 16.5118 2.12256 19.0226 4.01593L10 15L0.977371 4.01593Z' fill='white' />
          </svg>

          <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path fillRule='evenodd' clipRule='evenodd' d='M0 15H14V1L0 15Z' fill='white' />
          </svg>

          <svg width='16' height='16' viewBox='0 0 16 16' fill='none' xmlns='http://www.w3.org/2000/svg'>
            <path fillRule='evenodd' clipRule='evenodd' d='M9 1.875V1L6 1V1.875H3V15H12V1.875H9Z' fill='white' />
          </svg>
          <p className='text-sm text-white font-semibold'>12:30</p>
        </div>
        <div className='w-full flex items-center bg-whatsapp-600 pt-2 pb-3 px-2'>
          <HeaderWhatsApp />
          <svg width='12' height='24' viewBox='0 0 12 24' fill='none' className='ml-auto mr-2' xmlns='http://www.w3.org/2000/svg'>
            <path fillRule='evenodd' clipRule='evenodd' d='M6 8C7.1 8 8 7.1 8 6C8 4.9 7.1 4 6 4C4.9 4 4 4.9 4 6C4 7.1 4.9 8 6 8ZM6 10C4.9 10 4 10.9 4 12C4 13.1 4.9 14 6 14C7.1 14 8 13.1 8 12C8 10.9 7.1 10 6 10ZM6 16C4.9 16 4 16.9 4 18C4 19.1 4.9 20 6 20C7.1 20 8 19.1 8 18C8 16.9 7.1 16 6 16Z' fill='white' />
          </svg>
        </div>
        <div className='flex w-full'>
          <label htmlFor='' className='my-3 mx-auto bg-ocean-100 shadow-day-bubble px-3  py-2 text-gray-600 uppercase font-semibold rounded-md'>
            Today
          </label>
        </div>
        <div className='relative p-2 h-full'>{children}</div>
      </div>
    </PreviewComponentContainer>
  );
};
