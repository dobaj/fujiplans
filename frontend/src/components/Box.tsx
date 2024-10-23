import { ReactElement, ReactNode } from "react"

export const Box = ({ span, children }: { span: Number, children: ReactNode }) => {
  return <div className="flex border-2 border-black rounded-2xl" style={{gridColumn: `span ${span}` }}>
    <div className="m-5">
      {children}
    </div>
  </div>
}