import AspectRatio from 'react-aspect-ratio';
import { FC, useState } from 'react';
import { useRecoilState } from 'recoil';
import { headerImageSelector } from '../../../Recoil/header';
import { listMessageAtom } from '../../../Recoil/listMessage';

const HeaderImageInput: FC<{ messageId: number; headerImagePath: string }> = ({ messageId, headerImagePath }) => {
  // const [headerPathImage, setHeaderPathImage] =
  //   useRecoilState(headerImageSelector);
  const [listMessage, setListMessage] = useRecoilState(listMessageAtom);
  const [headerPathImage, setHeaderPathImage] = useState(headerImagePath);

  // console.log('headerPathImage?.length > 0 ', headerPathImage?.length > 0);
  const handleHeaderImageChange = (event: any, listId: any) => {
    setHeaderPathImage(event.target.value);
    let newlistMessage = listMessage.map((data: any) => {
      return {
        ...data,
        header: {
          ...data.header,
          image: {
            ...data.header.image,
            path: data.id === listId ? event?.target?.value : data.header.image.path,
          },
        },
      };
    });
    setListMessage(newlistMessage);
  };
  const handleHeaderImageUploadChange = (event: any, listId: any) => {
    if (!event.target.files) return;
    const file = event.target.files[0];
    setHeaderPathImage(URL.createObjectURL(file));
    let newlistMessage = listMessage.map((data: any) => {
      return {
        ...data,
        header: {
          ...data.header,
          image: {
            ...data.header.image,
            path: data.id === listId ? URL.createObjectURL(file) : data.header.image.path,
          },
        },
      };
    });
    setListMessage(newlistMessage);
  };
  const handleRemoveChange = (listId: any) => {
    // setHeaderPathImage(event.target.value);
    let newlistMessage = listMessage.map((data: any) => {
      return {
        ...data,
        header: {
          ...data.header,
          image: {
            ...data.header.image,
            path: data.id === listId ? '' : data.header.image.path,
          },
        },
      };
    });
    setListMessage(newlistMessage);
  };

  return (
    <div tw='mt-2 flex flex-col items-start'>
      <span>Header Image</span>
      {headerImagePath?.length > 1 ? (
        <div tw='flex w-full items-start mt-4'>
          <div tw='w-7/12'>
            <AspectRatio maxW='400px' ratio={4 / 3}>
              <img src={headerImagePath} alt='Image Bot' tw='w-full h-full' />
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
          <input accept='image/*' id='upload-file' type='file' onChange={(e) => handleHeaderImageUploadChange(e, messageId)} tw='hidden' />
        </label>
      )}
      <label tw='block'>
        <input type='text' tw='mt-1 block w-full' placeholder='path image' onChange={(e) => handleHeaderImageChange(e, messageId)} value={headerPathImage} />
      </label>
    </div>
  );
};

export default HeaderImageInput;
