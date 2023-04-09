import { Dropdown, TextInput } from 'flowbite-react'
import React from 'react'
import { FaBell, FaSearch } from 'react-icons/fa'
import { VscClose } from 'react-icons/vsc'

export const SubToolbar = (props) => {
    return (
        <header className='pl-6 pr-6 m-0 h-9v border-b border-grey-400 flex items-center justify-between bg-white shadow-inner shadow-gray-300/50'>
            <div className="inline-flex items-center gap-1 borderr">
                <h1 className="text-xl font-semibold text-blue-500">{props.heading}</h1>
                <div className="rounded-full border border-gray-400  p-1 pl-2 pr-2">
                    <p style={{fontSize: ".75em"}} className="font-medium text-gray-500">{props.count}</p>
                </div>
            </div>
            <div>
            <Dropdown
            label="Sort"
            size="sm"
            inline={true}
            >
            <Dropdown.Item onClick={()=>props.setSortType("Status")}>
                Status
            </Dropdown.Item>
            <Dropdown.Item onClick={()=>props.setSortType("Due Date")}>
                Due Date
            </Dropdown.Item>
            <Dropdown.Item onClick={()=>props.setSortType("Priority")}>
                Priority
            </Dropdown.Item>
            </Dropdown>
            </div>
            {props.sortType && <div className="flex gap-1 items-center bg-gray-200 p-1 rounded-md">
                <p className="text-xs" style={{fontSize: ".65em"}}>Sorted by {props.sortType}</p>
                <VscClose style={{fontSize: ".75em"}} onClick={()=>props.stopSort()} className="cursor-pointer hover:text-red-500"/>
            </div>}
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