import SignupLoginLayout from '../../layouts/SignupLoginLayout';
import classes from './login.module.css';
import Input from '../../utils/Input';
import Button from '../../utils/Button';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { authActions } from '../../store/auth';
import { expenseActions } from '../../store/expense';
import { useDispatch } from 'react-redux';

const Login = () => {
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();
    let email;
    let password;

    function handleSubmit(event) {
        event.preventDefault();
        if (!email || !password) {
            setErrorMessage('All fields are mendatory');
            return;
        }
        userLogin(email, password);
        event.target.reset();
    }

    async function userLogin(email, password) {
        setLoading(true);
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
                dispatch(authActions.login({ idToken: data.idToken }));

                //storing token in local storage
                localStorage.setItem('idToken', data.idToken);
                getUserProfile(data.idToken);
            } else {
                const data = await res.json();
                // console.log(data);
                setErrorMessage(data.error.message);
            }
        } catch (err) {
            console.log(err);
            setLoading(false);
        }
    }

    function getUserProfile(idToken) {
        // useEffect(()=>{
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyCoFYf3k4y5b6R_uejfdftwRMXSGn992rA", {
            method: 'POST',
            body: JSON.stringify({
                idToken: idToken
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            res.json().then((data) => {
                if (res.ok) {
                    const displayName = data.users[0].displayName;
                    const photoUrl = data.users[0].photoUrl;
                    const localId = data.users[0].localId;
                    const emailVerified = data.users[0].emailVerified;
                    const userProfile = {
                        displayName,
                        photoUrl,
                        localId,
                        emailVerified,
                    }
                    dispatch(authActions.updateUserProfile(userProfile));

                    //storing user profile in local Storage;
                    localStorage.setItem('userProfile', JSON.stringify(userProfile));
                    getUserExpenses(localId);
                } else {
                    alert('Error ' + data.error.message);
                    console.log(data);
                }
            })
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }
    function getUserExpenses(localId) {
        fetch(`https://expense-tracker-react-ap-741f2-default-rtdb.firebaseio.com/expenses/${localId}.json`
        ).then((res) => {
            if (res.ok) {
                res.json().then((data) => {
                    setLoading(false);
                    let expenses = [];
                    let totalExpenseAmount = 0;
                    if (data) {
                        for (let expenseId in data) {
                            expenses.push({ ...data[expenseId], id: expenseId });
                            totalExpenseAmount += data[expenseId].amount;
                        }
                    }
                    dispatch(expenseActions.setFetchedExpenses(expenses));

                    //storing expenses to local storage
                    localStorage.setItem('expenses', JSON.stringify(expenses));
                    localStorage.setItem('totalExpenseAmount', JSON.stringify(totalExpenseAmount));
                    setLoading(false);
                    navigate('/home');
                    // alert('expenses fetched successfully');

                })
            } else {
                res.json().then((data) => {
                    alert('expenses fetching fail: ' + data.error.message);
                })
                setLoading(false);
            }
        }).catch((err) => {
            console.log(err)
            setLoading(false)
        })
    }



    return (
        <div className={classes.main}>
            <SignupLoginLayout>
                <h2 className={classes.title}>Login</h2>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Input autocomplete='off' type={'email'} label={'Email'} auto onChange={(value) => { email = value; setErrorMessage('') }} />
                    <Input autocomplete='off' type={'text'} label={'Password'} onChange={(value) => { password = value; setErrorMessage('') }} />
                    <Button text={isLoading ? 'Loading...' : 'Login'} type={'submit'} />
                </form>
                <Link className={classes.forgetPassword} to={'/forget-password'}><p>Forget Passowrd</p></Link>
                <Link className={classes.customLink} to={'/signup'}><p className={classes.text}>Don't have an account <span className={classes.signupText}>signUp</span></p></Link>
                {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}
            </SignupLoginLayout>
        </div>
    )
}

export default Login;