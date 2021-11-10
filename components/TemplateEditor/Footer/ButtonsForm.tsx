import React, { ChangeEventHandler, FC, useState } from 'react';
import { useRecoilState } from 'recoil';
import { buttonsTypeSelector, CTAButtonIndex, ctaButtonSelector, QuickReplyButtonIndex, quickReplyButtonSelector } from '../../../Recoil/buttons';
import RadioButtonItem from '../../RadioButtonItem';
import { Switch } from '@chakra-ui/react';
import { listMessageAtom } from '../../../Recoil/listMessage';

const ButtonsForm: FC<{ buttonType: string; onButtonTypeChange: ChangeEventHandler<HTMLInputElement>; buttonCta: any; buttonReply: any; messageId: number }> = ({ buttonType, onButtonTypeChange, buttonCta, buttonReply, messageId }) => {
  // const [buttonType, setButtonType] = useRecoilState(buttonsTypeSelector);
  // const onButtonTypeChange = (e: any) => setButtonType(e.target.value);

  return (
    <>
      <div className='flex flex-row'>
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
    <div className='flex flex-col p-2 mt-2 gap-1'>
      <CTAButtonInput order={0} messageId={messageId} buttonCta={buttonCta} />
      <CTAButtonInput order={1} messageId={messageId} buttonCta={buttonCta} />
    </div>
  );
};

const CTAButtonInput: FC<{ order: CTAButtonIndex; messageId: number; buttonCta: any }> = ({ order, messageId, buttonCta }) => {
  const [listMessage, setListMessage] = useRecoilState(listMessageAtom);
  const [thisButton, setThisButton] = useRecoilState(ctaButtonSelector(order));
  const [buttonSwitch, setButtonSwitch] = useState(buttonCta[order]?.enabled);
  const [buttonText, setButtonText] = useState(buttonCta[order]?.text);
  const [buttonTextContext, setButtonTextContext] = useState(buttonCta[order]?.type);
  // console.log('buttonCta', buttonCta);
  const handleToggleChange = (event: any, messageId: any) => {
    setButtonSwitch(event?.target?.checked);
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
                enabled: data.id === messageId ? event?.target?.checked : data.footer.button.cta[order].enabled,
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

  const onToggleChange = (e: any) => setThisButton((curr) => ({ ...curr, enabled: e.target.checked }));
  const onButtonTextChange = (e: any) => setThisButton((curr) => ({ ...curr, text: e.target.value }));
  const onCTAContextChange = (e: any) =>
    setThisButton((curr) => ({
      ...curr,
      [thisButton.type === 'call-phone' ? 'phone' : 'url']: e.target.value,
    }));

  return (
    <div className='flex flex-row items-center gap-1 mt-2'>
      <div className='gap-1'>
        <span className='text-xs font-semibold text-black'>{buttonCta[order].type === 'call-phone' ? 'Call Phone Number' : 'Visit Website'}</span>
        <div className='flex flex-row gap-1 items-center border px-3 py-2 rounded-lg'>
          <Switch isChecked={buttonSwitch} size='sm' colorScheme='teal' ringColor='#047857' onChange={(e) => handleToggleChange(e, messageId)} />

          <div className='flex flex-col'>
            <div className='flex flex-row items-center gap-1 font-semibold'>
              <span className='text-xs text-gray-500'>Button Text</span>
              <span className='text-xs'>({buttonText.length}/20)</span>
            </div>

            <input type='text' name={`cta-text-${order}`} id={`cta-text-${order}` + messageId} value={buttonText} onChange={(e) => handleTextChange(e, messageId)} className='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' />
          </div>

          <div className='flex flex-col'>
            <div className='flex flex-row items-center gap-1 font-semibold'>
              <span className='text-xs text-gray-500'>{buttonCta[order].type === 'call-phone' ? 'Phone Number' : 'Website URL'}</span>
              <span className='text-xs'>
                ({buttonCta[order].type === 'call-phone' ? buttonCta[order].phone?.length || 0 : buttonCta[order].url?.length || 0}
                /20)
              </span>
            </div>

            <input type='text' name={`cta-context-${order}`} id={`cta-context-${order}` + messageId} value={buttonCta[order].type === 'call-phone' ? buttonCta[order].phone : buttonCta[order].url} onChange={(e) => handleCTAContext(e, messageId)} className='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' disabled />
          </div>
        </div>
      </div>
    </div>
  );
};

const QuickReplyButtonsInput: FC<{ messageId: number; buttonReply: any }> = ({ messageId, buttonReply }) => {
  return (
    <div className='flex flex-col p-2 mt-2 gap-1'>
      <QuickReplyButtonInput order={0} buttonReply={buttonReply} messageId={messageId} />
      <QuickReplyButtonInput order={1} buttonReply={buttonReply} messageId={messageId} />
      <QuickReplyButtonInput order={2} buttonReply={buttonReply} messageId={messageId} />
    </div>
  );
};

const QuickReplyButtonInput: FC<{ order: QuickReplyButtonIndex; messageId: number; buttonReply: any }> = ({ order, messageId, buttonReply }) => {
  const [thisButton, setThisButton] = useRecoilState(quickReplyButtonSelector(order));
  const [listMessage, setListMessage] = useRecoilState(listMessageAtom);
  const [buttonSwitch, setButtonSwitch] = useState(buttonReply[order]?.enabled);
  const [buttonText, setButtonText] = useState(buttonReply[order]?.text);
  const handleToggleChange = (event: any, messageId: any) => {
    setButtonSwitch(event?.target?.checked);
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
                enabled: data.id === messageId ? event?.target?.checked : data.footer.button.reply[order].enabled,
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
  console.log('Quick Button Reply', buttonReply);
  console.log('Quick messageId', messageId);
  const onToggleChange = (e: any) => setThisButton((curr) => ({ ...curr, enabled: e.target.checked }));
  const onButtonTextChange = (e: any) => setThisButton((curr) => ({ ...curr, text: e.target.value }));

  return (
    <div className='flex flex-row gap-1 items-center'>
      <Switch isDisabled={order === 0} isChecked={buttonSwitch} size='sm' colorScheme='teal' ringColor='#047857' onChange={(e) => handleToggleChange(e, messageId)} />
      <input type='text' name={`reply-${order}`} id={`reply-${order}` + messageId} placeholder={`Reply button ${order + 1}`} value={buttonText} onChange={(e) => handleTextChange(e, messageId)} className='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' />
      <span className='text-xs'>{buttonText.length}/20</span>
    </div>
  );
};
