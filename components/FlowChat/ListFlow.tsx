import { Popover } from '@headlessui/react';
import React, { FC, Fragment } from 'react';
import { GoKebabVertical } from 'react-icons/go';
import Transition from '../Common/Transition';
import tw from 'twin.macro';

const ListFlow: FC<{ data: any }> = ({ data }) => {
  console.log('list flow ', data);

  return (
    <>
      {data.length > 0 &&
        data.map((item: any, index: number) => {
          return (
            <div tw='rounded-sm bg-white p-1 pl-2 hover:bg-gray-100 flex items-center justify-between ' key={index}>
              <p tw='cursor-default'>{item.name}</p>
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
          );
        })}
    </>
  );
};

export default ListFlow;

const transitionProps = {
  enter: tw`transition ease-out duration-200`,
  enterFrom: tw`opacity-0 translate-y-1`,
  enterTo: tw`opacity-100 translate-y-0`,
  leave: tw`transition ease-in duration-150`,
  leaveFrom: tw`opacity-100 translate-y-0`,
  leaveTo: tw`opacity-0 translate-y-1`,
};
