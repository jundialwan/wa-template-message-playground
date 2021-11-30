import BodyForm from '@/components/BodyForm';
import React, { FC, useState } from 'react';
import tw from 'twin.macro';
import HeaderImageInput from '../PushMessage/Header/HeaderImageInput';
import HeaderVideoInput from '../PushMessage/Header/HeaderVideoInput';
import HeaderDocInput from '../PushMessage/Header/HeaderDocInput';
import { useRecoilState } from 'recoil';
import { headerTypeSelector } from '@/Recoil/header';

const BubbleTypeInput: FC = () => {
  const [headerType, setHeaderType] = useRecoilState(headerTypeSelector);
  const onHeaderTypeChange = (e: any) => setHeaderType(e.target.value);

  return (
    <div tw='flex flex-col'>
      <label tw='block'>
        <select tw='block w-full mt-1 text-sm ' onClick={onHeaderTypeChange}>
          <option value='text'>Text</option>
          <option value='image'>Image</option>
          <option value='video'>Video</option>
          <option value='document'>Document</option>
          <option value='audio'>Audio</option>
          <option value='location'>Location</option>
          <option value='listMessage'>List Message</option>
          <option value='replyButton'>Reply Button</option>
          <option value='singleProduct'>Single Product Message</option>
          <option value='multiPlroduct'>Multi-product Message</option>
        </select>
      </label>
      {headerType === 'text' ? (
        <Wrapper>
          <div>
            <BodyForm />
          </div>
        </Wrapper>
      ) : null}
      {headerType === 'image' ? (
        <Wrapper>
          <div>
            <HeaderImageInput />
          </div>
        </Wrapper>
      ) : null}
      {headerType === 'video' ? (
        <Wrapper>
          <div>
            <HeaderVideoInput />
          </div>
        </Wrapper>
      ) : null}
      {headerType === 'document' ? (
        <Wrapper>
          <HeaderDocInput />
        </Wrapper>
      ) : null}
      {/* {headerType === 'location' ? <Wrapper>location</Wrapper> : null}
      {headerType === 'listMessage' ? <Wrapper>listMessage</Wrapper> : null}
      {headerType === 'replyButton' ? <Wrapper>replyButton</Wrapper> : null}
      {headerType === 'singleProduct' ? <Wrapper>singleProduct</Wrapper> : null}
      {headerType === 'multiPlroduct' ? <Wrapper>multiPlroduct</Wrapper> : null} */}
    </div>
  );
};

const Wrapper = tw.div`flex flex-col mt-4`;

export default BubbleTypeInput;
