import { TextInput } from 'flowbite-react'
import React from 'react'
import { FaBell, FaSearch } from 'react-icons/fa'

export const SubToolbar = (props) => {
    return (
        <header className='pl-6 pr-6 m-0 h-9v border-b border-grey-400 flex items-center justify-between bg-white shadow-inner shadow-gray-300/50'>
            <div className="inline-flex items-center gap-1 borderr">
                <h1 className="text-xl font-semibold text-blue-500">{props.heading}</h1>
                <div className="rounded-full border border-gray-400  p-1 pl-2 pr-2">
                    <p style={{fontSize: ".75em"}} className="font-medium text-gray-500">{props.count}</p>
                </div>
            
            </div>
            <div className="w-1/4">
            <TextInput className="input-with-icon"
                id="search"
                type="text"
                placeholder="Search tasks"
                sizing="sm"
                required={true}
                icon={FaSearch}
            />
            </div>
        </header>
    )
}

const Toolbar = () => {
  return (
    <header className='bg-white pl-8 pr-8 h-8v border-b border-grey-400 text-center'>
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