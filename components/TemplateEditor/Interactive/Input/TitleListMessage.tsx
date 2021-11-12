import { FC, useState } from 'react';
import { useRecoilState } from 'recoil';
import { titleInteractiveButtonsTypeSelector } from '../../../../Recoil/interactiveButton';

const TitleListMessage: FC = () => {
  const [titleMessage, setTitleMessage] = useRecoilState(titleInteractiveButtonsTypeSelector);

  const onButtonTextChange = (e: any) => setTitleMessage(e.target.value);
  return (
    <div className='flex flex-col'>
      <div className='flex flex-col'>
        <div className='flex flex-row items-center gap-1 font-semibold'>
          <span className='text-xs text-gray-500'>Title Text</span>
          <span className='text-xs'>({titleMessage.length}/20)</span>
        </div>
        {/* Header */}
        <input type='text' name={`cta-text-`} id={`cta-text-`} value={titleMessage} onChange={onButtonTextChange} className='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' />
      </div>
    </div>
  );
};

export default TitleListMessage;
