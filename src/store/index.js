import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import expenseSlice from "./expense";
import themeSlice from "./theme";

const store = configureStore({
    reducer: {
        auth: authSlice.reducer,
        expense: expenseSlice.reducer,
        theme: themeSlice.reducer,
    }
});

export default store;