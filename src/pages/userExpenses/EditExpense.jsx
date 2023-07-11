import expenseContext from '../../context/expenseContext/expenseContext';
import { userContext } from '../../context/userContext/userContext';
import classes from './editExpense.module.css'
import { useContext, useState } from "react";

const EditExpense = ({oldExpense, onEdited}) => {
    // const {id, amount, description, category} = oldExpense;
    const userCtx = useContext(userContext);
    const expenseCtx = useContext(expenseContext);
    const [amount, setAmount] = useState(oldExpense.amount);
    const [desc, setDesc] = useState(oldExpense.description);
    const [cat, setCat] = useState(oldExpense.category);
    const localId = userCtx.localId;

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
        const updatedExpense = {
            id:oldExpense.id,
            amount: amount,
            description: desc,
            category: cat
        }
        // console.log(amount, desc, cat);
        //updating the expense
        fetch(`https://expense-tracker-react-ap-741f2-default-rtdb.firebaseio.com/expenses/${localId}/${oldExpense.id}.json`, {
            method: 'PUT',
            body: JSON.stringify(updatedExpense),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    // const expenseId = data.name;
                    // console.log(expenseId);
                    expenseCtx.updateExpense(updatedExpense);
                    alert('expense updated successfully');
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
            onEdited();
        });
    }
    function handleCancelEditExpense(){
        onEdited();
    }
    return (
        <div className={classes.main}>
            <div className={classes.newExpense}>
                <h3>Edit The Expense</h3>
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
                        <button type="submit">update</button>
                        <button type="submit" onClick={handleCancelEditExpense}>cancel</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditExpense;