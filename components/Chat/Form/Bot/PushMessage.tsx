import BodyForm from '@/components/BodyForm';
import ButtonsForm from '@/components/ButtonsForm';
import { SectionHeading, SectionSubtitle } from '@/components/Common/LogiclessComponents';
import FooterForm from '@/components/Chat/Form/Bot/PushMessage/FooterForm';
import HeaderForm from '@/components/Chat/Form/Bot/PushMessage/Header/HeaderForm';
import SubmitForm from '@/components/Chat/Form/Bot/PushMessage/SubmitForm';
import React, { FC } from 'react';
import 'twin.macro';

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
        <SectionSubtitle subtitle='Enter the text for your message. Parameter format: {{1}}, {{2}}, and so on.' />

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
      <div tw='flex-none shadow-sm rounded-sm bg-white p-2'>
        <SectionHeading title='Submit Your Chat Form' />
        <SectionSubtitle subtitle='Remember to submit form ' />
        <SubmitForm />
      </div>
    </div>
  );
};

export default PushMessage;
