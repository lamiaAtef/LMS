
import { HiHome, HiUser, HiDocumentText, HiMenu } from "react-icons/hi";
import { FaPeopleGroup } from "react-icons/fa6";
import { NavLink, useLocation } from "react-router-dom";
import logo_icon from "../../../assets/images/Logo icon.png"
import { MdGroups2 } from "react-icons/md";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../../../redux/store";

export default function Sidebar({ collapsed, setCollapsed }: any) {
  const { user } = useSelector((state: RootState) => state.auth);
  const location = useLocation();

  const menuItems = [
    { icon: HiHome, label: "Dashboard",path:"/dashboard" },
    { icon: FaPeopleGroup, label: "Students" ,path:"/dashboard/students"},
    { icon: MdGroups2, label: "Groups",path:"/dashboard/groups" },
     { icon: HiUser, label: "Quizz",path:"/dashboard/quiz" },
    { icon: HiDocumentText, label: "Results",path:"/dashboard/result" },
    
  ];
  if (user?.role !== "Instructor") {
  menuItems.splice(1, 1);
  menuItems.splice(1, 1);
}
console.log(menuItems)
  useEffect(()=>{
   const handleResize = () => {
      if (window.innerWidth < 768) {
        setCollapsed(true);
      } else {
        setCollapsed(false);
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
},[setCollapsed])

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
    <div className={` fixed top-0 left-0 bg-white text-black transition-all duration-300 border border-gray-200   h-screen
         ${collapsed ? "w-25" : "w-64"}`}>

        {/* Collapse Button */}
      <div className="flex items-center">
          <button
          className="p-2 m-2   "
          onClick={() => setCollapsed(!collapsed)}
        >
          <HiMenu size={30} />
        </button>
        {collapsed ?  <img src={logo_icon} className="w-8 h-5 mr-3"/>:  <img src={logo_icon} className="w-15 h-10"/>}

      </div>

        {/* Menu Items */}
        <nav className="mt-4">
        {menuItems.map((item, index) => {
  const isActive = location.pathname === item.path;

  return (
    <NavLink
      to={item.path}
      key={index}
      onClick={() => {
        if (window.innerWidth < 768) {
          setCollapsed(true);
        }
      }}
      className={`flex items-center p-6 cursor-pointer border-b border-gray-200
        ${isActive ? "bg-[#FFEDDF]" : "hover:bg-[#FFEDDF]"}`}
    >
      <item.icon
        size={40}
        className="bg-[#FFEDDF] text-[#0D1321] p-1"
      />
      {!collapsed && <span className="ml-4">{item.label}</span>}
    </NavLink>
  );
})}
        </nav>
      </div>

      {/* Main Content */}

    </div>
  );
}