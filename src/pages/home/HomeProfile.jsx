import classes from './homeProfile.module.css';
const HomeProfile = (props) => {
    return(
        <div className={classes.main}>
            <div className={classes.imageContainer}>
                {/* profile picture */}
                <img src={props.profilePhoto} alt='profile photo'/>
            </div>
            <div className={classes.nameContainer}>
                {/* profile name */}
                <p>{props.displayName}</p>
            </div>
        </div>
    )
}

export default HomeProfile;