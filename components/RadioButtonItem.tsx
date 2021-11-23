import { FC } from 'react';
import tw, { styled } from 'twin.macro';

const RadioButtonItem: FC<
  {
    label: string;
    isChecked?: boolean;
  } & React.InputHTMLAttributes<HTMLInputElement>
> = ({ label, isChecked, ...inputProps }) => {
  return (
    <RadioLabel htmlFor={inputProps.id} {...{ isChecked }}>
      <input tw='cursor-pointer' type='radio' id={inputProps.id} {...inputProps} checked={isChecked} />
      <span tw='cursor-pointer'>{label}</span>
    </RadioLabel>
  );
};

export default RadioButtonItem;

interface RadioLabelProps {
  isChecked?: boolean;
}

const RadioLabel = styled.label(({ isChecked }: RadioLabelProps) => [tw`flex flex-row items-center mr-2 gap-1 hover:bg-green-50 hover:text-green-700 p-1 px-2 rounded cursor-pointer`, isChecked ? 'bg-green-50 text-green-700' : '']);
