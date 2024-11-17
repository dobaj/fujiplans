import { MouseEventHandler, ReactNode } from "react";

export const ClickableBox = ({
  children,
  onClick,
  darkMode,
}: {
  children: ReactNode;
  onClick: MouseEventHandler<HTMLDivElement>;
  darkMode: boolean;
}) => {
  return (
    <div
      className="border-2 border-black rounded-lg h-full"
      style={{ background: darkMode ? "#0A0E16" : "transparent" }}
      onClick={onClick}
    >
      <div className="m-5 flex h-full flex-col">{children}</div>
    </div>
  );
};
