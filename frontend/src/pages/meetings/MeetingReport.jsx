import { Accordion, Button, Checkbox, Label, Modal, Radio, Textarea, TextInput } from 'flowbite-react'
import React, { useEffect, useRef, useState } from 'react'
import { FaPlus, FaRegCircle, FaRegTimesCircle } from 'react-icons/fa'
import { BiNotepad, BiTask } from "react-icons/bi";
import MultiSelect, { options } from '../../components/MultiSelect'
import MeetingDetails from './TaskDetails'
import "./MeetingReport.css"
import Select from 'react-select';
import { RxDotFilled } from 'react-icons/rx';

const MeetingReport = (props) => {
  const [toggleReportField, setToggleReportField] = useState(false)
  const [reports, setReports] = useState([])
  const [reportItem, setReportItem] = useState("")
  const reportInputRef = useRef(null)
  const agenda = [{value:"talk about salaries", label:"talk about salaries"}, {value:"discuss contract terms", label:"discuss contract terms"}]
  console.log(reportInputRef.current)

  useEffect(() => {
    if (toggleReportField) {
      reportInputRef.current.focus()
    }
}, [toggleReportField, reports, reportItem])

  const onReportInputChange = (e) => {
    // console.log(e.target.value)
    setReportItem(e.target.value)
}

const handleAddReport = (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        if (reportItem.trim().length === 0) {
            return
        }
        setReports(prev => [...prev, reportItem])
        setReportItem("")
    }
    
}

const removeReportItem = (id) => {
    const item = agenda[id]
    setReports([...agenda].filter(i => i !== item))
}

const handleSubmit = (e) => {
    e.perventDefault()
}
  return (
    <>
    <Modal
    // dismissible={true}
    show={props.open}
    size="6xl"
    onClose={()=>props.setOpen(false)}
  >
    <form onSubmit={handleSubmit} style={{ height:"100%"}}>
    <Modal.Header className="!p-3">
      Add Meeting Report
    </Modal.Header>
    <Modal.Body style={{borderr:"1px solid red", padding: ".5rem", colore:"blue", overflowY:"scroll", height: "79%"}}>
        <div className="report-container flex borderr border-emerald-600 p-0 gap-1">
          <div className="report borderr border-red-600 p-2">
            <div className="agenda-box w-full border mb-2">
              <div className="p-2 bg-grey-100 flex items-center gap-1 rounded" style={{background: "#F3F4F6"}}>
                <BiTask className="text-dark-blue"style={{fontSize: "1.2em"}}/>
                <h4 className="font-semibold text-sm text-dark-blue">Agenda discussions</h4>
              </div>
              <div className="report-input bg-gray-50 border-b border-gray-300 flex items-center gap-1 p-1 pl-2 pr-2">
                <FaPlus className="text-sm font-thin text-emerald-600"/>
                {/* <input type="text" placeholder="Add report/discussion note" className="p-1 border w-full text-sm" /> */}
                <p onClick={()=>setToggleReportField(prev => !prev)} className="text-blue-600 cursor-pointer text-sm hover:underline">{!toggleReportField ? "Add report/discussion note" : "Hide report/discussion input field"} </p>
              </div>
              {toggleReportField && <div className="bg-slate-100 p-3">
                <div className="flex flex-col gap-4">
                  <div className="sm:grid sm:grid-cols-2 sm:gap-4">
                    <div>
                      <Label className="main-label !font-thin" htmlFor="report-agenda" value="Select agenda" />
                      <Select options={agenda}
                      isSearchable={true}
                      className="basic-single"
                      classNamePrefix="select"/>
                    </div>
                    <div>
                      <Label className="main-label !font-thin" htmlFor="report-participant" value="Select participant" />
                      <Select options={options}
                      isSearchable={true}
                      className="basic-single"
                      classNamePrefix="select"/>
                    </div>
                  </div>
                  
                  <div>
                    <Label className="main-label !font-thin" htmlFor="report-notes" value="Report:" />
                    <Textarea ref={reportInputRef} className="text-sm"
                      
                      key="report-notes"
                      id="report-notes"
                      type="text"
                      placeholder="Type and press enter to add note"
                      // value={reportItem}
                      onChange={(e) => setReportItem(e.target.value)}
                      // onKeyPress={handleAddReport}
                      // required={true}
                    />
                  </div>
                  
                </div>
                {/* <Button className="bg-blue-500"> Add</Button> */}
              </div>}
              <div className="mt-3">
                  <ul>
                      {reports.map((item, id) =>
                      <li key={id} className=" group flex items-center justify-between p-1 border-b border-gray-200">
                          <div className="inline-flex items-center gap-2"><RxDotFilled className="!text-gray-400" style={{fontSize: "1em", color:"black"}}/><p className="text-sm">{item}</p></div>
                          <FaRegTimesCircle  style={{fontSize: "1.1em"}} onClick={()=>removeReportItem(id)} className="invisible cursor-pointer text-gray-400 group-hover:visible hover:text-gray-700"/>
                      </li>
                      )}
                  </ul> 
                </div>
            </div>
            <div className="agenda-box w-full">
              <div className="p-2 bg-grey-100 flex items-center gap-1 rounded" style={{background: "#F3F4F6"}}>
                <BiTask className="text-dark-blue" style={{fontSize: "1.2em"}}/>
                <h4 className="font-semibold text-sm text-dark-blue">Action Items</h4>
              </div>
              <div className="report-input bg-gray-50 border-b border-gray-300 flex items-center gap-1 p-1 pl-2 pr-2">
                <FaPlus className="text-sm font-thin text-emerald-600"/>
                <input type="text" placeholder="Add action item" className="p-1 border-none w-full text-sm" />
              </div>
            </div>
          </div>
          <div className="meeting-details bgg-gray-100 borderr border-blue-600">
            <Accordion className="rounded-none bg-gray-100" style={{height: "100%"}} >
              <Accordion.Panel>
                <Accordion.Title className="!p-3 focus:!ring-0 borderr border-b-grey-600 !rounded-none text-dark-blue">Meeting Details</Accordion.Title>
                <Accordion.Content className="bgf-red-300 overflow-y-scroll !p-1" style={{height: "80%"}}>
                  <MeetingDetails/>
                </Accordion.Content>
              </Accordion.Panel>
            </Accordion>
          </div>
        </div>
    </Modal.Body>
    <Modal.Footer className="!p-3 justify-end">
    <Button color="grey" className="text-gray-400 border-none" onClick={()=>props.setOpen(false)}>
       Cancel
      </Button>
      <Button type="submit" className="bg-blue-500">
        Make Report
      </Button>
    </Modal.Footer>
    </form>
  </Modal>
  </>
  )
}

export default MeetingReport