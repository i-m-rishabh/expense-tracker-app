import { useState } from "react";
import expenseContext from "./expenseContext";
const ExpenseContextProvider = (props) => {
    const [expenses, setExpenses] = useState([]);
    const context = {
        expenses: expenses,
        loadExpenses: function (localId){},
        addExpense: function (newExpense){
            setExpenses((prev)=>{
                return [...prev, newExpense]
            })
        },
        deleteExpense: function (){},
    }
    return (
        <expenseContext.Provider value={context}>
            {props.children}
        </expenseContext.Provider>    
    )
}
export default ExpenseContextProvider;