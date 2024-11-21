import { ReactNode } from "react";

export const Box = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex border-2 border-black rounded-xl h-full">
      <div className="m-5 flex flex-grow flex-col">{children}</div>
    </div>
  );
};
