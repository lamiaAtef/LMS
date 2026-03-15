import { useEffect, useRef, useState } from "react";
import { FaPlus } from "react-icons/fa";
import { HiMenu, HiX } from "react-icons/hi";
import { IoIosArrowDown } from "react-icons/io";
import useLogout from "../../../hooks/useLogOut";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import type { RootState } from "../../../redux/store";

export default function Navbar() {

  const user = useSelector((state:RootState) => state.auth.user);
  console.log(user);
const location = useLocation();
  const [open, setOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const{logoutUser}=useLogout();
  const getPageTitle = () => {
  switch (location.pathname) {
    case "/dashboard/dashboard":
      return "Dashboard";
    case "/dashboard/quiz":
      return "quiz";
    case "/dashboard/students":
      return "Students";
    case "/dashboard/groups":
      return "Groups";
    case "/dashboard/result":
      return "Results";
    default:
      return "Dashboard";
  }
};
  const logOut=()=>{
    logoutUser();
      setIsOpen(false);
  }

  useEffect(() => {
  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsOpen(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);

  return () => {
    document.removeEventListener("mousedown", handleClickOutside);
  };
}, []);
  return (
    <nav className="bg-white shadow-md fixed-top fixed w-screen pe-50 ">
      <div className="max-w-7xl mx-auto px-4">

        <div className="flex justify-between items-center h-16">

          {/* Logo */}
       <h2 className="font-bold">{getPageTitle()}</h2>

          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-6 text-gray-700">
            <div className="cursor-pointer">
              {/* <button className="flex items-center text-black px-4 py-2 rounded-2xl  font-bold border border-gray-300">
  <FaPlus className="mr-2" />
  New quiz
</button> */}
               </div>
             <div className="cursor-pointer border-l border-gray-300 pl-4">
              <h4 className="font-bold text-[#000000]">{user?.email}</h4>
              <h5 className="text-[#C5D86D]">{user?.role}</h5>
             </div>
                      <div className="relative w-40 " ref={dropdownRef}>

      <button
        onClick={() => setIsOpen(!isOpen)}

      >

      <span><IoIosArrowDown  size={30}/></span>
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-2 w-full bg-white  rounded shadow">
          <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer"  onClick={logOut}>
            Logout
          </li>
         <li  className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
          onClick={() => setIsOpen(false)}
         >
           <Link  to="/dashboard/profile">
               Profile
              </Link>
         </li>

        </ul>
      )}

    </div>



          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setOpen(!open)}
          >
            {open ? <HiX size={24} /> : <HiMenu size={24} />}
          </button>

        </div>

      </div>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden px-4 pb-4">
          <div className="space-y-3 text-gray-700">
            <div className="cursor-pointer border-l border-gray-300 pl-4">
              <h4 className="font-bold text-[#000000]">Nwabuikwu Chizuruoke</h4>
              <h5 className="text-[#C5D86D]">Instructor</h5>
             </div>
                       <div className="cursor-pointer">
              <button className="flex items-center text-black px-4 py-2 rounded-2xl  font-bold border border-gray-300">
  <FaPlus className="mr-2" />
  New quiz
</button>
               </div>

                            <div className="relative w-40">

      <button
        onClick={() => setIsOpen(!isOpen)}

      >

        <span><IoIosArrowDown  size={30}/></span>
      </button>

      {isOpen && (
        <ul className="absolute left-0 mt-2 w-full bg-white  rounded shadow">
          <li className="px-4 py-2  cursor-pointer">
            Logout
          </li>
          <li className="px-4 py-2  cursor-pointer">
            Profile
          </li>

        </ul>
      )}

    </div>

          </div>
        </div>
      )}
    </nav>
  );
}