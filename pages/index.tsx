import type { NextPage } from 'next';
// import { Grid, GridItem, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import tw, { styled, css, theme } from 'twin.macro';
import Head from 'next/head';
import React from 'react';
import FooterForm from '../components/FooterForm';
import BodyForm from '../components/BodyForm';
import { PreviewComponent, SectionHeading, SectionSubtitle } from '../components/LogiclessComponents';
import HeaderForm from '../components/Header/HeaderForm';
import ButtonsForm from '../components/ButtonsForm';
import SenderForm from '../components/Sender/SenderForm';
import { useRecoilValue } from 'recoil';
import { listMessageAtom } from '../Recoil/listMessage';
import SubmitForm from '../components/SubmitForm';
import TemplateEditor from '../components/TemplateEditor';
import WhatsAppPreview from '../components/WhatsAppPreview';
import InteractiveForm from '../components/InteractiveForm';
import CompanyName from '../components/Company/CompanyName';
import CompanyImage from '../components/Company/CompanyImage';

/**
 * Home
 *
 * Home component will be focus on the structure rather than the logic
 */
const Home: NextPage = () => {
  const listMessage = useRecoilValue(listMessageAtom);
  const [tab, setTab] = React.useState('company');
  console.log('list Nessage', listMessage);
  return (
    <div tw='p-3 h-screen bg-gray-100 flex flex-col gap-2 font-sans antialiased text-gray-500'>
      <div tw='flex-none border-solid border shadow-sm rounded-sm bg-white p-2 font-semibold text-black'>WhatsApp Template Message Playground</div>
      <div tw='grid md:grid-cols-12 gap-3 grid-cols-1 text-sm' style={{ height: 'calc(100vh - 72px)' }}>
        <div tw='col-span-2 border-solid border shadow-sm rounded-sm bg-white md:h-full p-2'>
          <SectionHeading title='Template Examples' tw='mb-2' />
          <div tw='rounded-sm bg-white p-1 pl-2 hover:bg-gray-100 cursor-pointer' onClick={() => setTab('company')}>
            Company Editor
          </div>
          <div tw='rounded-sm bg-white p-1 pl-2 hover:bg-gray-100 cursor-pointer' onClick={() => setTab('editor')}>
            WhatsApp Editor
          </div>
        </div>
        {tab === 'editor' ? (
          <div tw='col-span-7 flex flex-col md:h-full gap-1 overflow-auto'>
            <TemplateEditor />
            <div tw='flex-none border-solid border shadow-sm rounded-sm bg-white p-2'>
              <SectionHeading title='Type User' />
              <SectionSubtitle subtitle='Choose between user and bot' />
              <SenderForm />
            </div>
            <div tw='flex-none border-solid border shadow-sm rounded-sm bg-white p-2'>
              <SectionHeading title='Header (optional)' />
              <SectionSubtitle subtitle="Choose which type of media you'll use for this header" />

              <HeaderForm />
            </div>
            <div tw='flex-none border-solid border shadow-sm rounded-sm bg-white p-2'>
              <SectionHeading title='Body' />
              <SectionSubtitle subtitle='Enter the text for your message. Parameter format: {{1}}, {{2}}, and so on.' />

              <BodyForm />
            </div>
            <div tw='flex-none border-solid border shadow-sm rounded-sm bg-white p-2'>
              <SectionHeading title='Footer (optional)' />
              <SectionSubtitle subtitle='Add a short line of text to the bottom of your message. Max: 60 chars.' />

              <FooterForm />
            </div>
            <div tw='border-solid border shadow-sm rounded-sm bg-white p-2'>
              <SectionHeading title='Buttons (optional)' />
              <SectionSubtitle subtitle="Create buttons that let customers respond to your message. Available: 'Call to action' and 'Quick Reply' button." />

              <ButtonsForm />
            </div>
            <div tw='border-solid border shadow-sm rounded-sm bg-white p-2'>
              <SectionHeading title='Interactive Message (optional)' />
              <SectionSubtitle subtitle="Create interactive message that let customers respond to your message. Available: 'List Message' and 'Reply Button' button." />

              <InteractiveForm />
            </div>
            <div tw='border-solid border shadow-sm rounded-sm bg-white p-2'>
              <SectionHeading title='Submit Your Chat Form' />
              <SectionSubtitle subtitle='Remember to submit form ' />
              <SubmitForm />
            </div>
          </div>
        ) : (
          <div tw='col-span-7 flex flex-col md:h-full gap-1 overflow-auto'>
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
          </div>
        )}

        <div tw='col-span-3 flex flex-col md:h-full gap-3'>
          <WhatsAppPreview />
        </div>
      </div>
    </div>
  );
};

export default Home;
