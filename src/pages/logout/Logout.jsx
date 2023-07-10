import { useContext } from 'react';
import {AiOutlineLogout} from 'react-icons/ai'
import { useNavigate } from 'react-router-dom';
import { userContext } from '../../context/userContext/userContext';

const Logout = () => {
    const navigate = useNavigate();
    const userCtx = useContext(userContext);
    function handleLogout(){
        userCtx.userLoggedOut();
        navigate('/login');
    }
    return(
        <div onClick={handleLogout}>
            <AiOutlineLogout style={{fontSize:"30px",paddingRight:'2px'}}/>
        </div>
    )
}

export default Logout;