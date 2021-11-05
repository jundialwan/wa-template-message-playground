import React, { ChangeEvent, FC } from 'react'

interface StyledInputProps {
  id: string, 
  name: string, 
  maxChar?: number, 
  value: string,
  onChange: (e: ChangeEvent<HTMLInputElement>) => void
}
const StyledInput: FC<StyledInputProps> = ({ id, maxChar, name, value, onChange }) => {
  return (
    <div>
      <input
        type="text"
        id={id}
        name={name}
        value={value}
        onChange={onChange} 
        className="w-full border py-1 px-2 rounded text-black text-sm focus:outline-none focus:ring-2 focus:ring-green-100 focus:border-green-600"
      />
      {maxChar !== undefined ? 
        <span className="text-xs float-right">Char: {value.length}/{maxChar}</span>
      : null}
    </div>
  )
}

export default StyledInput