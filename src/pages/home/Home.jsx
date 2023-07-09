import classes from './home.module.css';
import { Link } from 'react-router-dom';
const Home = () => {
    return(
        <div className={classes.main}>
            <div className={classes.header}>
                <div className={classes.welcome}>welcome to expense tracker</div>
                <div className={classes.incompleteProfileMessage}>your profile is incomplete <Link to={'/update-profile'}><button className={classes.button}>complete now</button></Link></div>
            </div>
            <hr/>
        </div>
    )
}

export default Home;