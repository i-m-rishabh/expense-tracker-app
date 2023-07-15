import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    idToken: '',
    isLoggedIn: false,
    localId: '',
    profile: {
        displayName: '',
        photoUrl: '',
        localId: '',
        emailVerified: false,
    },
}
const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login(state, action) {
            state.idToken = action.payload.idToken;
            state.isLoggedIn = true;
        },
        logout(state) {
            state.idToken = '';
            state.localId = '';
            state.isLoggedIn = false;
        },
        updateUserProfile(state, action) {
            state.profile = {...action.payload}
        }
    }

});

export const authActions = authSlice.actions;
export default authSlice;