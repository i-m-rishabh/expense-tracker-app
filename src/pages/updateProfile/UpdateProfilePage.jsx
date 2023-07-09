import { useContext, useRef } from 'react';
import classes from './updateprofile.module.css';
import { userContext } from '../../context/userContext/userContext';
import { Link } from 'react-router-dom';
const UpdateProfilePage = () => {
    const nameRef = useRef(null);
    const imageUrlRef = useRef(null);
    const userCtx = useContext(userContext);
    const idToken = userCtx.idToken;

    function updateProfile(name, imageUrl){
        // {"idToken":"[ID_TOKEN]","displayName":"[NAME]","photoUrl":"[URL]","returnSecureToken":true}
        const body = {
            idToken: idToken,
            displayName: name,
            photoUrl: imageUrl,
            returnSecureToken:true
        }

        fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCoFYf3k4y5b6R_uejfdftwRMXSGn992rA",{
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res)=>{
            if(res.ok){
                alert('profile update successfully');
            }else{
                res.json().then((data)=>{
                    alert('ERROR '+ data.error.message);
                    console.log(data);
                })
            }
        }).catch((err)=>{console.log(err)})
    }
    function handleSubmit(event){
        event.preventDefault();
        const name = nameRef.current.value;
        const imageUrl = imageUrlRef.current.value;
        // alert([name, imageUrl]);
        updateProfile(name, imageUrl);
    }
    return(
        <div className={classes.main}>
            <div className={classes.heading}>welcome to expense tracker</div>
            <div className={classes.content}>
                <h3>Profile Details</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Full Name </label>
                        <input type='text' ref={nameRef}/>
                    </div>
                    <div>
                        <label>Profile Image Url </label>
                        <input type='text' ref={imageUrlRef}/>
                    </div>
                    
                    <button>Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfilePage;