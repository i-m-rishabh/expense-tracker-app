import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
// import App from './App';
import reportWebVitals from './reportWebVitals';
import Router from './routing/routeSetup';
import UserContextProvider from './context/userContext/UserContextProvider';
import ExpenseContextProvider from './context/expenseContext/ExpenseContextProvider';
import { Provider } from 'react-redux';
import store from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router />
    </Provider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();


// web API AIzaSyCoFYf3k4y5b6R_uejfdftwRMXSGn992rA
// realtimeDatabase https://expense-tracker-react-ap-741f2-default-rtdb.firebaseio.com/