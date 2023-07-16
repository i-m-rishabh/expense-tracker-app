import classes from './home.module.css';
import { Link } from 'react-router-dom';
import HomeProfile from './HomeProfile';
import Logout from '../logout/Logout';
import ExpensePage from '../userExpenses/ExpensePage';
import { useSelector } from 'react-redux';
import Premium from './Premium';
import darkClasses from '../../dark.module.css';

const Home = () => {

    const authData = useSelector(state => state.auth);
    const expenseData = useSelector(state => state.expense);
    const displayName = authData.profile.displayName;
    const photoUrl = authData.profile.photoUrl;
    const totalExpenseAmount = expenseData.totalExpenseAmount;
    const isDark = useSelector(state => state.theme.isDark);
    return(
        <div className={`${classes.main} ${isDark?darkClasses.dark:''}`}>
            <div className={classes.header}>
                <div className={classes.welcome}>expense tracker</div>
                {/* PREMIUM BUTTON */}
                {(totalExpenseAmount > 10000) && <div className={classes.premiumContainer}><Premium/></div>}
                {/* PROFILE CORNER */}
                {!displayName && <div className={classes.incompleteProfileMessage}>your profile is incomplete <Link to={'/update-profile'}><button className={classes.button}>complete now</button></Link></div>}
                {displayName && <div className={classes.profileContainer}><Link to={'/update-profile'}><HomeProfile displayName={displayName} profilePhoto={photoUrl}/></Link></div>}
                {/* LOGOUT BUTTON */}
                {authData.isLoggedIn && <div className={classes.button}><Logout/></div>}
            </div>
            <div className={classes.expenseContainer}>
                <ExpensePage/>
            </div>
        </div>
    )
}
export default Home;