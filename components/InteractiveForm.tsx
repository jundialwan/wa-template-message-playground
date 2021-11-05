import React, { FC } from 'react';
import { useRecoilState } from 'recoil';
import {
  buttonsTypeSelector,
  CTAButtonIndex,
  ctaButtonSelector,
} from '../Recoil/buttons';
import RadioButtonItem from './RadioButtonItem';
import { Switch } from '@chakra-ui/react';
import QuickReplyButtonsInput from './QuickReplyButtonsInput';
import {
  buttonsInteractiveTypeSelector,
  ListMessageButtonIndex,
  ListMessageButtonSelector,
} from '../Recoil/interactiveButton';

const InteractiveForm: FC = () => {
  const [buttonType, setButtonType] = useRecoilState(
    buttonsInteractiveTypeSelector
  );
  const onButtonTypeChange = (e: any) => setButtonType(e.target.value);

  return (
    <>
      <div className='flex flex-row'>
        <RadioButtonItem
          isChecked={buttonType === 'none'}
          value='none'
          id='no-button'
          label='None'
          onChange={onButtonTypeChange}
        />
        <RadioButtonItem
          isChecked={buttonType === 'listMessage'}
          value='cta'
          id='cta'
          label='Call to Action'
          onChange={onButtonTypeChange}
        />
        <RadioButtonItem
          isChecked={buttonType === 'reply'}
          value='reply'
          id='reply'
          label='Quick Reply'
          onChange={onButtonTypeChange}
        />
      </div>

      {buttonType === 'listMessage' ? <ListMessageButtonsInput /> : null}
      {buttonType === 'reply' ? <QuickReplyButtonsInput /> : null}
    </>
  );
};

export default InteractiveForm;

const ListMessageButtonsInput: FC = () => {
  return (
    <div className='flex flex-col p-2 mt-2 gap-1'>
      <ListMessageButtonInput order={0} />
      <ListMessageButtonInput order={1} />
      <ListMessageButtonInput order={2} />
      <ListMessageButtonInput order={3} />
    </div>
  );
};

const ListMessageButtonInput: FC<{ order: ListMessageButtonIndex }> = ({
  order,
}) => {
  const [thisButton, setThisButton] = useRecoilState(
    ListMessageButtonSelector(order)
  );

  const onToggleChange = (e: any) =>
    setThisButton((curr) => ({ ...curr, enabled: e.target.checked }));
  const onButtonTextChange = (e: any) =>
    setThisButton((curr) => ({ ...curr, text: e.target.value }));

  return (
    <div className='flex flex-row items-center gap-1 mt-2'>
      <div className='gap-1'>
        <div className='flex flex-row gap-1 items-center border px-3 py-2 rounded-lg'>
          <Switch
            isChecked={thisButton.enabled}
            size='sm'
            colorScheme='teal'
            ringColor='#047857'
            onChange={onToggleChange}
          />

          <div className='flex flex-col'>
            <div className='flex flex-row items-center gap-1 font-semibold'>
              <span className='text-xs text-gray-500'>Button Text</span>
              <span className='text-xs'>({thisButton.text.length}/20)</span>
            </div>

            <input
              type='text'
              name={`cta-text-${order}`}
              id={`cta-text-${order}`}
              value={thisButton.text}
              onChange={onButtonTextChange}
              className='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600'
            />
          </div>
        </div>
      </div>
    </div>
  );
};
