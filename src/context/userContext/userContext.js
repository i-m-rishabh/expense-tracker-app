import { createContext } from "react";

const userContext = createContext({
    isLoggedIn:false,
    idToken:'',
    userLoggedIn: (idToken)=>{},
})
export {userContext};