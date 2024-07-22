import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import { useBudget } from "../hooks/useBudget"
import { AmountDisplayComponent } from "./AmountDisplayComponent"
import "react-circular-progressbar/dist/styles.css"

export const BudgetTrackerComponent = () => {
   const {state, totalExpenses, remainingBudget, dispatch} = useBudget();

   const percentage = +(( totalExpenses/state.budget) * 100).toFixed(2)

   const dinamicColors = (percentage: number) : string => {
      if (percentage < 65) {
         return '#0E440D'
      }else if (percentage >= 65 && percentage < 90) {
         return '#A8520C'
      }else{
         return '#EA580C'
      }
   }


   return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5 ">
         <div className="flex justify-center">
            <CircularProgressbar
               value={percentage}
               styles={buildStyles({
                  pathColor: (dinamicColors(percentage)),
                  trailColor: '#DDF8DD',
                  textColor: (dinamicColors(percentage)),
                  textSize: '11'
               })}
               text={`${percentage}% Expent`}
            />
         </div>

         <div className="flex flex-col justify-center items-center gap-8">
            <button 
               type="button"
               className="bg-orange-600 w-full p-2 text-yellow-50 font-bold rounded-lg"
               onClick={() => dispatch({type: 'reset-budget'})}
            >
               Reset App
            </button>

            <AmountDisplayComponent 
               label="Budget"
               amount={state.budget}
            />
            <AmountDisplayComponent 
               label="Available"
               amount={remainingBudget}
            />
            <AmountDisplayComponent 
               label="Expent"
               amount={totalExpenses}
            />
         </div>
      </div>
   )
}