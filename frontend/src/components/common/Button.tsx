import {  ReactNode } from "react"

export const Button = ({ children }: { children: ReactNode }) => {
  return (
  <div className="flex justify-center">
  <button className="flex w-min border-4 border-theme-green rounded-2xl justify-center bg-theme-bg-green hover:bg-theme-green">
    <div className="mx-5 my-2">
      {children}
    </div>
  </button>
  </div>
  )
}