import { Button, Checkbox, Label, Modal, Radio, Select, Textarea, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'
import { RxDotFilled } from 'react-icons/rx'
import MultiSelect from '../../components/MultiSelect'
import LoadingButton from '../../components/LoadingButton'
import AlertLogger from '../../components/AlertLogger'
import moment from "moment";
import useApiRequests from '../../hooks/useApiRequests'


const todayDate = moment(moment().toDate()).format("YYYY-MM-DD")

const CreateTask = ({setTasks, open, setOpen, refetch}) => {
    const { httpAuthPostAsync, httpAuthGetAsync } = useApiRequests()
    const [title, setTitle] = useState("")
    const [dueDate, setDueDate] = useState(todayDate)
    const [status, setStatus] = useState("uncompleted")
    const [priority, setPriority] = useState("high")
    const [loading, setLoading] = useState(false)
    const [alert, setAlert] = useState(null)
    const titleInputRef = useRef(null)
    // console.log(titleInputRef.current)

    useEffect(() => {
        titleInputRef.current.focus()
    }, [title])

    const handleTaskTitleValueChange = (e) => {
        console.log(e.target.value)
        setTitle(e.target.value)
    }
    
    const handleDueDateChange = (e) => {
        setDueDate(e.target.value)
    }
    
    const handlePriorityValueChange = (e) => {
        console.log(e.target.value)
        setPriority(e.target.value)
    }
    
    const handleStatusValueChange = (e) => {
      console.log(e.target.value)
      setStatus(e.target.value)
    }

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
          setOpen(false)
        } catch(err) {
          if (err.response){
            setAlert({type: "failure", message: err.response.data.message})
          }
          console.log(err)
        }
        setLoading(false)
        console.log(taskBody)
      }

  return (
    <>
    <Modal
    // dismissible={true}
    show={open}
    size="xl"
    onClose={()=>setOpen(false)}
  >
    <form onSubmit={handleCreateTask} >
    <Modal.Header className="!p-3">
      Add Task Details
    </Modal.Header>
    <Modal.Body style={{overflowY:"scroll"}}>
        <div className="space-y-6 borderr">
        {alert && <AlertLogger type={alert.type} message={alert.message}/>}
            <div>
                <Label className="main-label" htmlFor="task-title" value="Task title"/>
                <TextInput
                ref={titleInputRef}
                id="task-title"
                type="text"
                placeholder="Enter task title"
                // required={true}
                onChange={handleTaskTitleValueChange}
                value={title}
                />
            </div>
            <div className="orderr border-red-500">
                <Label className="main-label" htmlFor="due-date" value="Due date"/>
                <TextInput
                id="due-date"
                type="date"
                placeholder="Enter task due date"
                required={true}
                value={dueDate}
                onChange={handleDueDateChange}
                />
                
            </div>
            <div className="borderr border-red-500 sm:grid sm:grid-cols-2 sm:gap-4 ">
                <div>
                    <Label className="main-label" htmlFor="priority" value="Priority" />
                    <div className="flex gap-4 mb-5" onChange={handlePriorityValueChange}>
                        <div>
                            <Radio className='mr-3 cursor-pointer'
                            id="high"
                            name="priority"
                            value="high"
                            defaultChecked={true}
                            />
                            <Label htmlFor="in-person">High</Label>
                        </div>

                        <div>
                            <Radio className='mr-3 cursor-pointer'
                            id="low"
                            name="priority"
                            value="low"
                            />
                            <Label htmlFor="online">Low</Label>
                        </div>
                    </div>
                </div>
                <div>
                    <Label className="main-label" htmlFor="status" value="Status" />
                    <div className="flex gap-4" onChange={handleStatusValueChange}>
                        <div>
                            <Radio className='mr-1 cursor-pointer'
                            id="uncompleted"
                            name="status"
                            value="uncompleted"
                            defaultChecked={true}
                            />
                            <Label htmlFor="online">Uncompleted</Label>
                        </div>
                        <div>
                            <Radio className='mr-1 cursor-pointer'
                            id="completed"
                            name="status"
                            value="completed"
                            />
                            <Label htmlFor="completed">Completed</Label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Modal.Body>
    <Modal.Footer className="!p-3 justify-end">
    <Button color="grey" className="text-gray-400 border-none" onClick={()=>setOpen(false)}>
       Cancel
      </Button>
      <LoadingButton type="submit" disabled={loading} loading={loading} className="'block text-sm text-white bg-blue-500 border border-blue-500 p-2 px-4 rounded-md hover:bg-blue-600 duration-150" text="Create Task" />
    </Modal.Footer>
    </form>
  </Modal>
  </>
  )
}

export default CreateTask