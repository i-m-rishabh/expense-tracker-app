import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import expenseSlice from "./expense";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        expense: expenseSlice.reducer,
    }
});

export default store;