import { useState } from "react";
import expenseContext from "./expenseContext";
import { json } from "react-router-dom";
const ExpenseContextProvider = (props) => {
    const storedExpensesInJson = localStorage.getItem('expenses');
    let storedExpenses = [];
    if(storedExpensesInJson){
        storedExpenses = JSON.parse(storedExpensesInJson);
    }
    const [expenses, setExpenses] = useState(storedExpenses);
    
    const context = {
        expenses: expenses,
        loadExpenses: function (expenses){
            setExpenses(expenses);
            localStorage.setItem('expenses',JSON.stringify(expenses));
        },
        addExpense: function (newExpense){
            setExpenses((prev)=>{
                const updatedExpenses =  [...prev, newExpense];
                localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
                return updatedExpenses;
            })

        },
        deleteExpense: function (){},
        clearExpenses: () => {
            setExpenses([]);
            localStorage.removeItem('expenses');
        }
    }
    return (
        <expenseContext.Provider value={context}>
            {props.children}
        </expenseContext.Provider>    
    )
}
export default ExpenseContextProvider;