import { useDispatch, useSelector } from "react-redux";
import {MdDarkMode, MdPictureAsPdf} from 'react-icons/md';
import {BsFillBrightnessHighFill} from 'react-icons/bs';
import { useRef, useState } from "react";
import { themeActions } from "../../store/theme";
import classes from './premium.module.css';

const Premium = () => {
    const [isPremium, setPremium] = useState(false);
    const dispatch = useDispatch();
    const expenseAmount = useSelector(state => state.expense.totalExpenseAmount);
    const expenses = useSelector(state => state.expense.expenses);
    const isDark = useSelector(state => state.theme.isDark);
    const downloadRef = useRef(null);
    
    //ACTIVATE PREMIUM FUNCTION
    function handleActivatePremium(){
        setPremium(true);
    }
    //THEME CHANGE FUNCTION
    function handleThemeChange(){
        dispatch(themeActions.toggleTheme());
    }
    //DOWNLOAD CSV FILE FUNCTION
    function handleDownloadFile(){
        //Generating csv formate text
        const file = expenses.map((expense) => {
            let exp = 'amount,category,description\n';
            for(let id in expense){
                if(id === 'id')
                    continue;
                exp = exp + expense[id] + ",";
            }
            return exp;
        }).join('\n');
        //Making blob and providing url to download it
        const blob = new Blob([file]);
        downloadRef.current.href = URL.createObjectURL(blob);
        console.log(file);
    }
    return(
        <div className={classes.main}>
            {!isPremium && expenseAmount > 10000 && <button onClick={handleActivatePremium} className={classes.button}>Activate Premium</button>}
            {isPremium && <div className={classes.features}>
                {isDark && <div onClick={handleThemeChange} className={classes.dark}><MdDarkMode/></div>}
                {!isDark && <div onClick={handleThemeChange} className={classes.light}><BsFillBrightnessHighFill/></div>}
                {<a ref={downloadRef} onClick={handleDownloadFile} download={"expenses.csv"}><div className={classes.pdf}><MdPictureAsPdf/></div></a>}
            </div>}
        </div>
    )
}

export default Premium;