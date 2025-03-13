import React from "react";

interface inputProps {
  // colorPalette: string;
  labelName: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  type: string;
}
export default function Input({
  labelName,
  onChange,
  value,
  type,
}: inputProps) {
  return (
    <div className="flex flex-col w-full">
      <label htmlFor={labelName} className="text-grad text-base font-semibold">
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
    </div>
  );
}
