import classes from './button.module.css';
const Button = ({text, type, onClick}) => {
    function handleClick(){
        if(onClick){
            onClick();
        }
    }
    return(
        <button type={type} onClick={handleClick} className={classes.button}>{text}</button>
    )
}

export default Button;