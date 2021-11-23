import { FC } from 'react';
import { useRecoilState } from 'recoil';
import { companyNameSelector } from '../../Recoil/biodata/company';
import tw, { styled, css, theme } from 'twin.macro';

const CompanyName: FC<{ value?: string }> = ({ value }) => {
  const [companyText, setCompanyText] = useRecoilState(companyNameSelector);

  const onTextChange = (e: any) => setCompanyText(e.target.value);

  return (
    <div tw='mt-2'>
      <span>Company Name</span>
      <input type='text' name='footer' id='footer' value={companyText} onChange={onTextChange} tw='w-full border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600' />
      <span tw='text-xs float-right'>Char: {companyText.length}/15</span>
    </div>
  );
};

export default CompanyName;
