import AspectRatio from 'react-aspect-ratio';
import { FC, useState } from 'react';
import { useRecoilState } from 'recoil';
import { headerImageSelector } from '../../../Recoil/header';
import { listMessageAtom } from '../../../Recoil/listMessage';
import tw, { styled, css, theme } from 'twin.macro';

const HeaderVideoInput: FC<{ messageId: number; headerVideoPath: string }> = ({ messageId, headerVideoPath }) => {
  // const [headerPathImage, setHeaderPathVideo] =
  //   useRecoilState(headerImageSelector);
  const [listMessage, setListMessage] = useRecoilState(listMessageAtom);
  const [headerPathVideo, setHeaderPathVideo] = useState(headerVideoPath);

  const handleHeaderVideoChange = (event: any, listId: any) => {
    setHeaderPathVideo(event.target.value);
    let newlistMessage = listMessage.map((data: any) => {
      return {
        ...data,
        header: {
          ...data.header,
          video: {
            ...data.header.video,
            path: data.id === listId ? event?.target?.value : data.header.video.path,
          },
        },
      };
    });
    setListMessage(newlistMessage);
  };
  const handleHeaderVideoUploadChange = (event: any, listId: any) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setHeaderPathVideo(URL.createObjectURL(file));
    let newlistMessage = listMessage.map((data: any) => {
      return {
        ...data,
        header: {
          ...data.header,
          video: {
            ...data.header.video,
            path: data.id === listId ? URL.createObjectURL(file) : data.header.video.path,
          },
        },
      };
    });
    setListMessage(newlistMessage);
  };
  const handleRemoveChange = (listId: any) => {
    setHeaderPathVideo('');
    let newlistMessage = listMessage.map((data: any) => {
      return {
        ...data,
        header: {
          ...data.header,
          video: {
            ...data.header.video,
            path: data.id === listId ? '' : data.header.video.path,
          },
        },
      };
    });
    setListMessage(newlistMessage);
  };

  return (
    <div tw='mt-2 flex flex-col items-start'>
      <span>Header Video</span>
      {headerVideoPath?.length > 1 ? (
        <div tw='flex w-full items-start mt-4'>
          <div tw='w-7/12'>
            <AspectRatio tw='max-w-[400px]' ratio={4 / 3}>
              <video tw='w-full h-full' controls>
                <source src={headerVideoPath} type='video/mp4' />
              </video>
            </AspectRatio>
          </div>
          <button type='button' onClick={() => handleRemoveChange(messageId)} tw=' flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition-all text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  w-8 h-8 rounded-lg '>
            <svg tw='w-4 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'>
              <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M6 18L18 6M6 6l12 12' />
            </svg>
          </button>
        </div>
      ) : (
        <label htmlFor='upload-file' tw='py-2 mt-1 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white  transition-all text-center text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg cursor-pointer'>
          <svg fill='currentColor' tw='mr-2 h-4 w-4' viewBox='0 0 1792 1792' xmlns='http://www.w3.org/2000/svg'>
            <path d='M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z'></path>
          </svg>
          Upload
          <input accept='video/*' id='upload-file' type='file' onChange={(e) => handleHeaderVideoUploadChange(e, messageId)} tw='hidden' />
        </label>
      )}
      <label tw='block'>
        <input type='text' tw='mt-1 block w-full' placeholder='path video' onChange={(e) => handleHeaderVideoChange(e, messageId)} value={headerPathVideo} />
      </label>
    </div>
  );
};

export default HeaderVideoInput;
