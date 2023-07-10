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

    return(
        <div className={classes.main}>
            <div className={classes.header}>
                <div className={classes.welcome}>welcome to expense tracker</div>
                {!displayName && <div className={classes.incompleteProfileMessage}>your profile is incomplete <Link to={'/update-profile'}><button className={classes.button}>complete now</button></Link></div>}
                {displayName && <HomeProfile displayName={displayName} profilePhoto={photoUrl} className={classes.profile}/>}
            </div>
            <hr/>
        </div>
    )
}

export default Home;