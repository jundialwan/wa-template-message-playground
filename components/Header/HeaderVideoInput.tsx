import { AspectRatio } from '@chakra-ui/layout';
import { FC } from 'react';
import { useRecoilState } from 'recoil';
import { headerVideoSelector } from '../../Recoil/header';

const HeaderVideoInput: FC<{ value?: string }> = ({ value }) => {
  const [headerPathVideo, setHeaderVideoPath] =
    useRecoilState(headerVideoSelector);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;
    const file = e.target.files[0];
    setHeaderVideoPath(URL.createObjectURL(file));
  };
  return (
    <div className='mt-2 flex flex-col items-start'>
      <span>Header Video</span>
      {headerPathVideo?.length > 1 ? (
        <div className='flex w-full items-start mt-4'>
          <div className='w-7/12'>
            <AspectRatio maxW='400px' ratio={4 / 3}>
              <video className='w-full h-full' controls>
                <source src={headerPathVideo} type='video/mp4' />
              </video>
            </AspectRatio>
          </div>
          <button
            type='button'
            onClick={() => setHeaderVideoPath('')}
            className=' flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white transition-all text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  w-8 h-8 rounded-lg '
          >
            <svg
              className='w-4 h-5'
              fill='none'
              stroke='currentColor'
              viewBox='0 0 24 24'
              xmlns='http://www.w3.org/2000/svg'
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                strokeWidth={2}
                d='M6 18L18 6M6 6l12 12'
              />
            </svg>
          </button>
        </div>
      ) : (
        <label
          htmlFor='upload-file'
          className='py-2 mt-1 px-4 flex justify-center items-center  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white  transition-all text-center text-sm font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  rounded-lg cursor-pointer'
        >
          <svg
            fill='currentColor'
            className='mr-2 h-4 w-4'
            viewBox='0 0 1792 1792'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path d='M1344 1472q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm256 0q0-26-19-45t-45-19-45 19-19 45 19 45 45 19 45-19 19-45zm128-224v320q0 40-28 68t-68 28h-1472q-40 0-68-28t-28-68v-320q0-40 28-68t68-28h427q21 56 70.5 92t110.5 36h256q61 0 110.5-36t70.5-92h427q40 0 68 28t28 68zm-325-648q-17 40-59 40h-256v448q0 26-19 45t-45 19h-256q-26 0-45-19t-19-45v-448h-256q-42 0-59-40-17-39 14-69l448-448q18-19 45-19t45 19l448 448q31 30 14 69z'></path>
          </svg>
          Upload
          <input
            accept='video/*'
            id='upload-file'
            type='file'
            onChange={handleChange}
            className='hidden'
          />
        </label>
      )}
      <label className='block'>
        <input
          type='text'
          className='mt-1 block w-full'
          placeholder='path image'
          onChange={(e) => setHeaderVideoPath(e.target.value)}
          value={headerPathVideo}
        />
      </label>
    </div>
  );
};

export default HeaderVideoInput;
