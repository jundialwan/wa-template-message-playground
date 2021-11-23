import React, { FC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { bodyTextAtom } from '../../Recoil/bodyText';
import { buttonsAtom } from '../../Recoil/buttons';
import { footerTextSelector } from '../../Recoil/footerText';
import { headerAtom, headerTypeSelector } from '../../Recoil/header';
import { interactiveButtonsAtom, titleInteractiveButtonsAtom } from '../../Recoil/interactiveButton';
import { listMessageAtom, messageIdAtom } from '../../Recoil/listMessage';
import { senderTypeSelector } from '../../Recoil/senderText';
import tw, { styled, css, theme } from 'twin.macro';

const SubmitForm: FC = () => {
  let id = 0;
  function getId() {
    return id++;
  }

  const userType = useRecoilValue(senderTypeSelector);
  const headerType = useRecoilValue(headerTypeSelector);
  const headerText = useRecoilValue(headerAtom);
  const bodyText = useRecoilValue(bodyTextAtom);
  const footerText = useRecoilValue(footerTextSelector);
  const buttonType = useRecoilValue(buttonsAtom);
  const interactiveType = useRecoilValue(interactiveButtonsAtom);
  const interactiveTitle = useRecoilValue(titleInteractiveButtonsAtom);
  const [messageId, setMessageId] = useRecoilState(messageIdAtom);
  const [listMessage, setListMessage] = useRecoilState(listMessageAtom);

  const addListMessage = () => {
    setListMessage((oldListMessage: any) => [
      ...oldListMessage,
      {
        id: oldListMessage.length + 1,
        sender: userType,
        header: {
          type: headerType,
          image: {
            path: headerText?.image?.path,
          },
          video: {
            path: headerText?.video?.path,
          },
          document: {
            path: headerText?.document?.path,
            filename: headerText?.document?.filename,
          },
          text: headerText?.text,
        },
        body: {
          text: bodyText,
        },
        footer: {
          text: footerText,
          button: {
            type: buttonType.type,
            cta: buttonType?.cta,
            reply: buttonType?.reply,
          },
        },
        interactive: {
          type: interactiveType.type,
          listMessage: interactiveType?.listMessage,
          reply: interactiveType?.reply,
          title: interactiveTitle,
        },
      },
    ]);
  };

  const onSubmit = () => {
    // console.log('SubmitForm');
    // console.log('userType', userType);
    // console.log('headerType', headerType);
    // console.log('headerText', headerText);
    // console.log('bodyText', bodyText);
    // console.log('footerText', footerText);
    // console.log('buttonType', buttonType);
    // console.log('messageId', messageId);
    // console.log('listMessage', listMessage);
    addListMessage();
    console.log('===========================');
    console.log('addListMessage', listMessage);
    console.log('===========================');
  };

  return (
    <div tw='mt-4'>
      <button type='button' onClick={onSubmit} tw='py-2 px-4  bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 focus:ring-offset-blue-200 text-white w-full transition-all text-center text-base font-semibold shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2  opacity-70  rounded-lg '>
        Submit
      </button>
    </div>
  );
};

export default SubmitForm;
