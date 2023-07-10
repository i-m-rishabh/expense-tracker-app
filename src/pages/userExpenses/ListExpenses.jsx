import { useContext } from "react";
import expenseContext from "../../context/expenseContext/expenseContext";

const ListExpenses = () => {
    const expenseCtx = useContext(expenseContext);
    const expenses = expenseCtx.expenses;
    return(
        <div className="main">
            {
                expenses.map((expense)=>{
                    const {amount, description, category} = expense;
                    return(
                        <li key={Math.random()}>{amount} [{description}] {category}</li>
                    )
                })
            }
        </div>
    )
}

export default ListExpenses;