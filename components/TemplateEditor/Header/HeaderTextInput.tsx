import { FC, useState } from 'react';
import { useRecoilState } from 'recoil';
import { listMessageAtom } from '../../../Recoil/listMessage';

const HeaderTextInput: FC<{ messageId?: number }> = ({ messageId }) => {
  const [listMessage, setListMessage] = useRecoilState(listMessageAtom);
  const [inputValue, setInputValue] = useState('');
  // const onTextChange = (e: any) => setHeaderText(e.target.value);
  const handleHeaderTextChange = (messageId: any) => {
    // let newlistMessage = listMessage.map((data: any) => {
    //   let newData = { ...data };
    //   if (data.id === messageId) {
    //     newData.header.text = inputValue;
    //   }
    //   return newData;
    // });
    // setListMessage(newlistMessage);
    console.log('value text', inputValue);
  };

  return (
    <div className='mt-2'>
      <span>Header Text</span>
      <input
        type='text'
        name='footer'
        id='footer'
        value={inputValue}
        onChange={() => handleHeaderTextChange(messageId)}
        className='w-full border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600'
      />
      <span className='text-xs float-right'>Char: {inputValue.length}/60</span>
    </div>
  );
};

export default HeaderTextInput;
