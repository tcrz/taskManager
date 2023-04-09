import React from 'react'
import { FaBell, FaSearch } from 'react-icons/fa'
import { Outlet, useNavigate } from 'react-router'
import { Link } from 'react-router-dom'
import Sidebar from '../../components/Sidebar'
import { Label, TextInput } from 'flowbite-react'
import Toolbar, { SubToolbar } from '../../components/Toolbar'

const WorkSpace = () => {
  return (
    <div className="relative h-screen w-full borderr-2 border-dark-purple flex overflow-hidden">
        <Sidebar/>
        <main className="flex-1 bg-reed-400 overflow-hidden">
          <Outlet />
        </main>
    </div>
  )
}

export default WorkSpace