import ButtonsForm from '@/components/ButtonsForm';
import { SectionHeading, SectionSubtitle } from '@/components/Common/LogiclessComponents';
import FooterForm from '@/components/Chat/Form/Brand/PushMessage/FooterForm';
import HeaderForm from '@/components/Chat/Form/Brand/PushMessage/Header/HeaderForm';
import React, { FC } from 'react';
import 'twin.macro';
import BodyForm from '@/components/BodyForm';

const PushMessage: FC = () => {
  return (
    <div tw='divide-y-2'>
      <div tw='flex-none shadow-sm rounded-sm bg-white p-2'>
        <SectionHeading title='Header (optional)' />
        <SectionSubtitle subtitle="Choose which type of media you'll use for this header" />
        <HeaderForm />
      </div>
      <div tw='flex-none shadow-sm rounded-sm bg-white p-2 mb-6'>
        <SectionHeading title='Body' />
        <SectionSubtitle subtitle='Enter the body text for your message.' />
        <BodyForm />
      </div>
      <div tw='flex-none shadow-sm rounded-sm bg-white p-2 mb-6'>
        <SectionHeading title='Footer (optional)' />
        <SectionSubtitle subtitle='Add a short line of text to the bottom of your message. Max: 60 chars.' />

        <FooterForm />
      </div>
      <div tw='flex-none shadow-sm rounded-sm bg-white p-2'>
        <SectionHeading title='Buttons (optional)' />
        <SectionSubtitle subtitle="Create buttons that let customers respond to your message. Available: 'Call to action' and 'Quick Reply' button." />
        <ButtonsForm />
      </div>
    </div>
  );
};

export default PushMessage;
