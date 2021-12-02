import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import { buttonsTypeSelector, CTAButtonIndex, ctaButtonSelector, QuickReplyButtonIndex, quickReplyButtonSelector } from '@/Recoil/buttons';
import RadioButtonItem from '@/components/Common/RadioButtonItem';
import { Switch } from '@headlessui/react';
import QuickReplyButtonsInput from './QuickReplyButtonsInput';
import tw, { styled, css, theme } from 'twin.macro';

const ButtonsForm: FC = () => {
  const [buttonType, setButtonType] = useRecoilState(buttonsTypeSelector);
  const onButtonTypeChange = (e: any) => setButtonType(e.target.value);

  return (
    <>
      <div tw='flex flex-row'>
        <RadioButtonItem isChecked={buttonType === 'none'} value='none' id='no-button' label='None' onChange={onButtonTypeChange} />
        <RadioButtonItem isChecked={buttonType === 'cta'} value='cta' id='cta' label='Call to Action' onChange={onButtonTypeChange} />
        <RadioButtonItem isChecked={buttonType === 'reply'} value='reply' id='reply' label='Quick Reply' onChange={onButtonTypeChange} />
      </div>

      {buttonType === 'cta' ? <CTAButtonsInput /> : null}
      {buttonType === 'reply' ? <QuickReplyButtonsInput /> : null}
    </>
  );
};

export default ButtonsForm;

const CTAButtonsInput: FC = () => {
  return (
    <div tw='flex flex-col p-2 mt-2 gap-1'>
      <CTAButtonInput order={0} />
      <CTAButtonInput order={1} />
    </div>
  );
};

const CTAButtonInput: FC<{ order: CTAButtonIndex }> = ({ order }) => {
  const [thisButton, setThisButton] = useRecoilState(ctaButtonSelector(order));

  const onToggleChange = (e: any) => setThisButton((curr) => ({ ...curr, enabled: e }));
  const onButtonTextChange = (e: any) => setThisButton((curr) => ({ ...curr, text: e.target.value }));
  const onCTAContextChange = (e: any) =>
    setThisButton((curr) => ({
      ...curr,
      [thisButton.type === 'call-phone' ? 'phone' : 'url']: e.target.value,
    }));

  return (
    <div tw='flex flex-row items-center gap-1 mt-2'>
      <div tw='gap-1'>
        <span tw='text-xs font-semibold text-black'>{thisButton.type === 'call-phone' ? 'Call Phone Number' : 'Visit Website'}</span>
        <div tw='flex flex-row gap-1 items-center border px-3 py-2 rounded-lg'>
          <Switch
            checked={thisButton?.enabled}
            onChange={onToggleChange}
            css={[
              tw`h-[18px] w-[34px]
            relative inline-flex flex-shrink-0
            border-2 border-transparent rounded-full cursor-pointer
            transition-colors ease-in-out duration-200
            focus:outline-none focus-visible:(ring-2 ring-white ring-opacity-75)`,
              thisButton?.enabled ? tw`bg-blue-700` : tw`bg-gray-200`,
            ]}
          >
            <span
              aria-hidden='true'
              css={[
                tw`h-[14px] w-[14px]
              pointer-events-none inline-block
              rounded-full bg-white shadow-lg transform ring-0
              transition ease-in-out duration-200`,
                thisButton?.enabled ? tw`translate-x-4` : tw`translate-x-0`,
              ]}
            />
          </Switch>

          <div tw='flex flex-col'>
            <div tw='flex flex-row items-center gap-1 font-semibold'>
              <span tw='text-xs text-gray-500'>Button Text</span>
              <span tw='text-xs'>({thisButton.text.length}/20)</span>
            </div>

            <input type='text' name={`cta-text-${order}`} id={`cta-text-${order}`} value={thisButton.text} onChange={onButtonTextChange} tw='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' />
          </div>

          <div tw='flex flex-col'>
            <div tw='flex flex-row items-center gap-1 font-semibold'>
              <span tw='text-xs text-gray-500'>{thisButton.type === 'call-phone' ? 'Phone Number' : 'Website URL'}</span>
              <span tw='text-xs'>
                ({thisButton.type === 'call-phone' ? thisButton.phone?.length || 0 : thisButton.url?.length || 0}
                /20)
              </span>
            </div>

            <input
              type='text'
              name={`cta-context-${order}`}
              id={`cta-context-${order}`}
              value={thisButton.type === 'call-phone' ? thisButton.phone : thisButton.url}
              onChange={onCTAContextChange}
              tw='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
