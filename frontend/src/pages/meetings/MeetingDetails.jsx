import { Label, Radio, TextInput } from 'flowbite-react'
import React from 'react'
import { RxDotFilled } from "react-icons/rx";

const MeetingDetails = () => {
  const agenda = ["talk about salaries", "discuss gov. contract"]
  return (
    <div className="details p-2 space-y-6 borderr">
    <div>
        <Label className="main-label" htmlFor="meeting-title" value="Meeting title"/>
        <TextInput
            id="meeting-title"
            type="text"
            value="Business conference"
            disabled
        />
    </div>
    <div className="borderr border-red-500 sm:grid sm:grid-cols-2 sm:gap-4 ">
        <div className="">
            <Label className="main-label" htmlFor="meeting-date" value="Date"/>
            <TextInput
                id="meeting-date"
                type="date"
                value="2022-03-03"
                disabled
            />
        </div>

        <div>
            <Label className="main-label" htmlFor="meeting-time" value="Time"/>
            <TextInput
                id="meeting-time"
                type="time"
                value="14:00"
                disabled
            />
        </div>
    </div>
    <div>
        <Label className="main-label" htmlFor="in-person" value="Type" />
        <div className="flex gap-4">
            <div>
                <Radio className='mr-1'
                id="in-person"
                name="meeting-type"
                value="In-person"
                defaultChecked={true}
                // disabled
                />
                <Label htmlFor="in-person" className="!text-gray-400">In-person</Label>
            </div>

            <div>
                <Radio className='mr-1'
                id="online"
                name="meeting-type"
                value="Online"
                disabled
                />
                <Label htmlFor="online" className="!text-gray-400">Online</Label>
            </div>

            <div>
                <Radio className='mr-1'
                id="both"
                name="meeting-type"
                value="Both"
                disabled
                />
                <Label htmlFor="both" className="!text-gray-400">Both</Label>
            </div>
        </div>
        
    </div>
    <div>
        <Label className="main-label" htmlFor="meeting-location" value="Location" />
        <TextInput
            id="meeting-location"
            type="text"
            value="Alisa Hotel, Accra"
            placeholder="Enter meeting location"
            disabled
        />
    </div>
    {/* <div>
        <Label className="main-label" htmlFor="meeting-link" value="Add Meeting Link / URL" />
        <TextInput
            id="meeting-link"
            type="url"
            placeholder="Enter meeting link"
            disabled
        />
    </div> */}

    {/* { meetingType === "Both" && 
    <>
        <div>
            <Label className="main-label" htmlFor="meeting-location" value="Add Location" />
            <TextInput
                id="meeting-location"
                type="text"
                placeholder="Enter meeting location"
                disabled
            />
        </div>
        <div>
            <Label className="main-label" htmlFor="meeting-link" value="Add Meeting Link / URL" />
            <TextInput
                id="meeting-link"
                type="url"
                placeholder="Enter meeting link"
                disabled
            />
        </div>
    </>
    } */}
    {/* <div>
        <Label className="main-label" htmlFor="meeting-participants" value="Add Participants" />
        <MultiSelect/>
    </div> */}
    <div>
        <Label className="main-label" htmlFor="meeting-agenda" value="Agenda" />
        {/* <TextInput ref={agendaInputRef} className="text-sm"
            id="meeting-agenda"
            type="text"
            placeholder="Type and press enter to add agenda"
            disabled
            value={agendaItem}
        /> */}
        <div className="">
            <ul>
                {agenda.map((item, id) =>
                <li key={id} className="group flex items-center justify-between p-1 border-b text-gray-400">
                    <div className="inline-flex items-center gap-2"><RxDotFilled className="text-gray-400"/><p className="text-sm">{item}</p></div>
                </li>
                )}
            </ul>
            
        </div>
    </div>
    
</div>
  )
}

export default MeetingDetails