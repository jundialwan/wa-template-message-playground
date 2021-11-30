import React from 'react';
import tw, { styled, css } from 'twin.macro';

interface ButtonProps {
  variant?: 'primary' | 'secondary' | 'danger' | 'success' | 'default';
  size?: 'default' | 'small';
}

const Button = styled.button(({ variant, size }: ButtonProps) => [
  tw`disabled:cursor-not-allowed disabled:opacity-60 shadow-sm inline-flex rounded-lg font-medium tracking-wide active:scale-90 transition  focus:ring-2 ring-offset-2  border border-transparent outline-none`,
  variant === 'primary' && tw`bg-blue-600 hover:bg-blue-700 text-white ring-blue-600`,
  variant === 'secondary' && tw`bg-gray-600 hover:bg-gray-700 text-white ring-gray-600`,
  variant === 'danger' && tw`bg-red-600 hover:bg-red-700 text-white ring-red-600`,
  variant === 'default' && tw`bg-white hover:bg-gray-300 text-black ring-gray-300`,
  size === 'default' && tw`py-2 px-6 text-base`,
  size === 'small' && tw`py-1 px-3 text-sm`,
]);

export default Button;
