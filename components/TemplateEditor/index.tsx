import React, { FC, useEffect, useState } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import { SectionHeading, SectionSubtitle } from '../LogiclessComponents';
import HeaderForm from './Header/HeaderForm';
import BodyForm from '../BodyForm';
import FooterForm from '../FooterForm';
import ButtonsForm from '../ButtonsForm';
import { useRecoilState, useRecoilValue } from 'recoil';
import { listMessageAtom } from '../../Recoil/listMessage';
import SenderForm from './Sender/SenderForm';

const TemplateEditor: FC = () => {
  // const listMessage = useRecoilValue(listMessageAtom);
  const [listMessage, setListMessage] = useRecoilState(listMessageAtom);
  console.log('List Message Template Editor', listMessage);
  useEffect(() => {}, [listMessage]);
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

  return (
    <>
      {listMessage.length > 0 &&
        listMessage.map((message: any, index: number) => {
          return (
            <Accordion allowToggle key={index}>
              <AccordionItem>
                <h2>
                  <AccordionButton>
                    <Box flex='1' textAlign='left'>
                      {message.sender} - {index + 1}
                    </Box>
                    <AccordionIcon />
                  </AccordionButton>
                </h2>
                <AccordionPanel pb={4}>
                  <div className='flex-none border-solid border-1 shadow-sm rounded-sm bg-white p-2'>
                    <SectionHeading title='Type User' />
                    <SectionSubtitle subtitle='Choose between user and bot' />
                    <SenderForm
                      senderType={message.sender}
                      onSenderTypeChange={(event) =>
                        handleSenderTypeChange(event, message.id)
                      }
                    />
                  </div>
                  <div className='flex-none border-solid border-1 shadow-sm rounded-sm bg-white p-2'>
                    <SectionHeading title='Header (optional)' />
                    <SectionSubtitle subtitle="Choose which type of media you'll use for this header" />
                    <HeaderForm
                      headerType={message.header.type}
                      messageId={message.id}
                      onHeaderTypeChange={(event) =>
                        handleHeaderTypeChange(event, message.id)
                      }
                    />
                  </div>
                  <div className='flex-none border-solid border-1 shadow-sm rounded-sm bg-white p-2'>
                    <SectionHeading title='Body' />
                    <SectionSubtitle subtitle='Enter the text for your message. Parameter format: {{1}}, {{2}}, and so on.' />
                    <BodyForm />
                  </div>
                  <div className='flex-none border-solid border-1 shadow-sm rounded-sm bg-white p-2'>
                    <SectionHeading title='Footer (optional)' />
                    <SectionSubtitle subtitle='Add a short line of text to the bottom of your message. Max: 60 chars.' />
                    <FooterForm />
                  </div>
                  <div className='border-solid border-1 shadow-sm rounded-sm bg-white p-2'>
                    <SectionHeading title='Buttons (optional)' />
                    <SectionSubtitle subtitle="Create buttons that let customers respond to your message. Available: 'Call to action' and 'Quick Reply' button." />
                    <ButtonsForm />
                  </div>
                </AccordionPanel>
              </AccordionItem>
            </Accordion>
          );
        })}
    </>
  );
};

export default TemplateEditor;
