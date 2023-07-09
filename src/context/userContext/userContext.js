import { createContext } from "react";

const userContext = createContext({
    isLoggedIn:false,
    localId:'',
    emailVerified:false,
    idToken:'',
    displayName:'',
    photoUrl:'',
    userLoggedIn: (idToken)=>{},
    updateUser: (displayName, photoUrl)=>{},
})
export {userContext};