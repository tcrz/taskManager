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

const EmptyTasksView = ({error, refetch}) => {
  return (
    <>
      <TableHeading></TableHeading>
      <div className="flex justify-around items-center border bbg-gray-400 ml-2" style={{height: "90%"}}>
      {!error ? <p className="text-gray-400">You have no tasks. Add some?</p> 
      :
      <p className="text-gray-400">Sorry, an error occurred. <span className="text-blue-500">Try again</span></p>
      }
      </div>
    </>
  )
}

const TasksTableData = ({tasksData, setMeetingReportOpen}) => {
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
            <tr key={task._id} onClick={()=>setMeetingReportOpen(true)} className="group cursor-pointer bg-white border-b hover:bg-gray-100 hover:text-black">
                <td scope="row" className="py-2 font-medium whitespace-nowrap text-left dark:text-white">
                    <p>{task.title}</p>
                </td>
                <td className={`py-2 flex borderr justify-center items-center text-center`}>
                  <p className={`p-1 px-3 ${statusColor} rounded-md`}>{task.status}</p>
                </td>
                <td className="py-2">
                  <p>{moment(task.date).format('ddd, Do MMM YYYY')}</p>
                </td>
                <td className="py-2 flex borderr justify-center items-center">
                  <p className={`p-1 px-3 ${priorityColor} rounded-md`}>{task.priority}</p>
                </td>
                <td className="text-xl text-gray-500 invisible group-hover:visible hover:text-red-500"><VscTrash/></td>
            </tr>
          )
          })}
      </tbody>
  </TableHeading>
  </div>
  )
}
const Tasks = (props) => {
  const [newTaskModalOpen, setNewTaskModalOpen] = useState(false)
  const { httpAuthGetAsync } = useApiRequests()
  const [tasks, setTasks] = useState([])
  const [meetingReportOpen, setMeetingReportOpen] = useState(false)
  const navigate = useNavigate()

  const { isLoading, isFetching, error, isSuccess, refetch, data} = useQuery("/tasks", ()=>httpAuthGetAsync("/tasks"))

  let tasksData;
  if (!isLoading && isSuccess){
    tasksData = data.tasks
  }

  useEffect(() => {
    if (isSuccess) {
      setTasks(data.tasks)
    }

  }, [data, isSuccess])



  useEffect(() => {
    if (newTaskModalOpen) {
      navigate("/workspace/tasks/new-task")
    } else {
      navigate("/workspace/tasks")
    }
  }, [newTaskModalOpen])

  const handleCreateTask = async (e) => {
    e.preventDefault()
    const taskBody = {
      title,
      status,
      priority,
      dueDate
    }
    try {
      setLoading(true)
      setAlert(null)
      const response = await httpAuthPostAsync("/tasks", taskBody)
      console.log(response)
      setTasks(prev => [response.task, ...prev])
      refetch()
      setNewTaskModalOpen(false)
    } catch(err) {
      if (err.response){
        setAlert({type: "failure", message: err.response.data.message})
      }
      console.log(err)
    }
    setLoading(false)
    console.log(taskBody)
  }
  // open ? navigate("/workspace/meetings/new-meeting") : 
  
  // const newMeetingModal = () => {
  //   setOpen(true)
  //   navigate("/workspace/meetings/new-meeting")
  // }

  // const closeMeetingModal = () => {
  //   setOpen(true)
  //   navigate("/workspace/meetings/new-meeting")
  // }
  // console.log(open)
  // const tasksData = [
  //   {
  //     title: "Conference to discuss new development",
  //     status: "completed",
  //     date: "Mar 20, 2023",
  //     priority: "low"
  //   },
  //   {
  //     title: "Negotiations with SamFields Ltd.",
  //     status: "uncompleted",
  //     date: "Jan 12, 2023",
  //     priority: "high"
  //   },
  //   {
  //     title: "Boarding meeting",
  //     status: "uncompleted",
  //     date: "Dec 12, 2022",
  //     priority: "low"
  //   }
  // ]

  const TasksView = () => {
    if (isLoading) {
      return <TasksLoadingSpinner />
    } else if (error) {
        return <EmptyTasksView error={error} refetch={refetch} />
    } else if (tasksData.length === 0) {
      return <EmptyTasksView />
    }
    return <TasksTableData tasksData={tasksData} setMeetingReportOpen={setMeetingReportOpen}/>
  }
  return (
    <>
    {/* <h1>Meetings</h1> */}
      {/* <Toolbar /> */}
      <SubToolbar heading="Tasks" count="3"/>
      {/* <Outlet /> */}
      <section className="content-section">
        <NewTask
        setTasks={setTasks}
        refetch={refetch}
        open={newTaskModalOpen} 
        setOpen={setNewTaskModalOpen} 
        />
        <MeetingReport open={meetingReportOpen} setOpen={setMeetingReportOpen} />
        <div onClick={()=>setNewTaskModalOpen(true)} className="h-6v pl-6 pr-6 borderr border-black flex items-center gap-1 pt-2 pb-2 p-1 cursor-pointer hover:bg-blue-50 hover:text-blue-500">
        <VscAdd className="text-blue-500"/>
        <p className="">Add new task</p>
        </div>
        <div className="tasks-table-container relative border border-red">
          {TasksView()}
         
        </div>
      </section>
  </>
  )
}

export default Tasks