import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isDark: false,
}
const themeSlice = createSlice({
    name:'theme',
    initialState,
    reducers:{
        toggleTheme(state){
            state.isDark = !state.isDark;
        }
    }
});

export const themeActions = themeSlice.actions;
export default themeSlice;