import { createSlice } from "@reduxjs/toolkit";
const storedIdToken = localStorage.getItem('idToken');
const storedProfileInJson = localStorage.getItem('userProfile');
let storedProfile = {
    displayName: '',
    photoUrl: '',
    localId: '',
    emailVerified: false,
}
if(storedProfileInJson){
    storedProfile = JSON.parse(storedProfileInJson);
}
const initialState = {
    idToken: storedIdToken || '',
    isLoggedIn: !!storedIdToken,
    profile: storedProfile,
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
            state.profile = {...state.profile, ...action.payload};
            localStorage.setItem('userProfile',JSON.stringify({...state.profile, ...action.payload}));
        }
    }

});

export const authActions = authSlice.actions;
export default authSlice;