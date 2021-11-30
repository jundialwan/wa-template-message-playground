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
import AddFlow from '../FlowChat/AddFlow';

const Sidebar = () => {
  const [listFlow, setListFlow] = useRecoilState(listFlowAtom);
  return (
    <Card tw='col-span-2 border-solid border  md:h-full p-2'>
      <SectionHeading title='Flow' tw='mb-2' />
      <AddFlow />
      <hr tw='mb-2 border-t border-gray-200' />
      <ListFlow data={listFlow} />
    </Card>
  );
};

export default Sidebar;
