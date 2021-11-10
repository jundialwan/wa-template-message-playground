import { ChangeEventHandler, FC } from 'react';

const FooterForm: FC<{ footerText: string; messageId: number; onFooterTextChange: ChangeEventHandler<HTMLInputElement> }> = ({ footerText, messageId, onFooterTextChange }) => {
  // const [footerText, setFooterText] = useRecoilState(footerTextSelector);

  // const onTextChange = (e: any) => setFooterText(e.target.value);

  return (
    <>
      <input type='text' name='footer' id='footer' value={footerText} onChange={onFooterTextChange} className='w-full border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' />
      <span className='text-xs float-right'>Char: {footerText.length}/60</span>
    </>
  );
};

export default FooterForm;
