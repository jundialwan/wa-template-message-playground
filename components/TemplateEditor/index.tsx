import React, { FC } from 'react';
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
} from '@chakra-ui/react';
import { SectionHeading, SectionSubtitle } from '../LogiclessComponents';
import SenderForm from '../Sender/SenderForm';
import HeaderForm from '../Header/HeaderForm';
import BodyForm from '../BodyForm';
import FooterForm from '../FooterForm';
import ButtonsForm from '../ButtonsForm';
import SubmitForm from '../SubmitForm';

const TemplateEditor: FC = () => {
  return (
    <Accordion allowToggle>
      <AccordionItem>
        <h2>
          <AccordionButton>
            <Box flex='1' textAlign='left'>
              Chat One
            </Box>
            <AccordionIcon />
          </AccordionButton>
        </h2>
        <AccordionPanel pb={4}>
          <div className='flex-none border-solid border-1 shadow-sm rounded-sm bg-white p-2'>
            <SectionHeading title='Type User' />
            <SectionSubtitle subtitle='Choose between user and bot' />
          </div>
          <div className='flex-none border-solid border-1 shadow-sm rounded-sm bg-white p-2'>
            <SectionHeading title='Header (optional)' />
            <SectionSubtitle subtitle="Choose which type of media you'll use for this header" />
          </div>
          <div className='flex-none border-solid border-1 shadow-sm rounded-sm bg-white p-2'>
            <SectionHeading title='Body' />
            <SectionSubtitle subtitle='Enter the text for your message. Parameter format: {{1}}, {{2}}, and so on.' />
          </div>
          <div className='flex-none border-solid border-1 shadow-sm rounded-sm bg-white p-2'>
            <SectionHeading title='Footer (optional)' />
            <SectionSubtitle subtitle='Add a short line of text to the bottom of your message. Max: 60 chars.' />
          </div>
          <div className='border-solid border-1 shadow-sm rounded-sm bg-white p-2'>
            <SectionHeading title='Buttons (optional)' />
            <SectionSubtitle subtitle="Create buttons that let customers respond to your message. Available: 'Call to action' and 'Quick Reply' button." />
          </div>
          <div className='border-solid border-1 shadow-sm rounded-sm bg-white p-2'>
            <SectionHeading title='Input Sample Parameter' />
            <SectionSubtitle subtitle='Add header and body parameter sample of your template message. See the preview on the right.' />
          </div>
          <div className='border-solid border-1 shadow-sm rounded-sm bg-white p-2'>
            <SectionHeading title='Submit Your Chat Form' />
            <SectionSubtitle subtitle='Remember to submit form ' />
          </div>
        </AccordionPanel>
      </AccordionItem>
    </Accordion>
  );
};

export default TemplateEditor;
