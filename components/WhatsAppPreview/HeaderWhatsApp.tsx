import React from 'react';
import { useRecoilValue } from 'recoil';
import { companyNameSelector } from '../../Recoil/biodata/company';
import { companyImageSelector } from '../../Recoil/biodata/companyImg';

const HeaderWhatsApp = () => {
  const companyName = useRecoilValue(companyNameSelector);
  const companyImage = useRecoilValue(companyImageSelector);
  return (
    <div className='flex w-auto items-center'>
      <svg width='24' height='24' className='mr-2' viewBox='0 0 24 24' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path fillRule='evenodd' clipRule='evenodd' d='M20 11H7.8L13.4 5.4L12 4L4 12L12 20L13.4 18.6L7.8 13H20V11Z' fill='white' />
      </svg>
      <div className='h-9 w-9 overflow-hidden rounded-full mr-3'>
        <img src={companyImage} className='w-full h-full object-cover' alt={companyName} />
      </div>

      <h6 className='font-bold text-white capitalize mr-2 text-lg'>{companyName}</h6>
      <img src='/ornament/whatsapp-checklist.png' className='h-4 w-4' alt='' />
    </div>
  );
};

export default HeaderWhatsApp;
