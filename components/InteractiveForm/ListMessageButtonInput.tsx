import { Switch } from '@chakra-ui/switch';
import { FC, useState } from 'react';
import { useRecoilState } from 'recoil';
import { interactiveButtonSelector } from '../../Recoil/interactiveButton';

type ListMessageIndex = 0 | 1 | 2 | 3 | 4;

const ListMessageButtonInput: FC<{ order: ListMessageIndex }> = ({ order }) => {
  const [thisButton, setThisButton] = useRecoilState(interactiveButtonSelector(order));
  const [message, setMessage] = useState('Haloo');
  const onToggleChange = (e: any) => setThisButton((curr) => ({ ...curr, enabled: e.target.checked }));
  const onButtonTextChange = (e: any) => setThisButton((curr) => ({ ...curr, title: e.target.value }));
  const onInteractiveContextChange = (e: any) => console.log('cta context change');
  console.log('ListMessageButtonInput', thisButton);
  return (
    <div className='flex flex-row items-center gap-1 mt-2'>
      <div className='gap-1'>
        <div className='flex flex-row gap-1 items-center justify-center border px-3 py-2 rounded-lg'>
          {/* active inactive */}
          <Switch isChecked={false} size='sm' colorScheme='teal' ringColor='#047857' onChange={onToggleChange} />

          <div className='flex flex-col'>
            <div className='flex flex-row items-center gap-1 font-semibold'>
              <span className='text-xs text-gray-500'>Title Text</span>
              <span className='text-xs'>({message.length}/20)</span>
            </div>
            {/* Title */}
            <input type='text' name={`cta-text-${order}`} id={`cta-text-${order}`} value={message} onChange={onButtonTextChange} className='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' />
          </div>
          <div className='flex flex-col'>
            <div className='flex flex-row items-center gap-1 font-semibold'>
              <span className='text-xs text-gray-500'>Subtitle Text</span>
              <span className='text-xs'>({message.length}/20)</span>
            </div>
            {/* Title */}
            <input type='text' name={`cta-text-${order}`} id={`cta-text-${order}`} value={message} onChange={onButtonTextChange} className='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListMessageButtonInput;
