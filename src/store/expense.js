import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    expenses: [],
    totalExpenseAmount: 0,
}

const expenseSlice = createSlice({
    name: 'expense',
    initialState,
    reducers: {
        setFetchedExpenses(state, action){
            state.expenses = [...action.payload];
            state.totalExpenseAmount = action.payload.reduce((acc,expense)=>{
                return acc + expense.amount;
            },0);
        },
        addNewExpense(state, action){
            const newExpense = action.payload;
            state.expenses = [...state.expenses, newExpense];
            state.totalExpenseAmount += newExpense.amount;
        },
        deleteExpense(state, action){
            const id = action.payload;
            const updatedExpenses = state.expenses.filter((expense)=>{
                return expense.id !== id;
            })
            state.expenses = [...updatedExpenses];
            state.totalExpenseAmount = updatedExpenses.reduce((acc,expense)=>{
                return acc + expense.amount;
            },0);
            
        },
        updateExpense(state, action){
            const expense = action.payload;
            const updatedExpenses = state.expenses.map((item)=>{
                if(item.id === expense.id){
                    return expense;
                }else{
                    return item;
                }
            })
            state.expenses = [...updatedExpenses];
            state.totalExpenseAmount = updatedExpenses.reduce((acc,expense)=>{
                return acc + expense.amount;
            },0);
        },
    }
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice;
