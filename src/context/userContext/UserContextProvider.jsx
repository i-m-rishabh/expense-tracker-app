import { useState } from "react";
import { userContext } from "./userContext"
const UserContextProvider = (props) => {
    const storedToken = localStorage.getItem('idToken');
    const [idToken, setIdToken] = useState(storedToken);

    const storedUserInJson = localStorage.getItem('userData');
    let storedUser = {
        displayName: '',
        photoUrl: '',
        localId: '',
        emailVerified: false,
    }
    if (storedUserInJson) {
        storedUser = JSON.parse(storedUserInJson);
    }
    const [userData, setUserData] = useState(storedUser);
    const context = {
        isLoggedIn: !!idToken,
        localId: userData.localId,
        emailVerified: userData.emailVerified,
        displayName: userData.displayName,
        photoUrl: userData.photoUrl,
        idToken: idToken,
        userLoggedIn: function (idToken) {
            setIdToken(idToken);
            localStorage.setItem('idToken', idToken);
        },
        updateUser: function (displayName, photoUrl, localId, emailVerified) {
            const fetchedUserData = {
                displayName: displayName,
                photoUrl: photoUrl,
                localId: localId,
                emailVerified: emailVerified,
            }
            setUserData(fetchedUserData);
            localStorage.setItem("userData", JSON.stringify(fetchedUserData))
        },
    }
    return (
        <userContext.Provider value={context}>{props.children}</userContext.Provider>
    )
}
export default UserContextProvider;