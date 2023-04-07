import { Button, Checkbox, Label, Modal, Radio, Select, Textarea, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { FaRegTimesCircle } from 'react-icons/fa'
import { RxDotFilled } from 'react-icons/rx'
import MultiSelect from '../../components/MultiSelect'

const NewTask = (props) => {
    const [meetingType, setMeetingType] = useState("In-person")
    const [agenda, setAgenda] = useState([])
    const [agendaItem, setAgendaItem] = useState("")
    const agendaInputRef = useRef(null)
    console.log(agendaInputRef.current)

    // useEffect(() => {
    //     agendaInputRef.current.focus()
    // }, [agenda, agendaItem])

    const handleRadioValueChange = (e) => {
        console.log(e.target.value)
        setMeetingType(e.target.value)
    }

    const onAgendaInputChange = (e) => {
        setAgendaItem(e.target.value)
    }

    const handleAgenda = (e) => {
        if (e.key === "Enter") {
            e.preventDefault();
            if (agendaItem.trim().length === 0) {
                return
            }
            setAgenda(prev => [...prev, agendaItem])
            setAgendaItem("")
        }
    }

    const removeAgendaitem = (id) => {
        const item = agenda[id]
        setAgenda([...agenda].filter(i => i !== item))
    }

    const handleSubmit = (e) => {
        e.perventDefault()
    }

  return (
    <>
    <Modal
    // dismissible={true}
    show={props.open}
    size="xl"
    onClose={()=>props.setOpen(false)}
  >
    <form onSubmit={handleSubmit} style={{ height:"100%"}}>
    <Modal.Header className="!p-3">
      Add Task Details
    </Modal.Header>
    <Modal.Body style={{overflowY:"scroll", height: "79%"}}>
        <div className="space-y-6 borderr">
            <div>
                <Label className="main-label" htmlFor="task-title" value="Task title"/>
                <TextInput
                    id="task-title"
                    type="text"
                    placeholder="Enter task title"
                    required={true}
                />
            </div>
            <div className="orderr border-red-500">
                <Label className="main-label" htmlFor="due-date" value="Due date"/>
                <TextInput
                    id="due-date"
                    type="date"
                    placeholder="Enter task due date"
                    required={true}
                />
                
            </div>
            <div className="borderr border-red-500 sm:grid sm:grid-cols-2 sm:gap-4 ">
                <div>
                    <Label className="main-label" htmlFor="priority" value="Priority" />
                    <div className="flex gap-4" onChange={handleRadioValueChange}>
                        <div>
                            <Radio className='mr-1 cursor-pointer'
                            id="high"
                            name="priority"
                            value="high"
                            defaultChecked={true}
                            />
                            <Label htmlFor="in-person">High</Label>
                        </div>

                        <div>
                            <Radio className='mr-1 cursor-pointer'
                            id="low"
                            name="priority"
                            value="Low"
                            />
                            <Label htmlFor="online">Low</Label>
                        </div>
                    </div>
                </div>
                <div>
                    <Label className="main-label" htmlFor="status" value="Status" />
                    <div className="flex gap-4">
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
    <Button color="grey" className="text-gray-400 border-none" onClick={()=>props.setOpen(false)}>
       Cancel
      </Button>
      <Button type="submit" className="bg-blue-500">
        Create Task
      </Button>
    </Modal.Footer>
    </form>
  </Modal>
  </>
  )
}

export default NewTask