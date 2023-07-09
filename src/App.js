import './App.css';
import { Link } from 'react-router-dom';

function App() {
  return (
    <>
      welcome to our website to continue please login or signup <Link to={'./login'}>login</Link>
    </>
  );
}

export default App;
