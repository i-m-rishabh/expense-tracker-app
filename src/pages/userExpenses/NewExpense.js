import expenseContext from '../../context/expenseContext/expenseContext';
import classes from './newExpense.module.css'
import { useContext, useState } from "react";

const NewExpense = () => {
    const expenseCtx = useContext(expenseContext);
    const [amount, setAmount] = useState('');
    const [desc, setDesc] = useState('');
    const [cat, setCat] = useState('');
    function handleAmountChange(evnt){
        setAmount(parseFloat(evnt.target.value));
    }
    function handleCategoryChange(evnt){
        setCat(evnt.target.value);
    }
    function handleDescChange(evnt){
        setDesc(evnt.target.value);
    }
    function handleSubmit(evnt){
        evnt.preventDefault();
        const newExpense = {
            amount: amount,
            description: desc,
            category: cat
        }
        // console.log(amount, desc, cat);
        expenseCtx.addExpense(newExpense);
    }
    return(
        <div className={classes.main}>
            <div className={classes.newExpense}>
                <h3>Add New Expense</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Amount </label>
                        <input type="float" onChange={handleAmountChange}/>
                    </div>
                    <div>
                        <label>Description </label>
                        <input type="text" onChange={handleDescChange}/>
                    </div>
                    <div>
                        <label>Category</label>
                        <select onChange={handleCategoryChange}>
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