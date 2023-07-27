import { useState } from 'react';
import classes from './updateprofile.module.css';
import { Link, useNavigate, } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from '../../store/auth';

const UpdateProfilePage = () => {
    const [isLoading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [verificationSent, setVerificationSent] = useState(false);
    const navigate = useNavigate();
    const authData = useSelector(state => state.auth);
    const idToken = authData.idToken;
    const [displayName, setDisplayName] = useState(authData.profile.displayName);
    const [photoUrl, setPhotoUrl] = useState(authData.profile.photoUrl);

    function handleSendVerification() {
        //sending verification to email
        setLoading(true);
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCoFYf3k4y5b6R_uejfdftwRMXSGn992rA", {
            method: 'POST',
            body: JSON.stringify({
                requestType: "VERIFY_EMAIL",
                idToken: idToken
            })
        }).then((res) => {
            setLoading(false);
            if (res.ok) {
                setVerificationSent(true);
                alert('email verification sent. Enter the code and verify');
            } else {
                res.json().then((data) => {
                    alert(data.error.message);
                })
            }
        }).catch((err) => { console.log(err) })
    }
    function handleDisplayNameChange(e) {
        setDisplayName(e.target.value);
    }
    function handlePhotoUrlChange(e) {
        setPhotoUrl(e.target.value);
    }
    function updateProfile(name, imageUrl) {
        // {"idToken":"[ID_TOKEN]","displayName":"[NAME]","photoUrl":"[URL]","returnSecureToken":true}
        const body = {
            idToken: idToken,
            displayName: name,
            photoUrl: imageUrl,
            returnSecureToken: true
        }
        //updating user data into database
        setLoading(true);
        fetch("https://identitytoolkit.googleapis.com/v1/accounts:update?key=AIzaSyCoFYf3k4y5b6R_uejfdftwRMXSGn992rA", {
            method: 'POST',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then((res) => {
            setLoading(false);
            if (res.ok) {
                alert('profile update successfully');
                res.json().then((data) => {
                    dispatch(authActions.updateUserProfile({
                        displayName: data.displayName,
                        photoUrl: data.photoUrl,
                    }))
                    navigate('/home');
                })
            } else {
                res.json().then((data) => {
                    alert('ERROR ' + data.error.message);
                    console.log(data);
                })
            }
        }).catch((err) => { console.log(err) })
    }
    function handleSubmit(event) {
        event.preventDefault();
        updateProfile(displayName, photoUrl);
    }
    return (
        <div className={classes.main}>
        <Link to={'/home'} className={classes.backToHome}>Home</Link>
            <div className={classes.content}>
                <h3>Profile Details</h3>
                <form onSubmit={handleSubmit} className={classes.form}>
                    <div>
                        <label>Full Name </label>
                        <input type='text' onChange={handleDisplayNameChange} value={displayName} />
                    </div>
                    <div>
                        <label>Profile Image Url </label>
                        <input type='text' onChange={handlePhotoUrlChange} value={photoUrl} />
                    </div>
                    <div>
                        <button className={classes.button}>{isLoading? 'loading...' : 'Update'}</button>
                    </div>
                </form>
                {authData.profile.emailVerified && <p className={classes.verified}>Email Verified</p>}
                {!authData.profile.emailVerified && !verificationSent && <p className={classes.notVerified}>Email is not verified <a className={classes.clickHere} type='button' onClick={handleSendVerification}> click here </a> to verify</p>}
                {verificationSent && <p>verification sent you email address pease verify and login again</p>}
            </div>
        </div>
    )
}

export default UpdateProfilePage;