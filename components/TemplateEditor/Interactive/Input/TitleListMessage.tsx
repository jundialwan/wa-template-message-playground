import { FC, useState } from 'react';
import { useRecoilState } from 'recoil';
import { titleInteractiveButtonsTypeSelector } from '../../../../Recoil/interactiveButton';
import { listMessageAtom } from '../../../../Recoil/listMessage';

const TitleListMessage: FC<{ messageId: number; titleInteractive: string }> = ({ messageId, titleInteractive }) => {
  // const [titleMessage, setTitleMessage] = useRecoilState(titleInteractiveButtonsTypeSelector);
  const [listMessage, setListMessage] = useRecoilState(listMessageAtom);
  const handleInteractiveTitleChange = (event: any, listId: any) => {
    let newlistMessage = listMessage.map((data: any) => {
      return {
        ...data,
        interactive: {
          ...data.interactive,
          title: data.id === listId ? event?.target?.value : data.interactive.tile,
        },
      };
    });
    setListMessage(newlistMessage);
  };
  return (
    <div tw='flex flex-col'>
      <div tw='flex flex-col'>
        <div tw='flex flex-row items-center gap-1 font-semibold'>
          <span tw='text-xs text-gray-500'>Title Text</span>
          <span tw='text-xs'>({titleInteractive.length}/20)</span>
        </div>
        {/* Header */}
        <input type='text' name={`cta-text-`} id={`cta-text-`} value={titleInteractive} onChange={(event) => handleInteractiveTitleChange(event, messageId)} tw='border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' />
      </div>
    </div>
  );
};

export default TitleListMessage;
