import React, { FC, Fragment, useEffect, useState } from 'react';
// import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react';
import { Disclosure } from '@headlessui/react';
import tw, { styled, css, theme } from 'twin.macro';

import { SectionHeading, SectionSubtitle } from '../Common/LogiclessComponents';
import HeaderForm from './Header/HeaderForm';
import BodyForm from './Body/BodyForm';
import FooterForm from './Footer/FooterForm';
import ButtonsForm from './Footer/ButtonsForm';
import { useRecoilState, useRecoilValue } from 'recoil';
import { listMessageAtom } from '../../Recoil/listMessage';
import SenderForm from './Sender/SenderForm';
import InteractiveForm from './Interactive/InteractiveForm';
import { BsChevronUp } from 'react-icons/bs';
import Transition from '../Common/Transition';

const TemplateEditor: FC = () => {
  // const listMessage = useRecoilValue(listMessageAtom);
  const [listMessage, setListMessage] = useRecoilState(listMessageAtom);
  const [activeQuestionIndex, setActiveQuestionIndex] = useState<number | null>(null);

  // const [bodyText, setBodyText] = useRecoilState(bodyTextEditorAtom);
  const [bodyText, setBodyText] = useState('');
  console.log('List Message Template Editor', listMessage);
  useEffect(() => {}, [listMessage, bodyText]);
  const handleSenderTypeChange = (event: any, listId: any) => {
    let newlistMessage = listMessage.map((data: any) => {
      let newData = { ...data };
      if (data.id === listId) {
        newData.sender = event.target.value;
      }
      return newData;
    });
    setListMessage(newlistMessage);
  };
  const handleHeaderTypeChange = (event: any, listId: any) => {
    setBodyText(event?.target?.value);
    let newlistMessage = listMessage.map((data: any) => {
      return {
        ...data,
        header: {
          ...data.header,
          type: data.id === listId ? event?.target?.value : data.header.type,
        },
      };
    });
    setListMessage(newlistMessage);
  };
  const handleBodyTextChange = (event: any, listId: any) => {
    let newlistMessage = listMessage.map((data: any) => {
      return {
        ...data,
        body: {
          ...data.header,
          text: data.id === listId ? event?.target?.value.substring(0, 1024) : data.body.text,
        },
      };
    });
    setListMessage(newlistMessage);
  };
  const handleFooterTextChange = (event: any, listId: any) => {
    let newlistMessage = listMessage.map((data: any) => {
      return {
        ...data,
        footer: {
          ...data.footer,
          text: data.id === listId ? event?.target?.value.substring(0, 60) : data.footer.text,
        },
      };
    });
    setListMessage(newlistMessage);
  };
  const handleFooterBtnTypeChange = (event: any, listId: any) => {
    // setBodyText(event?.target?.value);
    let newlistMessage = listMessage.map((data: any) => {
      return {
        ...data,
        footer: {
          ...data.footer,
          button: {
            ...data.footer.button,
            type: data.id === listId ? event?.target?.value : data.footer.button.type,
          },
        },
      };
    });
    setListMessage(newlistMessage);
  };
  const handleInteractiveBtnTypeChange = (event: any, listId: any) => {
    let newlistMessage = listMessage.map((data: any) => {
      return {
        ...data,
        interactive: {
          ...data.interactive,
          type: data.id === listId ? event?.target?.value : data.interactive.type,
        },
      };
    });
    setListMessage(newlistMessage);
    console.log('Event type interactive ', event?.target?.value);
  };
  const handleRemoveMessage = (listId: any) => {
    let newlistMessage = listMessage.filter((data: any) => data.id !== listId);
    setListMessage(newlistMessage);
  };

  const toggleQuestion = (questionIndex: number) => {
    if (activeQuestionIndex === questionIndex) setActiveQuestionIndex(null);
    else setActiveQuestionIndex(questionIndex);
  };
  return (
    <>
      {listMessage.length > 0 &&
        listMessage.map((message: any, index: number) => {
          return (
            <Disclosure key={index}>
              {({ open }: any) => (
                <>
                  <Disclosure.Button key={index} tw='flex justify-between w-full px-4 py-2 text-sm font-medium text-left text-purple-900 bg-purple-100 rounded-lg hover:bg-purple-200 focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75'>
                    <span>
                      {' '}
                      {message.sender} - {index + 1}
                    </span>
                    <BsChevronUpStyled open={open} />
                  </Disclosure.Button>
                  <Transition show={open} as={Fragment} {...transitionProps}>
                    <Disclosure.Panel static tw='px-1 py-2 text-sm text-gray-500 bg-gray-300'>
                      <div tw='flex-none border-solid border shadow-sm rounded-sm bg-white p-2 relative'>
                        <SectionHeading title='Type User' />
                        <SectionSubtitle subtitle='Choose between user and bot' />
                        <SenderForm senderType={message.sender} onSenderTypeChange={(event) => handleSenderTypeChange(event, message.id)} messageId={message.id} />
                        <button tw='absolute top-2 right-2 bg-red-600 text-red-100 px-6 rounded-md py-2 text-sm transition-all hover:opacity-70' onClick={() => handleRemoveMessage(message.id)}>
                          Delete
                        </button>
                      </div>
                      <div tw='flex-none border-solid border shadow-sm rounded-sm bg-white p-2'>
                        <SectionHeading title='Header (optional)' />
                        <SectionSubtitle subtitle="Choose which type of media you'll use for this header" />
                        <HeaderForm headerType={message.header.type} headerText={message.header.text} messageId={message.id} onHeaderTypeChange={(event) => handleHeaderTypeChange(event, message.id)} headerImagePath={message.header.image.path} headerVideoPath={message.header.video.path} />
                      </div>
                      <div tw='flex-none border-solid border shadow-sm rounded-sm bg-white p-2'>
                        <SectionHeading title='Body' />
                        <SectionSubtitle subtitle='Enter the text for your message. Parameter format: {{1}}, {{2}}, and so on.' />
                        <BodyForm bodyText={message.body.text} messageId={message.id} onBodyTextChange={(event) => handleBodyTextChange(event, message.id)} />
                      </div>
                      <div tw='flex-none border-solid border shadow-sm rounded-sm bg-white p-2'>
                        <SectionHeading title='Footer (optional)' />
                        <SectionSubtitle subtitle='Add a short line of text to the bottom of your message. Max: 60 chars.' />
                        <FooterForm footerText={message.footer.text} messageId={message.id} onFooterTextChange={(event) => handleFooterTextChange(event, message.id)} />
                      </div>

                      <div tw='border-solid border shadow-sm rounded-sm bg-white p-2'>
                        <SectionHeading title='Buttons (optional)' />
                        <SectionSubtitle subtitle="Create buttons that let customers respond to your message. Available: 'Call to action' and 'Quick Reply' button." />
                        <ButtonsForm buttonType={message.footer.button.type} onButtonTypeChange={(event) => handleFooterBtnTypeChange(event, message.id)} buttonCta={message.footer.button.cta} buttonReply={message.footer.button.reply} messageId={message.id} />
                      </div>
                      <div tw='border-solid border shadow-sm rounded-sm bg-white p-2'>
                        <SectionHeading title='Interactive Message (optional)' />
                        <SectionSubtitle subtitle="Create interactive message that let customers respond to your message. Available: 'List Message' and 'Reply Button' button." />

                        <InteractiveForm buttonType={message.interactive.type} onButtonTypeChange={(event) => handleInteractiveBtnTypeChange(event, message.id)} messageId={message.id} titleInteractive={message.interactive.title} interactiveMessage={message.interactive} />
                      </div>
                    </Disclosure.Panel>
                  </Transition>
                </>
              )}
            </Disclosure>
          );
        })}
    </>
  );
};

export default TemplateEditor;
interface BsChevronUpProps {
  open: any;
}

const BsChevronUpStyled = styled(BsChevronUp)(({ open }: BsChevronUpProps) => [tw`w-5 h-5 text-purple-500`, open ? tw`transform rotate-180` : '']);

const transitionProps = {
  enter: tw`transition ease-out duration-500`,
  enterFrom: tw`transform opacity-0 `,
  enterTo: tw`transform opacity-100 `,
  leave: tw`transition ease-out duration-300`,
  leaveFrom: tw`transform opacity-100 `,
  leaveTo: tw`transform opacity-0 `,
};
