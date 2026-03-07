import { Outlet } from 'react-router-dom'
import SideBar from '../SideBar/SideBar'
import NavBar from '../NavBar/NavBar'

export default function MasterLayout() {
  return (
    <>
      <div className='flex '>
        <div>
            <SideBar/>
        </div>
        <div className='w-full'>
            <NavBar/>
             <Outlet/>
        </div>
      </div>
     
    </>
  )
}

