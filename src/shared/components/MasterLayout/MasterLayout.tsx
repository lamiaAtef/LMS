
import { Outlet } from 'react-router-dom'
import Sidebar from '../Sidebar/Sidebar'
import Navbar from '../Navbar/Navbar'



export default function MasterLayout() {

  return (
    <>
    <div className='flex'>
      <div>
       <Sidebar />
       </div>
        <div className='container '>
          <Navbar/>
          <Outlet/>
      </div>
    </div>

    </>
  )
}
