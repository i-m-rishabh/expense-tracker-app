import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Signup from "../pages/signup/Signup";
import App from "../App";
import Login from "../pages/login/Login";
import Home from "../pages/home/Home";
import UpdateProfilePage from "../pages/updateProfile/UpdateProfilePage";
const Router = () => {
    const router = createBrowserRouter([
        {path:'/', element: <App />},
        {path:'/signup', element: <Signup />},
        {path:'/login', element: <Login />},
        {path:'/home', element: <Home />},
        {path:'/update-profile', element: <UpdateProfilePage />},
    ])
    return(
        <RouterProvider router={router}/>
    )
}

export default Router;