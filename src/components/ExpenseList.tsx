import { useMemo } from "react";
import { useBudget } from "../hooks/useBudget"
import { ExpenseDetail } from "./ExpenseDetail";

export const ExpenseList = () => {

   const {state} = useBudget();
   
   const filteredExpenses = state.currentCategory 
   ? state.expenses.filter( expense => 
      expense.category === state.currentCategory) 
      : state.expenses

   const isEmpty = useMemo( () => filteredExpenses.length === 0, [filteredExpenses])

   return (
      <div className="mt-10">
         {isEmpty ? <p className="text-orange-400 text-2xl font-bold">No Expenses</p> : (
            <>
               <p className="text-green-600 text-2xl font-bold my-5">Expense List</p>
               {
                  filteredExpenses.map( expense => (
                     <ExpenseDetail 
                        key={expense.id}
                        expense={expense}
                     />
                  ))}
            </>
         )}
      </div>
   )
}