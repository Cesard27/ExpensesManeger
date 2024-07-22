import { useEffect, useMemo } from "react";
import {BudgetFormComponent} from "./components/BudgetFormComponent"
import { useBudget } from "./hooks/useBudget";
import { BudgetTrackerComponent } from "./components/BudgetTrackerComponent";
import { ExpenseModal } from "./components/ExpenseModal";
import { ExpenseList } from "./components/ExpenseList";
import { FilterByCategory } from "./components/FilterByCategory";

export const App = () => {

  const {state} = useBudget();
  const isValidBudget = useMemo(() => state.budget > 0, [state.budget]);
  
  useEffect(() => {
    localStorage.setItem('budget', state.budget.toString())
    localStorage.setItem('expenses', JSON.stringify(state.expenses))
  }, [state]);

  return (
    <>
      <header className="bg-green-900 py-8 max-h-72">
        <h1 className="uppercase text-center font-black text-4xl text-yellow-50">
          Expense Planner
        </h1>
      </header>

      <div className="max-w-3xl mx-auto bg-yellow-50 shadow-lg rounded-lg mt-10 p-10">
        {isValidBudget ? <BudgetTrackerComponent/> : <BudgetFormComponent />}
      </div>
      { isValidBudget && (
        <main className="max-w-3xl mx-auto py-10">
          <FilterByCategory />
          <ExpenseList />
          <ExpenseModal />
        </main>
        )}
    </>
  )
}
