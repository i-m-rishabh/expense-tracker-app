import { useContext, useEffect } from 'react';
import classes from './home.module.css';
import { Link } from 'react-router-dom';
import { userContext } from '../../context/userContext/userContext';
import HomeProfile from './HomeProfile';
import Logout from '../logout/Logout';
import NewExpense from '../userExpenses/NewExpense';
import ListExpenses from '../userExpenses/ListExpenses';
import EditExpense from '../userExpenses/EditExpense';
import ExpensePage from '../userExpenses/ExpensePage';
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
                {displayName && <Link to={'/update-profile'}><HomeProfile displayName={displayName} profilePhoto={photoUrl} className=""/></Link>}
                {userCtx.isLoggedIn && <Logout/>}
            </div>
            <div>
                {/* <NewExpense/>
                <EditExpense/>
                <ListExpenses/> */}
                <ExpensePage/>
            </div>
        </div>
    )
}
export default Home;