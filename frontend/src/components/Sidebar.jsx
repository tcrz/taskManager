import React, { useContext, useEffect, useState } from 'react'
import { FaArrowLeft, FaRegCalendarAlt, FaTasks, FaClipboardCheck } from "react-icons/fa";
import user from "../assets/user.png"
import { NavLink } from "react-router-dom";
import { AuthContext } from '../context/authContext';
import { VscDashboard, VscTasklist, VscChecklist, VscNotebook, VscArrowLeft, VscMenu } from "react-icons/vsc";
import { useMediaQuery } from 'react-responsive'


const Sidebar = () => {
  const isNotLargeScreen = useMediaQuery({ query: '(max-width: 900px)' })
  const [open, setOpen] = useState(isNotLargeScreen ? false : true)
  console.log("sidebar open:", open)
  const { user } = useContext(AuthContext)
  const sidebarWidth = open ? "w-1/5" : "w-20"
  const { logOut } = useContext(AuthContext);
  

  useEffect(() => {
    if (isNotLargeScreen) {
      setOpen(false)
    } else {
      setOpen(true)
    }

  }, [isNotLargeScreen])
  
  const logout = (path) => {
    if (path === "/"){
      logOut()
    }
  }

  const menuItems = [
    {
      rootpath: "/dashboard",
      path: "/dashboard",
      name: "Dashboard",
      icon: <VscDashboard />,
    },
    {
      rootpath: "/tasks",
      path: "/tasks",
      name: "Tasks",
      icon: <VscNotebook />,
    },
    {
      path: "/",
      name: "Logout",
      icon: <VscArrowLeft />,
    }
  ];

  return (
    <div className={`fixed top-0 bottom-0 p-1 ${sidebarWidth} bg-gray-100 text-white border border-r drop-shadow-md relative transition-all duration-100`}>
      
       {/* MENU ITEMS CONTAINER */}
       <div className={`borderr border-red-500 w-full h-full flex flex-col ${!open && " items-center"} justify-between`}>
          {/* LOGO */}
          <div>
            <div className={`p-2 inline-flex justify-between gap-2 mb-20 borderr-b w-full items-center border-b borrder-gray-600`}>
              {/* <FaMailBulk className={`block float-left text-4xl bg-dark-purple rounded-md`}/> */}
              {/* <h1 className={`text-2xl ${!open && "hidden"}`}>VanCorp</h1> */}
              <p className={`text-gray-400 ${!open && "hidden"}`}>Welcome,&nbsp;{user.username}</p>
              {!isNotLargeScreen && <VscMenu onClick={()=>setOpen(prev => !prev)} className={`p-1 text-3xl cursor-pointer text-gray-400 ${!open && "rotate-180"}`}/>}
            </div>

            {/* MENU ITEMS */}
            <div className="menu-items borderr border-white flex flex-col gap-1">
              {menuItems.map((item, index) => {
                  return (
                    <NavLink onClick={()=>logout(item.path)} className="duration-200 flex gap-4 p-3 items-center text-gray-400 hover:bg-gray-200 hover:text-blue-500" to={item.path} key={index} >
                      <div className="text-xl">{item.icon}</div>
                      <div className={`item-text ${!open && "hidden"}`}>
                        <p>{item.name}</p>
                      </div>
                    </NavLink>
                  );
                })}
            </div>
          </div>

          {/* USER TAB */}
          <div className="pl-2 pb-1 pt-2 rounded-sm flex gap-2 items-center border-t">
           {/* <img src={user} alt="user" className="w-10 h-10 rounded-full"/> */}
           <div className="rounded-full p-1 pl-3 pr-3 bg-emerald-600">
              <p className=" text-white text-2xl">{user.username[0].toUpperCase()}</p>
           </div>
           {open && <div className="text-sm">
              <p className="text-gray-400">{user.username}</p>
              <p className="text-gray-400">User</p>
           </div>}
          
          </div>
       </div>
    </div>
  )
}

export default Sidebar