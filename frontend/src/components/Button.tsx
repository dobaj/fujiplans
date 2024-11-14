"use client";
import { MouseEventHandler, ReactNode } from "react";

const defaultProps = {
  className: "justify-center",
};

export const Button = (inputProps: {
  children: ReactNode;
  className?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  const props = { ...defaultProps, ...inputProps };
  return (
    <div className={"flex " + props.className}>
      <button
        onClick={inputProps.onClick}
        className="flex border-2 border-theme-stroke-red rounded-[3rem] justify-center bg-grad text-white hover:bg-[#00000080]"
      >
        {props.children}
      </button>
    </div>
  );
};
