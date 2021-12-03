import { Popover } from '@headlessui/react';
import React, { FC, Fragment } from 'react';
import { GoKebabVertical } from 'react-icons/go';
import Transition from '../Common/Transition';
import tw, { styled } from 'twin.macro';
import Button from '../Common/Button/Button';
import { useRecoilState } from 'recoil';
import { listFlowAtom } from '@/Recoil/Flow/ListFlow';
import { flowSelectedAtom } from '@/Recoil/Flow/SelectedFlow';

const ListFlow: FC<{ data: any }> = ({ data }) => {
  const [listFlow, setListFlow] = useRecoilState(listFlowAtom);
  const [selectedFlow, setSelectedFlow] = useRecoilState(flowSelectedAtom);
  const handleRemoveFlow = (flowId: number) => {
    let newListFlow = listFlow.filter((data: any) => data.id !== flowId);
    setListFlow(newListFlow);
  };
  const handleSelectedFlow = (flowName: string, flowId: number) => {
    setSelectedFlow({
      id: flowId,
      name: flowName,
    });
  };
  return (
    <>
      {data.length > 0 &&
        data.map((item: any, index: number) => {
          return (
            <ItemFlow select={selectedFlow.id === item.id} key={index} onClick={() => handleSelectedFlow(item.name, item.id)}>
              {console.log('true flase', selectedFlow.id === item.id)}
              {console.log('selectedFlow.id', selectedFlow.id)}
              {console.log('item.id', item.id)}
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
                              <Button type='button' size='small' variant='danger' tw='text-sm font-medium' onClick={() => handleRemoveFlow(item.id)}>
                                Delete
                              </Button>
                              <p>{item.id}</p>
                            </div>
                          </div>
                        </div>
                      </Popover.Panel>
                    </Transition>
                  </>
                )}
              </Popover>
            </ItemFlow>
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

type ItemFlowProps = {
  select: boolean;
};

const ItemFlow = styled.div(({ select }: ItemFlowProps) => [tw`rounded p-1 pl-2  flex items-center justify-between`, select ? tw`bg-blue-400 hover:(bg-blue-100 text-gray-700) text-white` : tw`bg-white hover:bg-gray-100`]);
