import { Link } from 'react-router-dom';
import classes from './app.module.css';
import image from './assets/img1.jpg';

function App() {
  return (
    <div className={classes.main}>
      <div className={classes.header}>
        <div className={classes.logo}>Expenso</div>
        <div className={classes.loginDiv}><Link to={'./login'} className={classes.loginLink}>login</Link></div>
      </div>
      <div className={classes.content}>
        <div className={classes.left}>
          <div className={classes.welcomeText}>Track, Analyze, and Save with Expenso - Your Personal Finance Companion!</div>
          <div className={classes.leftBottom}>
            <div className={classes.signupDiv}><Link to={'./signup'} className={classes.signupLink}>signup</Link></div>
          </div>
        </div>
        <div className={classes.image}><img src={image} alt='problem with rendering'/></div>
      </div>
    </div>
  );
}

export default App;
