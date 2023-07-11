import { useContext, useState } from "react";
import expenseContext from "../../context/expenseContext/expenseContext";
import { userContext } from "../../context/userContext/userContext";

const ListExpenses = (props) => {
    const expenseCtx = useContext(expenseContext);
    const expenses = expenseCtx.expenses;
    const userCtx = useContext(userContext);
    const localId = userCtx.localId;

    function handleDeleteExpense(id){
        // console.log(localId);
        // console.log(id);
        fetch(`https://expense-tracker-react-ap-741f2-default-rtdb.firebaseio.com/expenses/${localId}/${id}.json`,{
            method:'DELETE'
        }).then((res)=>{
            if(res.ok){
                expenseCtx.deleteExpense(id);
                alert('expense successfully deleted');
                // res.json().then((data)=>{
                //     console.log(data);   // it's ruturning null on success
                // })
            }else{
                res.json().then((data)=>{
                    alert(data.error.message);
                })
            }
        }).catch((err)=>{
            console.log(err);
        })
    }

    function handleEditExpense(id){
        // const [isEdit, setEdit] = useState(false);
        const expense = expenses.find((expense)=>{
            return expense.id === id;
        })
        // send to expense values to form to edit
        props.onEdit(expense);
    }
    
    return(
        <div className="main">
            {
                expenses.map((expense)=>{
                    const {id, amount, description, category} = expense;
                    return(
                        <li key={Math.random()}>{amount} [{description}] {category} <button onClick={()=>{handleEditExpense(id)}}>edit</button> <button onClick={()=>{handleDeleteExpense(id)}}>delete</button></li>
                    )
                })
            }
        </div>
    )
}

export default ListExpenses;