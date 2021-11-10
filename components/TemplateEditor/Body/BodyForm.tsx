import { ChangeEventHandler, FC } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import { bodyTextAtom, bodyTextLengthSelector } from '../../../Recoil/bodyText';

const BodyForm: FC<{
  bodyText: string;
  messageId: number;
  onBodyTextChange: ChangeEventHandler<HTMLTextAreaElement>;
}> = ({ bodyText, messageId, onBodyTextChange }) => {
  // const [bodyText, setBodyText] = useRecoilState(bodyTextAtom);
  // const bodyTextLength = useRecoilValue(bodyTextLengthSelector);

  // const onTextChange = (e: any) =>
  //   setBodyText(e.target.value.substring(0, 1024));
  const replaceBold = bodyText.replace(/\*(.*?)\*/g, (match, p1) => `<span class="font-semibold">${p1}</span>`);
  const replaceItalic = replaceBold.replace(/\_(.*?)\_/g, (match, p1) => `<i>${p1}</i>`);
  const replaceStrike = replaceItalic.replace(/\~(.*?)\~/g, (match, p1) => `<strike>${p1}</strike>`);
  const replaceMono = replaceStrike.replace(/\`\`\`(.*?)\`\`\`/g, (match, p1) => `<span class="font-mono">${p1}</span>`);
  return (
    <>
      <textarea value={bodyText} onChange={onBodyTextChange} name='body' id='body' className='w-full min-h-[124px] max-h-[124px] p-2 rounded border text-xs text-black font-mono focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600'></textarea>
      <span className='text-xs float-left rounded px-[4px] bg-gray-200 mr-1'>Bold: *text*</span>
      <span className='text-xs float-left rounded px-[4px] bg-gray-200 mr-1'>Italic: _text_</span>
      <span className='text-xs float-left rounded px-[4px] bg-gray-200 mr-1'>Strikethrough: ~text~</span>
      <span className='text-xs float-left rounded px-[4px] bg-gray-200 mr-1'>Monospace: ```text```</span>
      <span className='text-xs float-right'>Char: {bodyText?.length}/1024</span>
    </>
  );
};

export default BodyForm;
