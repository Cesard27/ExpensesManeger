import { useMemo, useState } from "react";
import { useBudget } from "../hooks/useBudget";


export const BudgetFormComponent = () => {

   const [budget, setBudget] = useState(0);
   const {dispatch} = useBudget();

   const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
      setBudget(event.target.valueAsNumber)
   }

   const isValid = useMemo(() => {
      return isNaN(budget) || budget <= 0;
   }, [budget])

   const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      dispatch({type: 'add-budget', payload: {budget}});
   }

   return (
      <form className="space-y-5" onSubmit={onSubmit}>
         <div className="flex flex-col space-y-5">
            <label htmlFor="budget" className="text-4xl text-green-600 font-bold text-center">
               Define Budget
            </label>

            <input 
               id="budget"
               name="budget"
               type="number" 
               className="w-full bg-white border border-gray-200 p-2"
               placeholder="Define your budget"
               value={budget}
               onChange={onChange}
            />
         </div>

         <input 
            type="submit" 
            value='Define budget'
            className="
               bg-green-900 
               hover:bg-green-950
               cursor-pointer 
               w-full p-2 
               text-yellow-50 
               font-black 
               uppercase
               disabled:opacity-40
               "
            disabled={isValid}
         />
      </form>
   )
}
