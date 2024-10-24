import { ReactNode } from "react"

export const Box = ({ span, children }: { span: number, children: ReactNode }) => {
  return <div className="flex border-2 border-black rounded-2xl h-full" style={{gridColumn: `span ${span}` }}>
    <div className="m-5 flex flex-grow flex-col">
      {children}
    </div>
  </div>
}