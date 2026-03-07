import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthLayout from "./shared/components/AuthLayout/AuthLayout";
import NotFound from "./shared/components/NotFound/NotFound";
import Login from "./modules/AuthModule/components/Login/Login";
import Register from "./modules/AuthModule/components/Register/Register";
import ForgetPassword from "./modules/AuthModule/components/ForgetPassword/ForgetPassword";
import ResetPassword from "./modules/AuthModule/components/ResetPassword/ResetPassword";
import ChangePassword from "./modules/AuthModule/components/ChangePassword/ChangePassword";
import { ToastContainer } from "react-toastify";
import MasterLayout from "./shared/components/MasterLayout/MasterLayout";
import InstructorProtectedRoute from "./routes/InstructorProtectedRoute";
import DashBoard from "./modules/InstractorModule/components/DashBoard/DashBoard";
import Students from "./modules/InstractorModule/components/Students/Students";



function App() {
const routes = createBrowserRouter(
    [
      {
        path:"/",
        element:<AuthLayout/>,
        errorElement:<NotFound/>,
        children:[
          {index:true,element:<Login/>},
          {path:"login",element:<Login/>},
          {path:"register",element:<Register/>},
          {path:"forget-pass",element:<ForgetPassword/>},
          {path:"reset-pass",element:<ResetPassword/>},
          {path:"change-pass",element:<ChangePassword/>},
        ]
      },
       {
        path:"/instractor",
        element:<InstructorProtectedRoute><MasterLayout/></InstructorProtectedRoute>,
        errorElement:<NotFound/>,
        children:[
          {index:true,element:<DashBoard/>},
          {path:"dashboard",element:<DashBoard/>},
          {path:"students", element:<Students/>}
         
        ]
      },
   

    ]
  )
  return (
    <>

      <RouterProvider router={routes}></RouterProvider>
      <ToastContainer />

    </>
  )
}

export default App
