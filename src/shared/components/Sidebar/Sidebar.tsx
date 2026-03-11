

import { useState } from "react";
import { HiHome, HiUser, HiDocumentText, HiMenu } from "react-icons/hi";
import { FaPeopleGroup } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import logo_icon from "../../../assets/images/Logo icon.png"
import { MdGroups2 } from "react-icons/md";

export default function Sidebar({ collapsed, setCollapsed }: any) {

  const menuItems = [
    { icon: HiHome, label: "Dashboard",path:"/instructor" },
    { icon: FaPeopleGroup, label: "Students" ,path:"/instructor/students"},
    { icon: MdGroups2, label: "Groups",path:"/instructor/groups" },
     { icon: HiUser, label: "Quizz",path:"/instructor/quiz" },
    { icon: HiDocumentText, label: "Results",path:"/instructor/result" },
    
  ];

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
          {menuItems.map((item, index) => (
            <NavLink
            to={item.path}
              key={index}
              className="flex items-center p-6 hover:bg-[#FFEDDF] cursor-pointer border-b border-gray-200 "
            >
              <item.icon size={40}  className="bg-[#FFEDDF]  text-[#0D1321] p-1"/>
              {!collapsed && <span className="ml-4">{item.label}</span>}
            </NavLink>
          ))}
        </nav>
      </div>

      {/* Main Content */}

    </div>
  );
}