import React from 'react'
import { options } from '../../components/MultiSelect'
import { BiTask } from 'react-icons/bi'
import { FaPlus } from 'react-icons/fa'
import { Label } from 'flowbite-react'
import Select from 'react-select';

const MeetingReportForm = ({reports, agenda, onReportInputChange, reportItem, setToggleReportField, toggleReportField}) => {
  return (
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
                <input className="text-sm"
                autoFocus="autofocus"
                key="report-notes"
                id="report-notes"
                type="text"
                placeholder="Type and press enter to add note"
                value={reportItem}
                onChange={onReportInputChange}
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
  )
}

export default MeetingReportForm