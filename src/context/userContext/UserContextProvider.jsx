import { userContext } from "./userContext"
const UserContextProvider = (props) =>{
    const context = {
        isLoggedIn:false,
        displayName:'',
        photoUrl:'',
        idToken:'',
        userLoggedIn: function (idToken){
            this.idToken = idToken;
            this.isLoggedIn = !!idToken;
        },
        updateUser: function (displayName, photoUrl){
            this.displayName = displayName;
            this.photoUrl = photoUrl;
        },
    }
    return(
        <userContext.Provider value={context}>{props.children}</userContext.Provider>
    )
}
export default UserContextProvider;