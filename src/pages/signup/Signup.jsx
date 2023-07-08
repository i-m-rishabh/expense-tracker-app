import SignupLoginLayout from '../../layouts/SignupLoginLayout';
import classes from './signup.module.css';
import Input from '../../utils/Input';
import Button from '../../utils/Button';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Signup = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [successMessage, setSuccessMessage] = useState('');
    let email;
    let password;
    let confirmPassword;

    async function userSignUp(email, password) {
        const userData = {
            email: email,
            password: password,
            returnSecureToken: true,
        }
        try {
            const res = await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCoFYf3k4y5b6R_uejfdftwRMXSGn992rA', {
                method: 'POST',
                body: JSON.stringify(userData),
                headers: {
                    'Content-Type': 'application/json'
                }
            })
            if (res.ok) {
                const data = await res.json();
                // console.log(data);
                setSuccessMessage("congratulations! you have successfully signed up");
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
        if (!email || !password || !confirmPassword) {
            setErrorMessage('All fields are mendatory');
            return;
        }
        if (password !== confirmPassword) {
            setErrorMessage('passwords are not matching');
        }
        userSignUp(email, password);
        event.target.reset();
    }
    return (
        <div className={classes.main}>
            <SignupLoginLayout>
                <h2 className={classes.title}>SignUp</h2>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Input type={'email'} label={'Email'} onChange={(value) => { email = value; setSuccessMessage(""); setErrorMessage('') }} />
                    <Input type={'text'} label={'Password'} onChange={(value) => { password = value; setSuccessMessage(""); setErrorMessage('') }} />
                    <Input type={'password'} label={'Confirm Password'} onChange={(value) => { confirmPassword = value; setSuccessMessage(""); setErrorMessage('') }} />
                    <Button text={'sign up'} type={'submit'} />
                </form>
                <Link className={classes.customLink} to={'/login'}><p className={classes.text}>Already have a account <span className={classes.loginText}>login</span></p></Link>
                {errorMessage && <p className={classes.errorMessage}>{errorMessage}</p>}
                {successMessage && <p className={classes.successMessage}>{successMessage}</p>}
            </SignupLoginLayout>
        </div>
    )
}

export default Signup;