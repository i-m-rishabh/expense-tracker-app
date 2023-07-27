import { useState } from "react";
import ListExpenses from "./ListExpenses";
import NewExpense from "./NewExpense";
import EditExpense from "./EditExpense";
import classes from './expensePage.module.css'
import darkClasses from '../../dark.module.css';
import { useSelector } from "react-redux";

const ExpensePage = () => {
    const isDark = useSelector(state => state.theme.isDark);
    const [isEditableExpense, setEditableExpense] = useState('');
    let oldExpense;
    
    function handleOnEdit(expense){
        oldExpense = expense;
        // console.log(oldExpense);
        setEditableExpense(oldExpense);
    }
    function handleOnEdited(){
        setEditableExpense('');
    }
    return(
        <div className={`${classes.main} ${isDark?darkClasses.dark:''}`}>
            {!isEditableExpense && <div><NewExpense/></div>}
            {isEditableExpense && <div><EditExpense oldExpense={isEditableExpense} onEdited={handleOnEdited}/></div>}
            <ListExpenses onEdit={handleOnEdit} />
        </div>
    )
}
export default ExpensePage;

