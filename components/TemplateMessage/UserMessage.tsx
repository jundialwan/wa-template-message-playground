import React from 'react';
import styled from 'styled-components';

const StyledUserMessage = styled.div`
  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 12px;
    height: 12px;
    background: url('/ornament/user.svg') no-repeat;
    background-size: cover;
  }
`;

const UserMessage = () => {
  return (
    <StyledUserMessage className='relative w-full min-h-[20px] bg-leaf rounded-lg shadow z-10 px-4 py-2 pb-2 text-black font-normal font-sans'>
      Hallo
    </StyledUserMessage>
  );
};

export default UserMessage;
