import { useEffect, useState } from "react"
import type { DraftExpense, Value } from "../types"
import { categories } from "../data/categories"
import DatePicker from 'react-date-picker'
import 'react-calendar/dist/Calendar.css'
import 'react-date-picker/dist/DatePicker.css'
import { ErrorMessage } from "./ErrorMessage"
import { useBudget } from "../hooks/useBudget"

export const ExpenseFormComponent = () => {

   const [expense, setExpense] = useState<DraftExpense>({
      amount      : 0,
      expenseName : '',
      category    : '',
      date        : new Date()
   });

   const [error, setError] = useState('');
   const [previousAmount, setPreviousAmount] = useState(0);
   const {dispatch, state, remainingBudget} = useBudget();

   useEffect(() => {
      if (state.editingId) {
         const editingExpense = state.expenses.filter( currentExpense => 
            currentExpense.id === state.editingId)[0]
         setExpense(editingExpense)
         setPreviousAmount(editingExpense.amount)
      }
   }, [state.editingId]);

   const onChange = (event : React.ChangeEvent<HTMLInputElement> | React.ChangeEvent<HTMLSelectElement>) => {
      const {name, value} = event.target
      const isAmountField = ['amount'].includes(name)

      setExpense({
         ...expense,
         [name] : isAmountField ? +value : value,
      })
      
   }

   const onChangeDate = (value: Value) => {
      setExpense({
         ...expense,
         date: value
      })
   }

   const onSubmit = (event : React.FormEvent<HTMLFormElement>) => {
      event.preventDefault()

      //validate fields
      if (Object.values(expense).includes('')) {
         setError('All the fields are obligatory')
         return         
      }

      //validate limits
      if ((expense.amount - previousAmount)> remainingBudget) {
         setError(`Expense out of budget ${expense.amount} of ${remainingBudget}`)
         return    
      }

      //add 'n' edit new expense
      if (state.editingId) {
         dispatch({type: 'update-expense', payload: {expense: {id: state.editingId, ...expense}}})
      }else{
         dispatch({type: 'add-expense', payload: {expense}})
      }

      // need to search for this code in other place since it appears to exist but it's not in the place where the videos shows it, so i'm gonna copy here but i ned to look in other parts of the code
      setExpense({
         amount: 0,
         expenseName: '',
         category: '',
         date: new Date()
      })
      setPreviousAmount(0)
   }

   return (
      <form className="space-y-5" onSubmit={onSubmit}>
         <legend className="
            uppercase 
            text-center 
            text-2xl 
            font-black 
            border-b-4
            border-green-600 py-2">
               {state.editingId ? 'Edit Expense': 'New Expense'}
         </legend>

         {error && <ErrorMessage>{error}</ErrorMessage>}

         <div className="flex flex-col gap-2">
            <label 
               htmlFor="expenseName"
               className="text-xl"
            >Expense Name:</label>

            <input 
               type="text" 
               id="expenseName"
               placeholder="Add Expense Name"
               className="bg-yellow-50 p-2"
               name="expenseName"
               value={expense.expenseName}
               onChange={onChange}
            />
         </div>

         <div className="flex flex-col gap-2">
            <label 
               htmlFor="amount"
               className="text-xl"
            >Expense Value:</label>

            <input 
               type="number" 
               id="amount"
               placeholder="Add Expense Value"
               className="bg-yellow-50 p-2"
               name="amount"
               value={expense.amount}
               onChange={onChange}
            />
         </div>

         <div className="flex flex-col gap-2">
            <label 
               htmlFor="category"
               className="text-xl"
            >Category:</label>

            <select 
               id="category"
               className="bg-yellow-50 p-2"
               name="category"
               value={expense.category}
               onChange={onChange}
            >
               <option value="">-- Select --</option>
               {categories.map( category => (
                  <option 
                     value={category.id}
                     key={category.id}
                  >{category.name}</option>
               ))}
            </select>
         </div>

         <div className="flex flex-col gap-2">
            <label 
               htmlFor="amount"
               className="text-xl"
            >Expense Date:</label>

            <DatePicker
               className="bg-yellow-50 p-2 border-0"
               value={expense.date}
               onChange={onChangeDate}
            />
         </div>

         <input 
            type="submit"
            className="
               bg-green-900 
               cursor-pointer 
               w-full p-2 
               text-yellow-50
               uppercase
               font-bold
               rounded-lg"
            value={state.editingId ? 'Save Changes' : 'Record Expense'}
         />

      </form>
   )
}