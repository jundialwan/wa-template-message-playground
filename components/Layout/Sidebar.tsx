import React, { Fragment, useRef, useState } from 'react';
import Card from '../Common/Card';
import { SectionHeading } from '../Common/LogiclessComponents';
import 'twin.macro';
import Button from '../Common/Button/Button';
import { GoKebabVertical } from 'react-icons/go';
import Transition from '../Common/Transition';
import { Dialog, Popover } from '@headlessui/react';
import tw from 'twin.macro';
import ListFlow from '../FlowChat/ListFlow';
import { useRecoilState } from 'recoil';
import { listFlowAtom } from '@/Recoil/Flow/ListFlow';

const Sidebar = () => {
  const [listFlow, setListFlow] = useRecoilState(listFlowAtom);
  let completeButtonRef = useRef(null);

  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }
  const [footerText, setFooterText] = useState('');

  const onTextChange = (e: any) => setFooterText(e.target.value);
  return (
    <Card tw='col-span-2 border-solid border  md:h-full p-2'>
      <SectionHeading title='Flow' tw='mb-2' />
      <Button variant='primary' size='small' tw='w-full flex items-center justify-center mb-4' onClick={openModal}>
        + Add New
      </Button>
      <Transition show={isOpen} as={Fragment}>
        <Dialog tw='fixed inset-0 z-10 overflow-y-auto' onClose={() => setIsOpen(false)} initialFocus={completeButtonRef}>
          <div tw='min-h-screen px-4 text-center'>
            <Transition.Child as='div' {...overlayTransitionProps}>
              <Dialog.Overlay tw='fixed inset-0 bg-black opacity-30' />
            </Transition.Child>
            <span tw='inline-block h-screen align-middle' aria-hidden='true'>
              &#8203;
            </span>
            <Transition.Child {...contentTransitionProps} as={Fragment}>
              <div tw='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl text-gray-900'>
                <>
                  <Dialog.Title as='h3' tw='text-lg font-medium leading-6 text-gray-900'>
                    Add New Flow
                  </Dialog.Title>
                  <Dialog.Description>
                    <label tw='block flex flex-col mt-4 mb-6'>
                      <span tw='text-gray-700'>Flow Name</span>
                      <input type='text' tw='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' placeholder='inser flow name' onChange={onTextChange} value={footerText} />
                    </label>
                  </Dialog.Description>

                  <div tw='mt-4 flex justify-end space-x-4'>
                    <Button type='button' size='default' variant='default' onClick={closeModal}>
                      Cancel
                    </Button>
                    <Button type='button' size='default' variant='primary' onClick={closeModal}>
                      Create
                    </Button>
                  </div>
                </>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <hr tw='mb-2 border-t border-gray-200' />
      <ListFlow data={listFlow} />
    </Card>
  );
};

const overlayTransitionProps = {
  enter: tw`ease-out duration-300`,
  enterFrom: tw`opacity-0`,
  enterTo: tw`opacity-100`,
  leave: tw`ease-in duration-200`,
  leaveFrom: tw`opacity-100`,
  leaveTo: tw`opacity-0`,
};

const contentTransitionProps = {
  enter: tw`ease-out duration-300`,
  enterFrom: tw`opacity-0 scale-95`,
  enterTo: tw`opacity-100 scale-100`,
  leave: tw`ease-in duration-200`,
  leaveFrom: tw`opacity-100 scale-100`,
  leaveTo: tw`opacity-0 scale-95`,
};

export default Sidebar;
