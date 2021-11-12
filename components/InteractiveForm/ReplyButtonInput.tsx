import React, { FC, useState } from 'react';
import { Switch } from '@chakra-ui/react';

type ReplyButtonIndex = 0 | 1 | 2;

const ReplyButtonsInput: FC = () => {
  return (
    <div className='flex flex-col p-2 mt-2 gap-1'>
      <QuickReplyButtonInput order={0} />
      <QuickReplyButtonInput order={1} />
      <QuickReplyButtonInput order={2} />
    </div>
  );
};

const QuickReplyButtonInput: FC<{ order: ReplyButtonIndex }> = ({ order }) => {
  const [message, setMessage] = useState('halo');

  const onToggleChange = (e: any) => console.log('toggleChange');
  const onButtonTextChange = (e: any) => console.log('textchange');

  return (
    <div className='flex flex-row gap-1 items-center'>
      <Switch isDisabled={order === 0} isChecked={false} size='sm' colorScheme='teal' ringColor='#047857' onChange={onToggleChange} />
      <input type='text' name={`reply-${order}`} id={`reply-${order}`} placeholder={`Reply button ${order + 1}`} value={message} onChange={onButtonTextChange} className='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' />
      <span className='text-xs'>{message.length}/20</span>
    </div>
  );
};

export default ReplyButtonsInput;
