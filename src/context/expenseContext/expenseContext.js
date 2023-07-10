import { createContext } from "react";

const expenseContext = createContext({
    expenses: [],
    loadExpenses: function (){},
    addExpense: function (){},
    deleteExpense: function (){},
    clearExpenses: function(){}
});

export default expenseContext;