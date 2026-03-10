

import { useState } from "react";
import { HiHome, HiUser, HiDocumentText, HiMenu } from "react-icons/hi";
import { FaPeopleGroup } from "react-icons/fa6";
import { NavLink } from "react-router-dom";
import logo_icon from "../../../assets/images/Logo icon.png"

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);

  const menuItems = [
    { icon: HiHome, label: "Dashboard",path:"/instractor" },
    { icon: HiUser, label: "Quizzes",path:"/instractor/quizzes" },
    { icon: FaPeopleGroup, label: "Students" ,path:"/instractor/student-list"},
    { icon: HiDocumentText, label: "Results",path:"/instractor/result" },
  ];

  return (
    <div className="flex h-screen ">
      {/* Sidebar */}
      <div className={`bg-white text-black transition-all duration-300 border border-gray-200   h-screen
        ${collapsed ? "w-25" : "w-64"}`}>

        {/* Collapse Button */}
      <div className="flex items-center">
          <button
          className="p-2 m-2   "
          onClick={() => setCollapsed(!collapsed)}
        >
          <HiMenu size={30} />
        </button>
        <img src={logo_icon} className="w-15 h-10"/>

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