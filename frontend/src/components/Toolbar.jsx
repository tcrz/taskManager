import { Dropdown, TextInput } from 'flowbite-react'
import React from 'react'
import { FaBell, FaSearch } from 'react-icons/fa'
import { VscClose } from 'react-icons/vsc'

export const SubToolbar = (props) => {
    return (
        <header className='pl-6 pr-6 m-0 h-9v border-b border-grey-400 flex items-center justify-between bg-white shadow-inner shadow-gray-300/50'>
            <div className="inline-flex items-center gap-1 borderr">
                <h1 className="text-xl font-semibold text-blue-500">{props.heading}</h1>
            </div>
        </header>
    )
}

const Toolbar = ({children}) => {
  return (
    <header className='bg-white pl-6 h-8v border-b border-grey-400 flex items-center '>
        {children}
        {/* <div className="w-1/4">
        <TextInput className="input-with-icon"
            id="search"
            type="text"
            placeholder="Search"
            sizing="sm"
            required={true}
            icon={FaSearch}
        />
        </div> */}
        {/* <FaBell className='text-2xl float-right text-dark-blue'/> */}
    </header>
  )
}

export default Toolbar