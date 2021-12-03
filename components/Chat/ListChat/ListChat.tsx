import { Disclosure } from '@headlessui/react';
import React from 'react';
import Transition from '../../Common/Transition';
import { SectionHeading, SectionSubtitle } from '../../Common/LogiclessComponents';
import tw from 'twin.macro';
import { BiChevronUpStyled } from '../../FlowDesign/Mainpage';
import SenderForm from '../../Sender/SenderForm';
import BodyForm from '../../BodyForm';
import HeaderForm from '../Form/Brand/PushMessage/Header/HeaderForm';
import { useRecoilState, useRecoilValue } from 'recoil';
import { senderTypeSelector } from '@/Recoil/senderText';
import ContextBot from '../Form/User/ContextBot';
import MessageType from '../Form/Brand/MessageType';
import PushMessage from '../Form/Brand/PushMessage';
import ChatbotMessage from '../Form/Brand/ChatbotMessage';
import { messageTypeSelector } from '@/Recoil/messageType';
import SenderTypeInput from '../Form/SenderTypeInput';
import { listFlowAtom } from '@/Recoil/Flow/ListFlow';
import { flowSelectedAtom } from '@/Recoil/Flow/SelectedFlow';
const ListChat = () => {
  const senderType = useRecoilValue(senderTypeSelector);
  const messageType = useRecoilValue(messageTypeSelector);
  const selectedFlow = useRecoilValue(flowSelectedAtom);
  const [listFlow, setListFlow] = useRecoilState(listFlowAtom);
  console.log('ListFlow ', listFlow);
  console.log('selectedFlow ', selectedFlow);
  console.log('Choose List ', listFlow[selectedFlow.id - 1]);
  return (
    <div tw='flex flex-col w-full'>
      <Disclosure>
        {({ open }) => (
          <div>
            <Disclosure.Button tw='flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:(ring ring-purple-500 ring-opacity-75)'>
              <span>Chat Form</span>
              <BiChevronUpStyled open={open} />
            </Disclosure.Button>
            <Transition show={open} {...transitionProps}>
              <Disclosure.Panel static tw='pt-4 pb-2 text-sm text-gray-500 rounded-lg divide-y-2'>
                <div tw='flex-none  shadow-sm rounded-sm bg-white p-2'>
                  <SectionHeading title='Type User' />
                  <SectionSubtitle subtitle='Choose between user and brand' />
                  <SenderTypeInput />
                </div>
                {senderType === 'brand' ? (
                  <>
                    <div tw='flex-none shadow-sm rounded-sm bg-white p-2'>
                      <MessageType />
                    </div>
                    <div tw='flex-none shadow-sm rounded-sm bg-white p-2'>{messageType === 'pushMessage' ? <PushMessage /> : <ChatbotMessage />}</div>
                  </>
                ) : (
                  <div tw='flex-none  shadow-sm rounded-sm bg-white p-2'>
                    <div tw='flex-none shadow-sm rounded-sm bg-white p-2'>
                      <SectionHeading title='Header (optional)' />
                      <SectionSubtitle subtitle="Choose which type of media you'll use for this header" />
                      <HeaderForm />
                    </div>
                    <SectionHeading title='Body' />
                    <SectionSubtitle subtitle='Enter the text for your message. Parameter format: {{1}}, {{2}}, and so on.' />
                    <BodyForm />
                    <div tw='mt-8' />
                    <SectionSubtitle subtitle='Select context from previous bot (optional)' />
                    <ContextBot />
                  </div>
                )}
              </Disclosure.Panel>
            </Transition>
          </div>
        )}
      </Disclosure>
    </div>
  );
};

const transitionProps = {
  enter: tw`transition ease-out duration-100 translate-y-0`,
  enterFrom: tw`transform opacity-0 scale-95 translate-y-1/4`,
  enterTo: tw`transform opacity-100 scale-100 translate-y-0`,
  leave: tw`transition ease-out duration-75 translate-y-1/4`,
  leaveFrom: tw`transform opacity-100 scale-100 translate-y-0`,
  leaveTo: tw`transform opacity-0 scale-95 translate-y-1/4`,
};

export default ListChat;
