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
        },
        addNewExpense(state, action){
            const newExpense = action.payload;
            state.expenses = [...state.expenses, newExpense];
        },
        deleteExpense(state, action){
            const id = action.payload;
            const updatedExpenses = state.expenses.filter((expense)=>{
                return expense.id !== id;
            })
            state.expenses = [...updatedExpenses];
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
        },
    }
});

export const expenseActions = expenseSlice.actions;
export default expenseSlice;
