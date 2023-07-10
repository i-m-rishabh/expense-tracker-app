import classes from './homeProfile.module.css';
const HomeProfile = (props) => {
    return(
        <div className={classes.main}>
            <div className={classes.imageContainer}>
                <img src={props.profilePhoto} alt='profile photo'/>
            </div>
            <div className={classes.nameContainer}>
                <p>{props.displayName}</p>
            </div>
        </div>
    )
}

export default HomeProfile;