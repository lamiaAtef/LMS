import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthLayout from "./shared/components/AuthLayout/AuthLayout";
import NotFound from "./shared/components/NotFound/NotFound";
import Login from "./modules/AuthModule/components/Login/Login";
import Register from "./modules/AuthModule/components/Register/Register";
import ForgetPassword from "./modules/AuthModule/components/ForgetPassword/ForgetPassword";

import ChangePassword from "./modules/AuthModule/components/ChangePassword/ChangePassword";
import { ToastContainer } from "react-toastify";
import MasterLayout from "./shared/components/MasterLayout/MasterLayout";
import InstructorProtectedRoute from "./routes/InstructorProtectedRoute";
import Quiz from "./modules/InstractorModule/components/Quiz/Quiz";
import DashBoard from "./modules/InstractorModule/components/DashBoard/DashBoard";
import Groups from "./modules/InstractorModule/components/Groups/Groups";
import OneQuiz from "./modules/InstractorModule/components/OneQuiz/OneQuiz";
import StudentList from "./modules/InstractorModule/components/StudentList/StudentList";
import Profile from "./shared/components/Profile/Profile";
import Questions from "./modules/InstractorModule/components/Questions/Questions";
import Result from "./modules/InstractorModule/components/Result/Result";



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
          // {path:"reset-pass",element:<ResetPassword/>},
          {path:"change-pass",element:<ChangePassword/>},
        ]
      },
       {
        path:"/instructor",
        element:<InstructorProtectedRoute><MasterLayout/></InstructorProtectedRoute>,
        errorElement:<NotFound/>,
        children:[
          {index:true,element:<DashBoard/>},
          {path:"dashboard",element:<DashBoard/>},
          {path:"quiz" , element:<Quiz/>},
          {path:"quiz/:id" , element:<OneQuiz/>},
          {path:"groups" , element:<Groups/>},
          {path:"student-list",element:<StudentList/>},
          {path:"profile", element:<Profile/>},
          {path:"questions",element:<Questions/>},
          {path:"result",element:<Result/>},

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
