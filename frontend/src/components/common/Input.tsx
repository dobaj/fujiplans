import React from 'react'

interface inputProps {
    // colorPalette: string;
    labelName: string;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    type: string;
}
export default function Input({ labelName, onChange, value, type}: inputProps) {
  return (
    <>
      <label htmlFor={labelName} className="text-[#7C8A5C] text-base font-semibold">
        {labelName}
      </label>
      <input
        type={type}
        onChange={onChange}
        value={value}
        className="focus:outline-none p-[0.5rem] text-[#717568] border border-1 rounded-[1rem] w-full h-[4rem]"
        name={labelName}
        placeholder={labelName}
      />
    </>
  );
}