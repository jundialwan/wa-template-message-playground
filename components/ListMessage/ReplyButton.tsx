import { FC } from 'react';
import { useRecoilValue } from 'recoil';
import { allReplyButtonSelector, ReplyButtonIndex } from '../../Recoil/interactiveButton';

const ReplyButton: FC<{ order: ReplyButtonIndex }> = ({ order }) => {
  const allButtons = useRecoilValue(allReplyButtonSelector);
  const thisButton = allButtons[order];

  if (thisButton.enabled) {
    return <div className='w-full min-h-[20px] bg-white rounded-lg shadow z-10 px-2 py-2 font-sans text-center text-[#00A5F4] font-normal col-span-full'>{thisButton.text}</div>;
  } else {
    return null;
  }
};

export default ReplyButton;
