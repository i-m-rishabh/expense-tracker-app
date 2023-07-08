import { userContext } from "./userContext"
const UserContextProvider = (props) =>{
    const context = {
        isLoggedIn:false,
        idToken:'',
        userLoggedIn: function (idToken){
            this.idToken = idToken;
            this.isLoggedIn = !!idToken;
        },
    }
    return(
        <userContext.Provider value={context}>{props.children}</userContext.Provider>
    )
}
export default UserContextProvider;