import { useContext, useEffect } from 'react';
import classes from './home.module.css';
import { Link } from 'react-router-dom';
import { userContext } from '../../context/userContext/userContext';
import HomeProfile from './HomeProfile';
const Home = () => {
    const userCtx = useContext(userContext);
    const idToken = userCtx.idToken;
    const displayName = userCtx.displayName;
    const photoUrl = userCtx.photoUrl;
    alert('in home page user '+[displayName, photoUrl]);
    // useEffect(()=>{
    //     fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCoFYf3k4y5b6R_uejfdftwRMXSGn992rA",{
    //         method: 'POST',
    //         body: JSON.stringify({
    //             idToken: idToken
    //         }),
    //         headers: {
    //             'Content-Type': 'application/json'
    //         }
    //     }).then((res)=>{
    //         res.json().then((data)=>{
    //           if(res.ok){
    //             alert('profile fetched sussessfuly');
    //             const displayName = data.users[0].displayName;
    //             const photoUrl = data.users[0].photoUrl;
    //             userCtx.updateUser(displayName, photoUrl);
    //             // console.log(data.users.displayName);
    //             // console.log(data.users[0].displayName);
    //           }else{
    //             alert('Error '+ data.error.message);
    //             console.log(data);
    //           } 
    //         })
    //     }).catch((err)=>{console.log(err)})
    // },[])
    return(
        <div className={classes.main}>
            <div className={classes.header}>
                <div className={classes.welcome}>welcome to expense tracker</div>
                {!displayName && <div className={classes.incompleteProfileMessage}>your profile is incomplete <Link to={'/update-profile'}><button className={classes.button}>complete now</button></Link></div>}
                {displayName && <HomeProfile displayName={displayName} profilePhoto={photoUrl} />}
            </div>
            <hr/>
        </div>
    )
}

export default Home;