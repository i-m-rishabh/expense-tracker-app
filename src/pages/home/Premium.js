import { useDispatch, useSelector } from "react-redux";
import {MdDarkMode, MdPictureAsPdf} from 'react-icons/md';
import {BsFillBrightnessHighFill} from 'react-icons/bs';
import { useState } from "react";
import { themeActions } from "../../store/theme";
import classes from './premium.module.css';

const Premium = () => {
    const [isPremium, setPremium] = useState(false);
    const dispatch = useDispatch();
    const expenseAmount = useSelector(state => state.expense.totalExpenseAmount);
    const isDark = useSelector(state => state.theme.isDark);
    
    function handleActivatePremium(){
        setPremium(true);
    }
    function handleThemeChange(){
        dispatch(themeActions.toggleTheme());
    }
    return(
        <div className={classes.main}>
            {!isPremium && expenseAmount > 10000 && <button onClick={handleActivatePremium} className={classes.button}>Activate Premium</button>}
            {isPremium && <div className={classes.features}>
                {isDark && <div onClick={handleThemeChange} className={classes.dark}><MdDarkMode/></div>}
                {!isDark && <div onClick={handleThemeChange} className={classes.light}><BsFillBrightnessHighFill/></div>}
                {<div className={classes.pdf}><MdPictureAsPdf/></div>}
            </div>}
        </div>
    )
}

export default Premium;