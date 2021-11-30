import React, { useState } from 'react';
import Button from '../Common/Button/Button';
import Modal from '../Common/Modal';
import 'twin.macro';
import { listFlowAtom } from '@/Recoil/Flow/ListFlow';
import { useRecoilState } from 'recoil';

const AddFlow = () => {
  const [listFlow, setListFlow] = useRecoilState(listFlowAtom);
  const [footerText, setFooterText] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const onTextChange = (e: any) => setFooterText(e.target.value);
  const handleSubmit = () => {
    setListFlow([
      ...listFlow,
      {
        id: listFlow.length + 1,
        name: footerText,
      },
    ]);
    setIsOpen(!isOpen);
  };
  return (
    <div>
      <Button type='button' onClick={() => setIsOpen(!isOpen)} variant='primary' size='small' tw='w-full flex justify-center'>
        + Add Flow
      </Button>
      <Modal
        contentProps={{
          title: 'Add Flow Chatbot',
          content: (
            <label tw='block flex flex-col mt-4 mb-6'>
              <span tw='text-gray-700 mb-2'>Flow Name</span>
              <input type='text' tw='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' placeholder='inser flow name' onChange={onTextChange} value={footerText} />
            </label>
          ),
          footer: (
            <Button type='button' onClick={handleSubmit} variant='primary' size='small' tw='ml-auto'>
              Submit
            </Button>
          ),
        }}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
    </div>
  );
};

export default AddFlow;
