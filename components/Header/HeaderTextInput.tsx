import { FC } from 'react';
import { useRecoilState } from 'recoil';
import { headerTextSelector } from '../../Recoil/header';

const HeaderTextInput: FC<{ value?: string }> = ({ value }) => {
  const [headerText, setHeaderText] = useRecoilState(headerTextSelector);

  const onTextChange = (e: any) => setHeaderText(e.target.value);

  return (
    <div tw='mt-2'>
      <span>Header Text</span>
      <input type='text' name='footer' id='footer' value={headerText} onChange={onTextChange} tw='w-full border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' />
      <span tw='text-xs float-right'>Char: {headerText.length}/60</span>
    </div>
  );
};

export default HeaderTextInput;
