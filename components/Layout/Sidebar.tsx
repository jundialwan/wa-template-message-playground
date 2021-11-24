import React from 'react';
import Card from '../Common/Card';
import { SectionHeading } from '../LogiclessComponents';
import 'twin.macro';
import Button from '../Common/Button/Button';
import { GoKebabVertical } from 'react-icons/go';

const Sidebar = () => {
  return (
    <Card tw='col-span-2 border-solid border  md:h-full p-2'>
      <SectionHeading title='Flow' tw='mb-2' />
      <Button variant='primary' size='small' tw='w-full flex items-center justify-center mb-4'>
        + Add New
      </Button>
      <hr tw='mb-2 border-t border-gray-200' />
      <div tw='rounded-sm bg-white p-1 pl-2 hover:bg-gray-100 flex items-center justify-between '>
        <p tw='cursor-default'>Sapaan</p>
        <span tw='rounded-full'>
          <GoKebabVertical tw='h-3 w-3 cursor-pointer' />
        </span>
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

export default Sidebar;
