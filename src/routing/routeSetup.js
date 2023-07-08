import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "../pages/signup/Signup";
import App from "../App";
import Login from "../pages/login/Login";
const Router = () => {
    const router = createBrowserRouter([
        {path:'/', element: <App />},
        {path:'/signup', element: <Signup />},
        {path:'/login', element: <Login />},
        {path:'/home', element: <div>Home page here</div>},
    ])
    return(
        <RouterProvider router={router}/>
    )
}

export default Router;