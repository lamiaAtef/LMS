import { Outlet } from 'react-router-dom'
import authImage from "../../../assets/images/authImage.png"
import logo from "../../../assets/images/logo.png"

export default function AuthLayout() {
  return (
    <>
      <div className='grid grid-cols-1 gap-3 lg:grid-cols-2 min-h-screen  bg-[#0D1321] p-8  box-border  '>
       
        <div className='text-white'>
          <img src={logo} alt='logo' className='w-50 mb-7'/>
          
          <Outlet/>
        </div>
         <div className=' flex items-center justify-center bg-[#FFEDDF] rounded-3xl hidden lg:flex ' >
            <img src={authImage} alt="authentication image" className='w-2/3 h-2/3 ' />
           
            
        </div>
      </div>
      
    </>
  )
}
