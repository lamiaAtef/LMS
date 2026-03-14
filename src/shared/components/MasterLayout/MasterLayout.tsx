import { Outlet } from 'react-router-dom'

import { useState } from 'react';
import SideBar from '../Sidebar/Sidebar';
import NavBar from '../Navbar/Navbar';




export default function MasterLayout() {
   const [collapsed, setCollapsed] = useState(false);

  return (
    <>
    <div className='flex'>
      <div>
       <SideBar collapsed={collapsed} setCollapsed={setCollapsed}/>
       </div>
        <div className=  {`transition-all duration-300 container  w-full overflow-x-hidden
        ${collapsed ? "ml-24" : "ml-64"}`}>
          <NavBar/>
          <div className='mt-20'>
              <Outlet/>
          </div>
          
      </div>
    </div>

    </>
  )
}