import React from 'react';
import tw, { styled } from 'twin.macro';
import Button from '../Common/Button/Button';
import Card from '../Common/Card';

const Header = () => {
  return (
    <Card tw='flex items-center '>
      <Wrapper>
        <AutoSave>
          <SaveDate>Last Saved November 21, 2021 at 12:00:00 AM</SaveDate>
        </AutoSave>
        <Button variant='primary' size='small'>
          Present
        </Button>
        <Button variant='secondary' size='small'>
          Login
        </Button>
      </Wrapper>
    </Card>
  );
};

const Wrapper = tw.div`flex items-center space-x-2 w-full justify-end`;
const AutoSave = tw.div`flex space-x-2`;
const SaveDate = tw.p`text-sm text-gray-500 `;

export default Header;
