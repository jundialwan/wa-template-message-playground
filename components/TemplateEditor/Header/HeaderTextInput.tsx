import { FC, useState } from 'react';
import { useRecoilState } from 'recoil';
import { listMessageAtom } from '../../../Recoil/listMessage';

const HeaderTextInput: FC<{ messageId?: number; headerText: string }> = ({ messageId, headerText }) => {
  const [listMessage, setListMessage] = useRecoilState(listMessageAtom);
  // const onTextChange = (e: any) => setHeaderText(e.target.value);
  const handleHeaderTextChange = (event: any, listId: any) => {
    let newlistMessage = listMessage.map((data: any) => {
      return {
        ...data,
        header: {
          ...data.header,
          text: data.id === listId ? event?.target?.value : data.header.text,
        },
      };
    });
    setListMessage(newlistMessage);
  };

  return (
    <div className='mt-2'>
      <span>Header Text</span>
      <input type='text' name='footer' id='footer' value={headerText} onChange={(e) => handleHeaderTextChange(e, messageId)} className='w-full border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' />
      <span className='text-xs float-right'>Char: {headerText?.length}/60</span>
    </div>
  );
};

export default HeaderTextInput;
