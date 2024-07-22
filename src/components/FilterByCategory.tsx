import { ChangeEvent } from "react";
import { categories } from "../data/categories"
import { useBudget } from "../hooks/useBudget"

export const FilterByCategory = () => {

   const {dispatch} = useBudget();

   const onChange = (event: ChangeEvent<HTMLSelectElement>) => {
      dispatch({type: 'filter-category', payload: {id: event.target.value}})
   }

   return (
      <div className="bg-yellow-50 shadow-lg rounded-lg p-10">
         <form className="flex flex-col md:flex-row md:items-center gap-5">
            <label htmlFor="category">Filter Expenses</label>
            <select 
               id="category"
               className="bg-green-50 p-3 flex-1 rounded"
               onChange={onChange}
            >
               <option value="">-- All Categories --</option>
               {categories.map( category => (
                  <option value={category.id} key={category.id}>
                     {category.name}
                  </option>
               ))}
            </select>

         </form>
      </div>
   )
}
