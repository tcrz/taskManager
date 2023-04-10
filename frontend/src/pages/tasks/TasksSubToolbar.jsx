import { Dropdown, TextInput } from 'flowbite-react'
import React from 'react'
import { FaBell, FaSearch } from 'react-icons/fa'
import { VscClose } from 'react-icons/vsc'
import { useMediaQuery } from 'react-responsive'

const TasksSubToolbar = (props) => {
    const isTabletOrMobile = useMediaQuery({ query: '(max-width: 540px)' })
    return (
        <header className='pl-6 pr-6 m-0 h-9v border-b border-grey-400 flex gap-3 items-center justify-between bg-white shadow-inner shadow-gray-300/50'>
            <div className="inline-flex items-center gap-1 borderr">
                <h1 className="text-xl font-semibold text-blue-500">{props.heading}</h1>
                <div className="rounded-full border border-gray-400  p-1 pl-2 pr-2">
                    <p style={{fontSize: ".75em"}} className="font-medium text-gray-500">{props.count}</p>
                </div>
            </div>
            {!props.searchQuery && !isTabletOrMobile  && 
            <div className="bg-gray-200 rounded-md  p-1 px-2">
                <Dropdown
                label={`Sort by ${props.sortType}`}
                size="sm"
                inline={true}
                >
                <Dropdown.Item onClick={()=>props.setSortType("Default")}>
                    Default
                </Dropdown.Item>
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
            }
            {/* {props.sortType && <div className="flex gap-1 items-center bg-gray-200 p-1 rounded-md">
                <p className="text-xs" style={{fontSize: ".65em"}}>Sorted by {props.sortType}</p>
                <VscClose style={{fontSize: ".75em"}} onClick={()=>props.stopSort()} className="cursor-pointer hover:text-red-500"/>
            </div>} */}
            <div className="">
            <TextInput className="input-with-icon"
                id="search"
                type="text"
                placeholder="Search tasks"
                sizing="sm"
                required={true}
                icon={FaSearch}
                value={props.searchQuery}
                onChange={props.handleSearchQueryOnChange}
            />
            </div>
        </header>
    )
}

export default TasksSubToolbar