import {AiOutlineLogout} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { authActions } from '../../store/auth';
import { useDispatch } from 'react-redux';
import classes from './logout.module.css'
const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    function handleLogout(){
        dispatch(authActions.logout());
        localStorage.removeItem('idToken');
        localStorage.removeItem('localId');
        localStorage.removeItem('expenses');
        localStorage.removeItem('userProfile');
        localStorage.removeItem('totalExpenseAmount');

        navigate('/login');
    }
    return(
        <div onClick={handleLogout} className={classes.main}>
            <AiOutlineLogout style={{fontSize:"30px",paddingRight:'2px'}}/>
        </div>
    )
}

export default Logout;