import { useContext, useRef, useState } from 'react';
import classes from './updateprofile.module.css';
import { userContext } from '../../context/userContext/userContext';
import { useNavigate,} from 'react-router-dom';
import VerifyEmail from './VerifyEmail';
const UpdateProfilePage = () => {
    const [verificationSent, setVerificationSent] = useState(false);
    const navigate = useNavigate();
    const userCtx = useContext(userContext);
    const idToken = userCtx.idToken;
    const [displayName, setDisplayName] = useState(userCtx.displayName);
    const [photoUrl, setPhotoUrl] = useState(userCtx.photoUrl);

    function handleSendVerification(){
        
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCoFYf3k4y5b6R_uejfdftwRMXSGn992rA",{
            method: 'POST',
            body: JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken: idToken
            })
        }).then((res)=>{
            if(res.ok){
                setVerificationSent(true);
                alert('email verification sent. Enter the code and verify');
            }else{
                // alert("error in verification sending");
                res.json().then((data)=>{
                    alert(data.error.message);
                })   
            }
        }).catch((err)=>{console.log(err)})
    }
    function handleDisplayNameChange(e){
        setDisplayName(e.target.value);
    }
    function handlePhotoUrlChange(e){
        setPhotoUrl(e.target.value);
    }
    function updateProfile(name, imageUrl){
        // {"idToken":"[ID_TOKEN]","displayName":"[NAME]","photoUrl":"[URL]","returnSecureToken":true}
        const body = {
            idToken: idToken,
            displayName: displayName,
            photoUrl: photoUrl,
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
                res.json().then((data)=>{
                    userCtx.updateUser(data.displayName, data.photoUrl);
                    navigate('/home');
                })
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
        updateProfile(displayName, photoUrl);
    }
    return(
        <div className={classes.main}>
            <div className={classes.heading}>welcome to expense tracker</div>
            <div className={classes.content}>
                <h3>Profile Details</h3>
                <form onSubmit={handleSubmit}>
                    <div>
                        <label>Full Name </label>
                        <input type='text' onChange={handleDisplayNameChange} value={displayName}/>
                    </div>
                    <div>
                        <label>Profile Image Url </label>
                        <input type='text' onChange={handlePhotoUrlChange} value={photoUrl}/>
                    </div>
                    
                    <button>Update</button>
                </form>
                {userCtx.emailVerified && <p className={classes.verified}>Email Verified</p>}
                {!userCtx.emailVerified && !verificationSent && <p className={classes.notVerified}>Email is not verified <a className={classes.clickHere} type='button' onClick={handleSendVerification}> click here </a> to verify</p>}
                {verificationSent && <VerifyEmail />}
            </div>
        </div>
    )
}

export default UpdateProfilePage;