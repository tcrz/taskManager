import React, { useEffect, useState } from 'react'
import Toolbar, { SubToolbar } from '../../components/Toolbar'
import { FaPlusCircle } from "react-icons/fa";
import NewMeeting from './NewMeeting';
import "./Meetings.css"
import { Outlet, useNavigate } from 'react-router';
import MeetingReport from './MeetingReport';
import { VscAdd } from "react-icons/vsc";

const Meetings = () => {
  const [newMeetingOpen, setNewMeetingOpen] = useState(false)
  const [meetingReportOpen, setMeetingReportOpen] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    if (newMeetingOpen) {
      navigate("/workspace/meetings/new-meeting")
    } else {
      navigate("/workspace/meetings")
    }
  }, [newMeetingOpen])
  // open ? navigate("/workspace/meetings/new-meeting") : 
  
  // const newMeetingModal = () => {
  //   setOpen(true)
  //   navigate("/workspace/meetings/new-meeting")
  // }

  // const closeMeetingModal = () => {
  //   setOpen(true)
  //   navigate("/workspace/meetings/new-meeting")
  // }
  console.log(open)
  const meetingData = [
    {
      title: "Conference to discuss new development",
      status: "completed",
      date: "Mar 20, 2023",
      priority: "low"
    },
    {
      title: "Negotiations with SamFields Ltd.",
      status: "uncompleted",
      date: "Jan 12, 2023",
      priority: "high"
    },
    {
      title: "Boarding meeting",
      status: "uncompleted",
      date: "Dec 12, 2022",
      priority: "low"
    }
  ]
  return (
    <>
    {/* <h1>Meetings</h1> */}
      {/* <Toolbar /> */}
      <SubToolbar heading="Tasks" count="3"/>
      {/* <Outlet /> */}
      <section className="content-section">
        <NewMeeting open={newMeetingOpen} setOpen={setNewMeetingOpen}/>
        <MeetingReport open={meetingReportOpen} setOpen={setMeetingReportOpen} />
        <div onClick={()=>setNewMeetingOpen(true)} className="pl-6 pr-6 borderr border-black flex items-center gap-1 pt-2 pb-2 p-1 cursor-pointer hover:bg-blue-50 hover:text-blue-500">
        <VscAdd className="text-blue-500"/>
        <p className="">Add new task</p>
        </div>
        <div className="meetings-table-container relative overflow-y-scroll">
          <table className="meetings-table w-full text-sm text-gray-500 text-center">
            <colgroup>
                <col style={{width:"40%"}} />
                <col style={{width:"25%"}} />
                <col style={{width:"20%"}} />
                <col style={{width:"20%"}} />
            </colgroup>
            <thead className="text-xs text-gray-600 capitalize">
                <tr>
                    <th scope="col" className="px-4 py-3" >
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
                </tr>
            </thead>
            <tbody>
                {meetingData.map((meeting) => {
                  const statusColor = meeting.status === "completed" ? "bg-emerald-100 text-emerald-500" : "bg-amber-100 text-amber-400"
                  const priorityColor = meeting.priority === "high" ? "bg-red-100 text-red-500" : "bg-blue-100 text-blue-400"
                  return (
                    <tr onClick={()=>setMeetingReportOpen(true)} className="cursor-pointer bg-white border-b hover:bg-gray-100 hover:text-black">
                        <td scope="row" className="py-2 font-medium whitespace-nowrap dark:text-white">
                            <p>{meeting.title}</p>
                        </td>
                        <td className={`py-2 flex borderr justify-center items-center`}>
                          <p className={` p-1 px-3 ${statusColor} rounded-md`}>{meeting.status}</p>
                        </td>
                        <td className="py-2">
                          <p>{meeting.date}</p>
                        </td>
                        <td className="py-2 flex borderr justify-center items-center">
                          <p className={` p-1 px-3 ${priorityColor} rounded-md`}>{meeting.priority}</p>
                        </td>
                    </tr>
                  )
                  })}
            </tbody>
          </table>
        </div>
      </section>
  </>
  )
}

export default Meetings