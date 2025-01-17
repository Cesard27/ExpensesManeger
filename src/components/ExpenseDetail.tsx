import { useMemo } from "react"
import {
   LeadingActions,
   SwipeableList,
   SwipeableListItem,
   SwipeAction,
   TrailingActions
} from 'react-swipeable-list'
import { fomatDate } from "../helpers"
import { Expense } from "../types"
import { AmountDisplayComponent } from "./AmountDisplayComponent"
import { categories } from "../data/categories"
import 'react-swipeable-list/dist/styles.css'
import { useBudget } from "../hooks/useBudget"

type ExpenseDetailProps = {
   expense: Expense
}

export const ExpenseDetail = ({expense} : ExpenseDetailProps) => {

   const {dispatch} = useBudget()

   const categoryInfo = useMemo(() => categories.filter( category => category.id === expense.category)[0], [expense]);

   const leadingActions = () => (
      <LeadingActions>
         <SwipeAction
            onClick={() => dispatch({type: 'get-expense-by-id', payload: {id: expense.id}})}
         >
            Edit
         </SwipeAction>
      </LeadingActions>
   )

   const trailingActions = () => (
      <TrailingActions>
         <SwipeAction
            onClick={() => dispatch({type: 'remove-expense', payload: {id: expense.id}})}
            destructive={true}
         >
            Delete
         </SwipeAction>
      </TrailingActions>
   )
   return (
      <SwipeableList>
         <SwipeableListItem
            maxSwipe={1}
            leadingActions={leadingActions()}
            trailingActions={trailingActions()}
         >
            <div className="bg-yellow-50 p-5 w-full border-b border-gray-200 flex gap-5 items-center shadow-lg">
               <div>
                  <img 
                     src={`/icono_${categoryInfo.icon}.svg`} 
                     alt="icono gasto"
                     className="w-20"
                  />
               </div>

               <div className="flex-1 space-y-2">
                  <p className="text-sm font-bold uppercase text-green-950">{categoryInfo.name}</p>
                  <p>{expense.expenseName}</p>
                  <p className="text-slate-600 text-sm">{fomatDate(expense.date!.toString())}</p>
               </div>

               <AmountDisplayComponent
                  amount={expense.amount} 
               />
            </div>
         </SwipeableListItem>
      </SwipeableList>
   )
}
