import { FC } from 'react';
import { classNames } from '../util';

const RadioButtonItem: FC<
  {
    label: string;
    isChecked?: boolean;
  } & React.InputHTMLAttributes<HTMLInputElement>
> = ({ label, isChecked, ...inputProps }) => {
  const cn = classNames(
    'flex flex-row items-center mr-2 gap-1 hover:bg-green-50 hover:text-green-700 p-1 px-2 rounded cursor-pointer',
    isChecked ? 'bg-green-50 text-green-700' : ''
  );

  return (
    <label className={cn} htmlFor={inputProps.id}>
      <input
        className='cursor-pointer'
        type='radio'
        id={inputProps.id}
        {...inputProps}
        checked={isChecked}
      />
      <span className='cursor-pointer'>{label}</span>
    </label>
  );
};

export default RadioButtonItem;
