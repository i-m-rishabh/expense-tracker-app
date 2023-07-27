import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/auth";
import { expenseActions } from "../../store/expense";
import classes from './listExpenses.module.css';
import darkClasses from '../../dark.module.css';
import { useState } from "react";

const ListExpenses = (props) => {
    const [isLoading, setLoading] = useState(false);
    const isDark = useSelector(state => state.theme.isDark);
    const dispatch = useDispatch();
    const authData = useSelector(state => state.auth);
    const expenseData = useSelector(state => state.expense);
    const expenses = expenseData.expenses;
    const localId = authData.profile.localId;

    function handleDeleteExpense(id) {
        //deleting expense
        setLoading(true);
        fetch(`https://expense-tracker-react-ap-741f2-default-rtdb.firebaseio.com/expenses/${localId}/${id}.json`, {
            method: 'DELETE'
        }).then((res) => {
            setLoading(false);
            if (res.ok) {
                dispatch(expenseActions.deleteExpense(id));
                alert('expense successfully deleted');
            } else {
                res.json().then((data) => {
                    alert(data.error.message);
                })
            }
        }).catch((err) => {
            console.log(err);
        })
    }

    function handleEditExpense(id) {
        const expense = expenses.find((expense) => {
            return expense.id === id;
        })
        // send to expense values to form to edit
        props.onEdit(expense);
    }

    return (
        <div className={`${classes.main} ${isDark?darkClasses.dark:''}`}>
            {isLoading && <div className={classes.loadingOverlay}>
                <div className={classes.loadingSpinner}></div>
            </div>}
            {  
                expenses.map((expense) => {
                    const { id, amount, description, category } = expense;
                    return (
                        <li key={Math.random()} className={classes.li}>
                            <div className={classes.expenseGroup}>
                                <div className={classes.amount}>{amount}</div>
                                <div className={classes.expenseInfo}>
                                    <div className={classes.description}>{description}</div>
                                    <div className={classes.category}>{category}</div>
                                </div>
                            </div>
                            <div className={classes.buttonGroup}>
                                <div><button onClick={() => { handleEditExpense(id) }} className={classes.editButton}>edit</button></div>
                                <div><button onClick={() => { handleDeleteExpense(id) }} className={classes.deleteButton}>delete</button></div>
                            </div>
                        </li>
                    )
                })
            }
        </div>
    )
}

export default ListExpenses;