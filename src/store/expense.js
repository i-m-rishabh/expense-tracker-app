import { createSlice } from "@reduxjs/toolkit"

let storedExpenses  = [];
let totalExpenseAmount = 0;
const storedExpensesInJson = localStorage.getItem('expenses');
if(storedExpensesInJson){
    storedExpenses = JSON.parse(storedExpensesInJson);
    totalExpenseAmount = storedExpenses.reduce((acc, expense) => {
        return acc + expense.amount;
    }, 0);
}

const initialState = {
    expenses: storedExpenses,
    totalExpenseAmount: totalExpenseAmount,
}

const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        setFetchedExpenses(state, action) {
            state.expenses = [...action.payload];
            state.totalExpenseAmount = action.payload.reduce((acc, expense) => {
                return acc + expense.amount;
            }, 0);
        },
        addNewExpense(state, action) {
            const newExpense = action.payload;
            state.expenses = [...state.expenses, newExpense];
            state.totalExpenseAmount += newExpense.amount;
            // storing info to local storage
            localStorage.setItem('expenses',JSON.stringify([...state.expenses]));
            localStorage.setItem('totalExpenseAmount', JSON.stringify(state.totalExpenseAmount + newExpense.amount))
        },
        deleteExpense(state, action) {
            const id = action.payload;
            const updatedExpenses = state.expenses.filter((expense) => {
                return expense.id !== id;
            })
            state.expenses = [...updatedExpenses];
            const updatedExpenseAmount = updatedExpenses.reduce((acc, expense) => {
                return acc + expense.amount;
            }, 0);
            state.totalExpenseAmount = updatedExpenseAmount;
            //storing info to local storage;
            localStorage.setItem('expenses', JSON.stringify(updatedExpenses));
            localStorage.setItem('totalExpenseAmount',JSON.stringify(updatedExpenseAmount));

        },
        updateExpense(state, action) {
            const expense = action.payload;
            const updatedExpenses = state.expenses.map((item) => {
                if (item.id === expense.id) {
                    return expense;
                } else {
                    return item;
                }
            })
            state.expenses = [...updatedExpenses];
            const updatedExpenseAmount = updatedExpenses.reduce((acc, expense) => {
                return acc + expense.amount;
            }, 0);
            state.totalExpenseAmount = updatedExpenseAmount;
            //storing info to localStorage
            localStorage.setItem('expenses',JSON.stringify(updatedExpenses));
            localStorage.setItem('totalExpenseAmount',JSON.stringify(updatedExpenseAmount));
        },
    }
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice;
