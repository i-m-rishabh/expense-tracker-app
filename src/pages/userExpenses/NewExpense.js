// import expenseContext from '../../context/expenseContext/expenseContext';
// import { userContext } from '../../context/userContext/userContext';
import classes from './newExpense.module.css'
import { useState } from "react";
import { authActions } from '../../store/auth';
import { expenseActions } from '../../store/expense';
import { useDispatch, useSelector } from 'react-redux';

const NewExpense = () => {
    // const userCtx = useContext(userContext);
    // const expenseCtx = useContext(expenseContext);
    const dispatch = useDispatch();
    const authData = useSelector(state => state.auth);
    const expenseData = useSelector(state => state.expense);
    const [amount, setAmount] = useState('');
    const [desc, setDesc] = useState('');
    const [cat, setCat] = useState('');
    const localId = authData.profile.localId;

    function handleAmountChange(evnt) {
        setAmount(parseFloat(evnt.target.value));
    }
    function handleCategoryChange(evnt) {
        setCat(evnt.target.value);
    }
    function handleDescChange(evnt) {
        setDesc(evnt.target.value);
    }

    function handleSubmit(evnt) {
        evnt.preventDefault();
        const newExpense = {
            amount: amount,
            description: desc,
            category: cat
        }
        // console.log(amount, desc, cat);
        // adding new expense to specific user's database
        fetch(`https://expense-tracker-react-ap-741f2-default-rtdb.firebaseio.com/expenses/${localId}.json`, {
            method: 'POST',
            body: JSON.stringify(newExpense),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    const expenseId = data.name;
                    // console.log(expenseId);
                    // expenseCtx.addExpense({ ...newExpense, id: expenseId });
                    dispatch(expenseActions.addNewExpense({...newExpense, id: expenseId}));
                    alert('expense added successfully');
                })
            } else {
                res.json().then((data) => {
                    alert(data.error.message);
                })
            }
        }).catch((err) => console.log(err)).finally(() => {
            // restting the values
            setAmount('');
            setCat('');
            setDesc('');
        });


    }
    return (
        <div className={classes.main}>
            <div className={classes.newExpense}>
                <h3>Add New Expense</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Amount </label>
                        <input type="float" onChange={handleAmountChange} value={amount}/>
                    </div>
                    <div>
                        <label>Description </label>
                        <input type="text" onChange={handleDescChange} value={desc}/>
                    </div>
                    <div>
                        <label>Category</label>
                        <select onChange={handleCategoryChange} value={cat}>
                            <option value='' disabled>select</option>
                            <option value='housing'>Housing</option>
                            <option value='trasportation'>Transportation</option>
                            <option value='food and dining'>Food and dining</option>
                            <option value='health'>Health</option>
                            <option value='Education'>Education</option>
                            <option value='misc'>Miscellaneous</option>
                        </select>
                    </div>
                    <div className={classes.buttonContainer}>
                        <button type="submit">Add</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default NewExpense;