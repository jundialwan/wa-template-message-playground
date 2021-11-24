import React, { FC, ReactNode } from 'react';
import tw, { styled } from 'twin.macro';

const Card: FC<{ children: ReactNode; className?: string }> = ({ children, className }) => {
  const Papper = styled.div`
    ${tw`bg-white px-4 py-2 shadow-sm rounded-sm`}
  `;
  return <Papper className={className}>{children}</Papper>;
};

export default Card;
