import React, { useEffect, useState } from 'react'
import Toolbar, { SubToolbar } from '../../components/Toolbar'
import { FaPlusCircle } from "react-icons/fa";
import "./Tasks.css"
import { Outlet, useNavigate } from 'react-router';
import MeetingReport from './TaskView';
import { VscAdd, VscTrash } from "react-icons/vsc";
import NewTask from './CreateTask';
import moment from "moment";
import useApiRequests from '../../hooks/useApiRequests';
import { useQuery } from 'react-query'
import { Spinner } from 'flowbite-react';
import TasksSubToolbar from './TasksSubToolbar';
import DeleteTask from './DeleteTask';
import CreateTask from './CreateTask';

const dateToStrFormat = () => {
  const date = moment(dateStr, 'YYYY-MM-DD');
  const formattedDate = date.format('ddd, Do MMM YYYY');
  return formattedDate
}

const TableHeading = ({children}) => {
  return (
    <table className="tasks-table w-full text-sm text-gray-500 text-center">
      <colgroup>
          <col style={{width:"35%"}} />
          <col style={{width:"25%"}} />
          <col style={{width:"20%"}} />
          <col style={{width:"20%"}} />
          <col style={{width:"5%"}} />
      </colgroup>
      <thead className="text-xs text-gray-600 capitalize">
          <tr>
              <th scope="col" className="px-4 py-3 text-left" >
                  Task Name
              </th>
              <th scope="col" className="px-4 py-3"> 
                  Status
              </th>
              <th scope="col" className="px-4 py-3"> 
                  Due Date
              </th>
              <th scope="col" className="px-4 py-3"> 
                  Priority
              </th>
              <th scope="col" className="px-4 py-3"></th>
          </tr>
      </thead>
      {children}
    </table>
  )
}

const TasksLoadingSpinner = () => {
  return (
    <>
      <TableHeading></TableHeading>
      <div className="flex justify-around items-center border bbg-gray-400 ml-2" style={{height: "90%"}}>
        <Spinner />
      </div>
    </>
  )
}

const EmptyTasksView = ({text, error, refetch}) => {
  return (
    <>
      <TableHeading></TableHeading>
      <div className="flex justify-around items-center border bbg-gray-400 ml-2" style={{height: "90%"}}>
      {!error ? <p className="text-gray-400">{text}</p> 
      :
      <p className="text-gray-400">Sorry, an error occurred. <span className="text-blue-500 cursour-pointer" onClick={()=>refetch()}>Try again</span></p>
      }
      </div>
    </>
  )
}

const TasksTableData = ({tasksData, selectCurrentTask, handleDeleteModalOpen}) => {
  const task = {
        title: "Boarding meeting",
        status: "uncompleted",
        date: "Dec 12, 2022",
        priority: "low"
      }
  return (
    <div style={{borderr: "1px solid green", height: "90%", overflowY: "scroll"}}>
    <TableHeading>
      <tbody>
        {tasksData.map((task) => {
          const statusColor = task.status === "completed" ? "bg-emerald-100 text-emerald-500" : "bg-amber-100 text-amber-400"
          const priorityColor = task.priority === "high" ? "bg-red-100 text-red-500" : "bg-blue-100 text-blue-400"
          return (
            <tr key={task._id} onClick={()=>selectCurrentTask(task._id)} className="group cursor-pointer bg-white border-b hover:bg-gray-100 hover:text-black">
                <td scope="row" className="py-2 font-medium whitespace-nowrap text-left dark:text-white">
                    <p>{task.title}</p>
                </td>
                <td className={`py-2 flex borderr justify-center items-center text-center`}>
                  <p className={`p-1 px-3 ${statusColor} rounded-md`}>{task.status}</p>
                </td>
                <td className="py-2">
                  <p>{moment(task.dueDate).format('ddd, Do MMM YYYY')}</p>
                </td>
                <td className="py-2 flex borderr justify-center items-center">
                  <p className={`p-1 px-3 ${priorityColor} rounded-md`}>{task.priority}</p>
                </td>
                <td className="text-xl text-gray-500"><VscTrash onClick={(e) => handleDeleteModalOpen(e, task._id)} className="invisible group-hover:visible hover:text-red-500"/></td>
            </tr>
          )
          })}
      </tbody>
  </TableHeading>
  </div>
  )
}

//  Sorting functions
const sortByDueDate = (data) => {
  const sortedTasks = [...data].sort((a, b) => Date.parse(b.dueDate) - Date.parse(a.dueDate))
  return sortedTasks
}

const sortByPriority = (data) => {
  const sortedTasks = [
    ...[...data].filter(task => task.priority === "high"),
    ...[...data].filter(task => task.priority !== "high")
  ]
  return sortedTasks
}

const sortByStatus = (data) => {
  const sortedTasks = [
    ...[...data].filter(task => task.status === "completed"),
    ...[...data].filter(task => task.status !== "completed")
  ]
  return sortedTasks
}

const Tasks = (props) => {
  const [createTaskModalOpen, setCreateTaskModalOpen] = useState(false)
  const [deleteTaskModalOpen, setDeleteTaskModalOpen] = useState(false)
  const { httpAuthGetAsync } = useApiRequests()
  const [tasks, setTasks] = useState([])
  const [currentTask, setCurrentTask] = useState(null)
  const [sortType, setSortType] = useState("")
  const [sortResults, setSortResults] = useState([])
  const [searchQuery, setSearchQuery] = useState("")
  const navigate = useNavigate()
  // console.log(deleteTaskModalOpen)
  // console.log(sortResults)

  const { isLoading, isFetching, error, isSuccess, refetch, data} = useQuery("/tasks", ()=>httpAuthGetAsync("/tasks"))

  const runSort = (type, data) => {
    if (type === "Due Date") {
      return sortByDueDate(data)
    } else if (type === "Priority") {
      return sortByPriority(data)
    } else if (type === "Status") {
      return sortByStatus(data)
    }
  }

  const handleSearch = (query, data) => {
    const results = [...data].filter(result => result.title.includes(query))
    return results
  }

  let tasksData = [];
  if (!isLoading && isSuccess){
    tasksData = data.tasks
    if(sortType) {
      console.log("using sort")
      tasksData = runSort(sortType, data.tasks)
    }
    if(searchQuery) {
      tasksData = handleSearch(searchQuery, data.tasks)
    }
  }

  useEffect(() => {
    if (isSuccess) {
      setTasks(data.tasks)
    }
  }, [data, isSuccess])

  const handleDeleteModalOpen = (e, id) => {
    console.log("delete modal")
    const task = tasks.find(task => task._id === id)
    setCurrentTask(task)
    setDeleteTaskModalOpen(true)
    e.stopPropagation()
  }

  const handleSearchQueryOnChange = (e) => {
    setSearchQuery(e.target.value)
  }

   const stopSort = () => {
    setSortResults([])
    setSortType("")
   }

  const selectCurrentTask = (id) => {
    const task = tasks.find(task => task._id === id)
    setCurrentTask(task)
    setCreateTaskModalOpen(true)
  }

  useEffect(() => {
    if (createTaskModalOpen) {
      navigate("/tasks/new-task")
    } else {
      navigate("/tasks")
    }
  }, [createTaskModalOpen])

  const TasksView = () => {
    if (isLoading) {
      return <TasksLoadingSpinner />
    } else if (error) {
        return <EmptyTasksView error={error} refetch={refetch} />
    } else if (!searchQuery && tasksData.length === 0) {
      return <EmptyTasksView text="You have no tasks. Add some?"/>
    } else if (searchQuery && tasksData.length === 0) {
      return <EmptyTasksView text="No tasks found for this query"/>
    }
    return (
      <TasksTableData 
      selectCurrentTask={selectCurrentTask}
      tasksData={tasksData} 
      handleDeleteModalOpen={handleDeleteModalOpen}
      />
    )
  }
  return (
    <>
      <TasksSubToolbar  
      heading="Tasks" 
      count={tasksData.length} 
      sortByDueDate={sortByDueDate} 
      sortType={sortType} 
      setSortType={setSortType} 
      stopSort={stopSort}
      searchQuery={searchQuery}
      handleSearchQueryOnChange={handleSearchQueryOnChange}/>
      <section className="content-section">
        <CreateTask
        setCurrentTask={setCurrentTask}
        task={currentTask}
        setTasks={setTasks}
        refetch={refetch}
        open={createTaskModalOpen} 
        setOpen={setCreateTaskModalOpen} 
        />
        <DeleteTask 
        open={deleteTaskModalOpen}
        task={currentTask}
        refetch={refetch}
        setOpen={setDeleteTaskModalOpen} 
        />
        <div onClick={()=>setCreateTaskModalOpen(true)} className="h-8v pl-6 pr-6 borderr border-black flex items-center gap-1 pt-2 pb-2 p-1 cursor-pointer hover:bg-blue-50 hover:text-blue-500">
          <VscAdd className="text-blue-500"/>
          <p className="">Add new task</p>
        </div>
        <div className="main-content-container relative">
          {TasksView()}
        </div>
      </section>
  </>
  )
}

export default Tasks