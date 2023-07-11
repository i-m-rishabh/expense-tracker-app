import SignupLoginLayout from '../../layouts/SignupLoginLayout';
import classes from './login.module.css';
import Input from '../../utils/Input';
import Button from '../../utils/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useContext, useState } from 'react';
import { userContext } from '../../context/userContext/userContext';
import expenseContext from '../../context/expenseContext/expenseContext';

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const userCtx = useContext(userContext);
    const expenseCtx = useContext(expenseContext);
    const navigate = useNavigate();
    let email;
    let password;
    function getUserExpenses(localId){
        fetch(`https://expense-tracker-react-ap-741f2-default-rtdb.firebaseio.com/expenses/${localId}.json`
        ).then((res)=>{
            if(res.ok){
                res.json().then((data)=>{
                    // console.log(data);
                    let expenses = [];
                    if(data){
                        // expenses = Object.values(data);
                        for(let expenseId in data){
                            expenses.push({...data[expenseId], id: expenseId});
                        }
                    }
                    expenseCtx.loadExpenses(expenses);
                    // console.log("fetched expenses"+ expenses);
                    navigate('/home');
                    alert('expenses fetched successfully');

                })
            }else{
                res.json().then((data)=>{
                    alert('expenses fetching fail: '+data.error.message);
                })
            }
        }).catch((err)=>{console.log(err)})
    }
    function getUserProfile(idToken){
        // useEffect(()=>{
            fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCoFYf3k4y5b6R_uejfdftwRMXSGn992rA",{
                method: 'POST',
                body: JSON.stringify({
                    idToken: idToken
                }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }).then((res)=>{
                res.json().then((data)=>{
                  if(res.ok){
                      const displayName = data.users[0].displayName;
                      const photoUrl = data.users[0].photoUrl;
                      const localId = data.users[0].localId;
                      const emailVerified = data.users[0].emailVerified;
                      
                      userCtx.updateUser(displayName, photoUrl, localId, emailVerified);
                      getUserExpenses(localId);
                    //   alert('profile updated successfully ');
                    // console.log(data.users.displayName);
                    // console.log(data.users[0].displayName);
                  }else{
                    alert('Error '+ data.error.message);
                    console.log(data);
                  } 
                //   navigate('/home');
                })
            }).catch((err)=>{console.log(err)})
        // },[])
    }
    async function userLogin(email, password) {
        const userData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }
        try {
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCoFYf3k4y5b6R_uejfdftwRMXSGn992rA', {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.ok) {
                const data = await res.json();
                userCtx.userLoggedIn(data.idToken);
                getUserProfile(data.idToken);
                // console.log(data.idToken);
                // console.log("congratulations! you have successfully logged in");
            } else {
                const data = await res.json();
                // console.log(data);
                setErrorMessage(data.error.message);
            }
        } catch (err) {
            console.log(err);
        }
    }
    function handleSubmit(event) {
        event.preventDefault();
        // console.log(email,password,confirmPassword);
        if (!email || !password) {
            setErrorMessage('All fields are mendatory');
            return;
        }
        userLogin(email, password);
        event.target.reset();
    }
    return (
        <div className={classes.main}>
            <SignupLoginLayout>
                <h2 className={classes.title}>Login</h2>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Input autocomplete='off' type={'email'} label={'Email'} auto onChange={(value) => { email = value; setErrorMessage('') }} />
                    <Input autocomplete='off' type={'text'} label={'Password'} onChange={(value) => { password = value;  setErrorMessage('') }} />
                    <Button text={'Login'} type={'submit'} />
                </form>
                <Link className={classes.forgetPassword} to={'/forget-password'}><p>Forget Passowrd</p></Link>
                <Link className={classes.customLink} to={'/signup'}><p className={classes.text}>Don't have an account <span className={classes.signupText}>signUp</span></p></Link>
                {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}
            </SignupLoginLayout>
        </div>
    )
}

export default Login;