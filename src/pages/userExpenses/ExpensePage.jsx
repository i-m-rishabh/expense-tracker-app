import { useState } from "react";
import ListExpenses from "./ListExpenses";
import NewExpense from "./NewExpense";
import EditExpense from "./EditExpense";

const ExpensePage = () => {
    const [isEditableExpense, setEditableExpense] = useState('');
    let oldExpense;
    function handleOnEdit(expense){
        oldExpense = expense;
        console.log(oldExpense);
        setEditableExpense(oldExpense);
    }
    function handleOnEdited(){
        setEditableExpense('');
    }
    return(
        <div>
            {!isEditableExpense && <NewExpense/>}
            {isEditableExpense && <EditExpense oldExpense={isEditableExpense} onEdited={handleOnEdited}/>}
            <ListExpenses onEdit={handleOnEdit} />
        </div>
    )
}
export default ExpensePage;

