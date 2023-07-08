import { useRef } from 'react';
import classes from './input.module.css';
const Input = ({label, type, onChange}) =>{
    const ref = useRef(null);
    function handleChange(){
        onChange(ref.current.value);
    }
    return(
        <div className={classes.inputGroup}>
            <label >{label}</label>
            <input type={type} onChange={handleChange} ref={ref}/>
        </div>
    )
}

export default Input;