"use client";
import { MouseEventHandler, ReactNode } from "react";

const defaultProps = {
  className: "justify-center",
  background: "bg-[#D9918D] hover:bg-[#CF8783]",
};

export const GradButton = (inputProps: {
  children: ReactNode;
  className?: string;
  background?: string;
  onClick?: MouseEventHandler<HTMLButtonElement>;
}) => {
  const props = { ...defaultProps, ...inputProps };

  return (
    <div className={"flex " + props.className}>
      <button
        onClick={inputProps.onClick}
        className={
          "flex justify-center border-2  border-theme-stroke-red rounded-[3rem] text-white bg-grad hover:bg-[#00000080]"
        }
      >
        {props.children}
      </button>
    </div>
  );
};
