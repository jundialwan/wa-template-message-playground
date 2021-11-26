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
import Header from '../components/Layout/Header';
import Card from '../components/Common/Card';
import Sidebar from '../components/Layout/Sidebar';
import Mainpage from '../components/FlowDesign/Mainpage';

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
      <Header />
      <div tw='grid md:grid-cols-12 gap-3 grid-cols-1 text-sm' style={{ height: 'calc(100vh - 72px)' }}>
        <Sidebar />
        <Mainpage />

        <div tw='col-span-3 flex flex-col md:h-full gap-3'>
          <WhatsAppPreview />
        </div>
      </div>
    </div>
  );
};

export default Home;
