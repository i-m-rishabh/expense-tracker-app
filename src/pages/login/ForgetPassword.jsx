import { useState } from "react";
import { useNavigate } from "react-router-dom";
import classes from './forgetPassword.module.css';

const ForgetPassword = () => {
    const [isLoading, setLoading] = useState(false);
    const [email, setEmail] = useState('');
    const navigate = useNavigate();
    function handleEmailChange(e){
        setEmail(e.target.value);
    }
    function handleSubmit(e){
        e.preventDefault();
        setLoading(true);
        fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCoFYf3k4y5b6R_uejfdftwRMXSGn992rA',{
            method: 'POST',
            body: JSON.stringify({
                requestType: "PASSWORD_RESET",
                email: email
            })
        }).then((res)=>{
            setLoading(false);
            if(res.ok){
                alert('password reset link has sent to your email. Reset the password and login again');
                navigate('/login');
            }else{
                res.json().then((data)=>{
                    alert('ERROR '+data.error.message);
                })
            }
        }).catch((err)=>{console.log(err)})
    }
    return( 
        <div className={classes.main}>
            <h3>Forget Password</h3>

            <form onSubmit={handleSubmit}>
                <lable>Enter your Email</lable>
                <br/>
                <input type='email' onChange={handleEmailChange}/>
                <br/><br/>
                {!isLoading && <button type="submit">reset password</button>}
                {isLoading && <div className={classes.loader}></div>}
            </form>
        </div>
    )
}

export default ForgetPassword;