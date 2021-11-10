import React, { FC, useEffect, useState } from 'react';
import { Accordion, AccordionItem, AccordionButton, AccordionPanel, AccordionIcon, Box } from '@chakra-ui/react';
import { SectionHeading, SectionSubtitle } from '../LogiclessComponents';
import HeaderForm from './Header/HeaderForm';
import BodyForm from './Body/BodyForm';
import FooterForm from './Footer/FooterForm';
import ButtonsForm from './Footer/ButtonsForm';
import { useRecoilState, useRecoilValue } from 'recoil';
import { listMessageAtom } from '../../Recoil/listMessage';
import SenderForm from './Sender/SenderForm';

const TemplateEditor: FC = () => {
  // const listMessage = useRecoilValue(listMessageAtom);
  const [listMessage, setListMessage] = useRecoilState(listMessageAtom);
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
                    <SenderForm senderType={message.sender} onSenderTypeChange={(event) => handleSenderTypeChange(event, message.id)} />
                  </div>
                  <div className='flex-none border-solid border-1 shadow-sm rounded-sm bg-white p-2'>
                    <SectionHeading title='Header (optional)' />
                    <SectionSubtitle subtitle="Choose which type of media you'll use for this header" />
                    <HeaderForm headerType={message.header.type} headerText={message.header.text} messageId={message.id} onHeaderTypeChange={(event) => handleHeaderTypeChange(event, message.id)} />
                  </div>
                  <div className='flex-none border-solid border-1 shadow-sm rounded-sm bg-white p-2'>
                    <SectionHeading title='Body' />
                    <SectionSubtitle subtitle='Enter the text for your message. Parameter format: {{1}}, {{2}}, and so on.' />
                    <BodyForm bodyText={message.body.text} messageId={message.id} onBodyTextChange={(event) => handleBodyTextChange(event, message.id)} />
                  </div>
                  <div className='flex-none border-solid border-1 shadow-sm rounded-sm bg-white p-2'>
                    <SectionHeading title='Footer (optional)' />
                    <SectionSubtitle subtitle='Add a short line of text to the bottom of your message. Max: 60 chars.' />
                    <FooterForm footerText={message.footer.text} messageId={message.id} onFooterTextChange={(event) => handleFooterTextChange(event, message.id)} />
                  </div>
                  <div className='border-solid border-1 shadow-sm rounded-sm bg-white p-2'>
                    <SectionHeading title='Buttons (optional)' />
                    <SectionSubtitle subtitle="Create buttons that let customers respond to your message. Available: 'Call to action' and 'Quick Reply' button." />
                    <ButtonsForm buttonType={message.footer.button.type} onButtonTypeChange={(event) => handleFooterBtnTypeChange(event, message.id)} buttonCta={message.footer.button.cta} buttonReply={message.footer.button.reply} />
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
