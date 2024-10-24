import { ReactElement, ReactNode } from "react"

export const RowBox = ({ children }: { children: ReactNode }) => {
  return <div className="border-2 border-black rounded-2xl">
    <div className="mx-5 my-10">
      {children}
    </div>
  </div>
}