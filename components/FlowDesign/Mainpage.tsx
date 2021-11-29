import React, { Fragment, useState } from 'react';
import Card from '../Common/Card';
import tw, { styled } from 'twin.macro';
import { Dialog, Disclosure } from '@headlessui/react';
import { BiChevronUp } from 'react-icons/bi';
import Transition from '../Common/Transition';
import TemplateEditor from '../TemplateEditor';
import { SectionHeading, SectionSubtitle } from '../Common/LogiclessComponents';
import CompanyImage from '../Company/CompanyImage';
import CompanyName from '../Company/CompanyName';
import Button from '../Common/Button/Button';
import ListChat from '../Chat/ListChat/ListChat';

const Mainpage = () => {
  return (
    <Card tw='col-span-7 flex flex-col md:h-[95%] gap-1 overflow-auto'>
      <SectionHeading title='Flow Design' tw='mb-2' />
      <Disclosure>
        {({ open }) => (
          <div>
            <Disclosure.Button tw='flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:(ring ring-purple-500 ring-opacity-75)'>
              <span>Brand</span>
              <BiChevronUpStyled open={open} />
            </Disclosure.Button>
            <Transition show={open} {...transitionProps}>
              <Disclosure.Panel static tw='px-4 pt-4 pb-2 text-sm text-gray-500'>
                <div tw='flex-none border-solid border shadow-sm rounded-sm bg-white p-2'>
                  <SectionHeading title='Image Company' />
                  <SectionSubtitle subtitle='Choose Image Company' />
                  <CompanyImage />
                </div>
                <div tw='flex-none border-solid border shadow-sm rounded-sm bg-white p-2'>
                  <SectionHeading title='Name Company' />
                  <SectionSubtitle subtitle='Write Name Company' />
                  <CompanyName />
                </div>
              </Disclosure.Panel>
            </Transition>
          </div>
        )}
      </Disclosure>
      <Button variant='primary' size='small' tw='w-full flex items-center justify-center mb-4'>
        + Add New
      </Button>
      <ListChat />
      <TemplateEditor />
    </Card>
  );
};

export default Mainpage;

const transitionProps = {
  enter: tw`transition ease-out duration-100`,
  enterFrom: tw`transform opacity-0 scale-95`,
  enterTo: tw`transform opacity-100 scale-100`,
  leave: tw`transition ease-out duration-75`,
  leaveFrom: tw`transform opacity-100 scale-100`,
  leaveTo: tw`transform opacity-0 scale-95`,
};

interface BiChevronUpStyledProps {
  open: boolean;
}

export const BiChevronUpStyled = styled(BiChevronUp)(({ open }: BiChevronUpStyledProps) => [tw`w-5 h-5 text-purple-500`, open && tw`transform rotate-180`]);
