import { FC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { bodyTextAtom, bodyTextLengthSelector } from '../Recoil/bodyText';
import tw, { styled, css, theme } from 'twin.macro';

const BodyForm: FC<{ value?: string }> = ({ value }) => {
  const [bodyText, setBodyText] = useRecoilState(bodyTextAtom);
  const bodyTextLength = useRecoilValue(bodyTextLengthSelector);

  const onTextChange = (e: any) => setBodyText(e.target.value.substring(0, 1024));

  return (
    <>
      <textarea value={bodyText} onChange={onTextChange} name='body' id='body' tw='w-full min-h-[124px] max-h-[124px] p-2 rounded border text-xs text-black font-mono focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600'></textarea>
      <span tw='text-xs float-left rounded px-[4px] bg-gray-200 mr-1'>Bold: *text*</span>
      <span tw='text-xs float-left rounded px-[4px] bg-gray-200 mr-1'>Italic: _text_</span>
      <span tw='text-xs float-left rounded px-[4px] bg-gray-200 mr-1'>Strikethrough: ~text~</span>
      <span tw='text-xs float-left rounded px-[4px] bg-gray-200 mr-1'>Monospace: ```text```</span>
      <span tw='text-xs float-right'>Char: {bodyTextLength}/1024</span>
    </>
  );
};

export default BodyForm;
