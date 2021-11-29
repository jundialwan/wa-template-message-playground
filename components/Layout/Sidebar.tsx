import React, { Fragment, useState } from 'react';
import Card from '../Common/Card';
import { SectionHeading } from '../Common/LogiclessComponents';
import 'twin.macro';
import Button from '../Common/Button/Button';
import { GoKebabVertical } from 'react-icons/go';
import Transition from '../Common/Transition';
import { Dialog, Popover } from '@headlessui/react';
import tw from 'twin.macro';
const Sidebar = () => {
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
  }

  function openModal() {
    setIsOpen(true);
  }

  return (
    <Card tw='col-span-2 border-solid border  md:h-full p-2'>
      <SectionHeading title='Flow' tw='mb-2' />
      <Button variant='primary' size='small' tw='w-full flex items-center justify-center mb-4' onClick={openModal}>
        + Add New
      </Button>
      <Transition show={isOpen} as={Fragment}>
        <Dialog tw='fixed inset-0 z-10 overflow-y-auto' onClose={closeModal}>
          <div tw='min-h-screen px-4 text-center'>
            <Transition.Child as='div' {...overlayTransitionProps}>
              <Dialog.Overlay tw='fixed inset-0 bg-black opacity-30' />
            </Transition.Child>
            <span tw='inline-block h-screen align-middle' aria-hidden='true'>
              &#8203;
            </span>
            <Transition.Child {...contentTransitionProps} as={Fragment}>
              <div tw='inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl text-gray-900'>
                <Fragment>
                  <Dialog.Title as='h3' tw='text-lg font-medium leading-6 text-gray-900'>
                    Add New Flow
                  </Dialog.Title>
                  <Dialog.Description>
                    <label tw='block flex flex-col mt-4 mb-6'>
                      <span tw='text-gray-700'>Flow Name</span>
                      <input type='text' tw='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' placeholder='' />
                    </label>
                  </Dialog.Description>

                  <div tw='mt-4 flex justify-end'>
                    <Button type='button' size='default' tw=' text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:(ring-2 ring-offset-2 ring-blue-500)' onClick={closeModal}>
                      Create
                    </Button>
                  </div>
                </Fragment>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
      <hr tw='mb-2 border-t border-gray-200' />
      <div tw='rounded-sm bg-white p-1 pl-2 hover:bg-gray-100 flex items-center justify-between '>
        <p tw='cursor-default'>Sapaan</p>
        <Popover tw='relative'>
          {({ open }) => (
            <>
              <Popover.Button tw='rounded-full' css={[tw`rounded-full`, !open && tw`text-opacity-90`]}>
                <GoKebabVertical tw='h-3 w-3 cursor-pointer' />
              </Popover.Button>
              <Transition as={Fragment} {...transitionProps}>
                <Popover.Panel tw='absolute z-10'>
                  <div tw='overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5'>
                    <div tw='relative bg-white px-3 py-4'>
                      <div tw='grid gap-3'>
                        <p tw='text-sm font-medium text-gray-900'>Delete</p>
                        <p tw='text-sm font-medium text-gray-900'>Duplicate</p>
                      </div>
                    </div>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </div>
      <div tw='rounded-sm bg-white p-1 pl-2 hover:bg-gray-100 flex items-center justify-between '>
        <p tw='cursor-default'>Checkout</p>
        <span tw='rounded-full'>
          <GoKebabVertical tw='h-3 w-3 cursor-pointer' />
        </span>
      </div>
      <div tw='rounded-sm bg-white p-1 pl-2 hover:bg-gray-100 flex items-center justify-between '>
        <p tw='cursor-default'>Beli Pulsa</p>
        <span tw='rounded-full'>
          <GoKebabVertical tw='h-3 w-3 cursor-pointer' />
        </span>
      </div>
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

const transitionProps = {
  enter: tw`transition ease-out duration-200`,
  enterFrom: tw`opacity-0 translate-y-1`,
  enterTo: tw`opacity-100 translate-y-0`,
  leave: tw`transition ease-in duration-150`,
  leaveFrom: tw`opacity-100 translate-y-0`,
  leaveTo: tw`opacity-0 translate-y-1`,
};

export default Sidebar;
