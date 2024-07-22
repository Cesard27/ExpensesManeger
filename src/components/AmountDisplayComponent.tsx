import { formatCurrency } from "../helpers"

type AmountDisplayComponentProps = {
   label?   : string
   amount   : number
}

export const AmountDisplayComponent = ({label, amount} : AmountDisplayComponentProps) => {
   return (
      <p className="text-2xl text-green-700 font-bold">
         {label && `${label}: `}
         <span className="font-black text-black">{formatCurrency(amount)}</span>
      </p>
   )
}