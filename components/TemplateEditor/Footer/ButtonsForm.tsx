import React, { ChangeEventHandler, FC, useState } from 'react';
import { useRecoilState } from 'recoil';
import { CTAButtonIndex, QuickReplyButtonIndex, quickReplyButtonSelector } from '../../../Recoil/buttons';
import RadioButtonItem from '../../RadioButtonItem';
import { Switch } from '@headlessui/react';
import { listMessageAtom } from '../../../Recoil/listMessage';
import tw, { styled, css, theme } from 'twin.macro';

const ButtonsForm: FC<{ buttonType: string; onButtonTypeChange: ChangeEventHandler<HTMLInputElement>; buttonCta: any; buttonReply: any; messageId: number }> = ({ buttonType, onButtonTypeChange, buttonCta, buttonReply, messageId }) => {
  return (
    <>
      <div tw='flex flex-row'>
        <RadioButtonItem isChecked={buttonType === 'none'} value='none' id={'no-button-edit' + messageId} label='None' onChange={onButtonTypeChange} />
        <RadioButtonItem isChecked={buttonType === 'cta'} value='cta' id={'cta-edit' + messageId} label='Call to Action' onChange={onButtonTypeChange} />
        <RadioButtonItem isChecked={buttonType === 'reply'} value='reply' id={'reply-edit' + messageId} label='Quick Reply' onChange={onButtonTypeChange} />
      </div>

      {buttonType === 'cta' ? <CTAButtonsInput messageId={messageId} buttonCta={buttonCta} /> : null}
      {buttonType === 'reply' ? <QuickReplyButtonsInput messageId={messageId} buttonReply={buttonReply} /> : null}
    </>
  );
};

export default ButtonsForm;

const CTAButtonsInput: FC<{ messageId: number; buttonCta: any }> = ({ messageId, buttonCta }) => {
  return (
    <div tw='flex flex-col p-2 mt-2 gap-1'>
      <CTAButtonInput order={0} messageId={messageId} buttonCta={buttonCta} />
      <CTAButtonInput order={1} messageId={messageId} buttonCta={buttonCta} />
    </div>
  );
};

const CTAButtonInput: FC<{ order: CTAButtonIndex; messageId: number; buttonCta: any }> = ({ order, messageId, buttonCta }) => {
  const [listMessage, setListMessage] = useRecoilState(listMessageAtom);
  const [buttonSwitch, setButtonSwitch] = useState(buttonCta[order]?.enabled);
  const [buttonText, setButtonText] = useState(buttonCta[order]?.text);
  // console.log('buttonCta', buttonCta);
  const handleToggleChange = (event: any, messageId: any) => {
    setButtonSwitch(event);
    let newlistMessage = listMessage.map((data: any) => {
      return {
        ...data,
        footer: {
          ...data.footer,
          button: {
            ...data.footer.button,
            cta: {
              ...data.footer.button.cta,
              [order]: {
                ...data.footer.button.cta[order],
                enabled: data.id === messageId ? event : data.footer.button.cta[order].enabled,
              },
            },
          },
        },
      };
    });
    setListMessage(newlistMessage);
  };
  const handleTextChange = (event: any, listId: any) => {
    setButtonText(event?.target?.value.substring(0, 20));
    let newlistMessage = listMessage.map((data: any) => {
      return {
        ...data,
        footer: {
          ...data.footer,
          button: {
            ...data.footer.button,
            cta: {
              ...data.footer.button.cta,
              [order]: {
                ...data.footer.button.cta[order],
                text: data.id === listId ? event?.target?.value.substring(0, 20) : data.footer.button.cta[order].value,
              },
            },
          },
        },
      };
    });
    setListMessage(newlistMessage);
  };
  const handleCTAContext = (event: any, listId: any) => {
    setButtonText(event?.target?.value.substring(0, 20));
    let newlistMessage = listMessage.map((data: any) => {
      return {
        ...data,
        footer: {
          ...data.footer,
          button: {
            ...data.footer.button,
            cta: {
              ...data.footer.button.cta,
              [order]: {
                ...data.footer.button.cta[order],
                [buttonCta.type === 'call-phone' ? 'phone' : 'url']: data.id === listId ? event?.target?.value.substring(0, 20) : data.footer.button.cta[order].value,
              },
            },
          },
        },
      };
    });
    setListMessage(newlistMessage);
  };

  return (
    <div tw='flex flex-row items-center gap-1 mt-2'>
      <div tw='gap-1'>
        <span tw='text-xs font-semibold text-black'>{buttonCta[order].type === 'call-phone' ? 'Call Phone Number' : 'Visit Website'}</span>
        <div tw='flex flex-row gap-1 items-center border px-3 py-2 rounded-lg'>
          <Switch
            checked={buttonSwitch}
            onChange={(e) => handleToggleChange(e, messageId)}
            css={[
              tw`h-[18px] w-[34px]
            relative inline-flex flex-shrink-0
            border-2 border-transparent rounded-full cursor-pointer
            transition-colors ease-in-out duration-200
            focus:outline-none focus-visible:(ring-2 ring-white ring-opacity-75)`,
              buttonSwitch ? tw`bg-blue-700` : tw`bg-gray-200`,
            ]}
          >
            <span
              aria-hidden='true'
              css={[
                tw`h-[14px] w-[14px]
              pointer-events-none inline-block
              rounded-full bg-white shadow-lg transform ring-0
              transition ease-in-out duration-200`,
                buttonSwitch ? tw`translate-x-4` : tw`translate-x-0`,
              ]}
            />
          </Switch>

          <div tw='flex flex-col'>
            <div tw='flex flex-row items-center gap-1 font-semibold'>
              <span tw='text-xs text-gray-500'>Button Text</span>
              <span tw='text-xs'>({buttonText.length}/20)</span>
            </div>

            <input type='text' name={`cta-text-${order}`} id={`cta-text-${order}` + messageId} value={buttonText} onChange={(e) => handleTextChange(e, messageId)} tw='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' />
          </div>

          <div tw='flex flex-col'>
            <div tw='flex flex-row items-center gap-1 font-semibold'>
              <span tw='text-xs text-gray-500'>{buttonCta[order].type === 'call-phone' ? 'Phone Number' : 'Website URL'}</span>
              <span tw='text-xs'>
                ({buttonCta[order].type === 'call-phone' ? buttonCta[order].phone?.length || 0 : buttonCta[order].url?.length || 0}
                /20)
              </span>
            </div>

            <input type='text' name={`cta-context-${order}`} id={`cta-context-${order}` + messageId} value={buttonCta[order].type === 'call-phone' ? buttonCta[order].phone : buttonCta[order].url} onChange={(e) => handleCTAContext(e, messageId)} tw='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' disabled />
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickReplyButtonsInput: FC<{ messageId: number; buttonReply: any }> = ({ messageId, buttonReply }) => {
  return (
    <div tw='flex flex-col p-2 mt-2 gap-1'>
      <QuickReplyButtonInput order={0} buttonReply={buttonReply} messageId={messageId} />
      <QuickReplyButtonInput order={1} buttonReply={buttonReply} messageId={messageId} />
      <QuickReplyButtonInput order={2} buttonReply={buttonReply} messageId={messageId} />
    </div>
  );
};

const QuickReplyButtonInput: FC<{ order: QuickReplyButtonIndex; messageId: number; buttonReply: any }> = ({ order, messageId, buttonReply }) => {
  const [listMessage, setListMessage] = useRecoilState(listMessageAtom);
  const [buttonSwitch, setButtonSwitch] = useState(buttonReply[order]?.enabled);
  const [buttonText, setButtonText] = useState(buttonReply[order]?.text);
  const handleToggleChange = (event: any, messageId: any) => {
    setButtonSwitch(event);
    let newlistMessage = listMessage.map((data: any) => {
      return {
        ...data,
        footer: {
          ...data.footer,
          button: {
            ...data.footer.button,
            reply: {
              ...data.footer.button.reply,
              [order]: {
                ...data.footer.button.reply[order],
                enabled: data.id === messageId ? event : data.footer.button.reply[order].enabled,
              },
            },
          },
        },
      };
    });
    setListMessage(newlistMessage);
  };
  const handleTextChange = (event: any, listId: any) => {
    setButtonText(event?.target?.value.substring(0, 20));
    let newlistMessage = listMessage.map((data: any) => {
      return {
        ...data,
        footer: {
          ...data.footer,
          button: {
            ...data.footer.button,
            reply: {
              ...data.footer.button.reply,
              [order]: {
                ...data.footer.button.reply[order],
                text: data.id === listId ? event?.target?.value.substring(0, 20) : data.footer.button.reply[order].value,
              },
            },
          },
        },
      };
    });
    setListMessage(newlistMessage);
  };

  return (
    <div tw='flex flex-row gap-1 items-center'>
      <Switch
        disabled={order === 0}
        checked={buttonSwitch}
        onChange={(e) => handleToggleChange(e, messageId)}
        css={[
          tw`h-[18px] w-[34px]
            relative inline-flex flex-shrink-0
            border-2 border-transparent rounded-full cursor-pointer
            transition-colors ease-in-out duration-200
            focus:outline-none focus-visible:(ring-2 ring-white ring-opacity-75)`,
          buttonSwitch ? tw`bg-blue-700` : tw`bg-gray-200`,
        ]}
      >
        <span
          aria-hidden='true'
          css={[
            tw`h-[14px] w-[14px]
              pointer-events-none inline-block
              rounded-full bg-white shadow-lg transform ring-0
              transition ease-in-out duration-200`,
            buttonSwitch ? tw`translate-x-4` : tw`translate-x-0`,
          ]}
        />
      </Switch>

      <input type='text' name={`reply-${order}`} id={`reply-${order}` + messageId} placeholder={`Reply button ${order + 1}`} value={buttonText} onChange={(e) => handleTextChange(e, messageId)} tw='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' />
      <span tw='text-xs'>{buttonText.length}/20</span>
    </div>
  );
};
