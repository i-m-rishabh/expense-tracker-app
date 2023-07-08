import classes from './signupLoginLayout.module.css';
const SignupLoginLayout = (props) => {
    return(
        <div className={classes.main}>
            {props.children}
        </div>
    )
}

export default SignupLoginLayout;