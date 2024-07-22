import { ReactNode } from "react"

type ErrorMessageProps = {
   children: ReactNode
}

export const ErrorMessage = ({children} : ErrorMessageProps) => {
   return (
      <p className="bg-orange-600 text-white font-bold text-sm text-center">
         {children}
      </p>
   )
}

