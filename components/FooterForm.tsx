import { FC } from 'react';
import { useRecoilState } from 'recoil';
import { footerTextSelector } from '../Recoil/footerText';

const FooterForm: FC<{ value?: string }> = ({ value }) => {
  const [footerText, setFooterText] = useRecoilState(footerTextSelector);

  const onTextChange = (e: any) => setFooterText(e.target.value);

  return (
    <>
      <input type='text' name='footer' id='footer' value={footerText} onChange={onTextChange} tw='w-full border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' />
      <span tw='text-xs float-right'>Char: {footerText.length}/60</span>
    </>
  );
};

export default FooterForm;
