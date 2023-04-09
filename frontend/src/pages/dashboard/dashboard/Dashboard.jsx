import React, { useEffect, useState } from 'react'
import Toolbar from '../../../components/Toolbar'
import { SubToolbar } from '../../../components/Toolbar'
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import useApiRequests from '../../../hooks/useApiRequests';
import { useQuery } from 'react-query';
import { Dropdown, Spinner } from 'flowbite-react';

ChartJS.register(ArcElement, Tooltip, Legend);

export const chartData = {
  labels: ['High priority', 'Low priority'],
  datasets: [
    {
      label: '# of Tasks',
      data: [12, 19],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
      ],
      borderWidth: 1,
    },
  ],
};


const Dashboard = () => {
  const { httpAuthGetAsync } = useApiRequests()
  const [groupBy, setGroupBy] = useState("Priority")
  const [labels, setLabels] = useState([])
  const [dataValues, setDataValues] = useState([])
  const [backgroundColors, setBackgroundColors] = useState([])
  const [borderColors, setBorderColors] = useState([])
  const { isLoading, isFetching, error, isSuccess, refetch, data} = useQuery("/tasks", ()=>httpAuthGetAsync("/tasks"))

  console.log(labels)
  let tasksData = [];
  if (!isLoading && isSuccess){
    tasksData = data.tasks
  }

  useEffect(() => {
    if (groupBy === "Priority") {
      setLabels(["High Priority", "Low Priority"])
    }

    if (groupBy === "Status") {
      setLabels(["Completed", "Uncompleted"])
    }
    groupData(tasksData)

  }, [groupBy, tasksData])

  const groupData = (data) => {
    let v1, v2
    if (groupBy === "Priority"){
      v1 = data.filter((task) => task.priority === "high").length
      v2 = data.filter((task) => task.priority === "low").length
    }

    if (groupBy === "Status"){
      v1 = data.filter((task) => task.status === "completed").length
      v2 = data.filter((task) => task.status === "uncompleted").length
    }
    setDataValues([v1, v2])
  }

  const chartData = {
    labels: [...labels],
    datasets: [
      {
        label: '# of Tasks',
        data: [...dataValues],
        backgroundColor: [
          groupBy === "Priority" ? 'rgba(54, 162, 235, 0.2)' : 'rgb(209, 250, 229)',
          groupBy === "Priority" ? 'rgba(255, 99, 132, 0.2)' : 'rgb(254, 243, 199)',
        ],
        borderColor: [
          groupBy === "Priority" ? '#b4d7ef' : 'rgb(195, 223, 200)',
          groupBy === "Priority" ? '#f7b3c2' : 'rgb(226, 212, 159)',
        ],
        borderWidth: 1,
      },
    ],
  };
  return (
    <>
    <SubToolbar heading="Dashboard"/>
    <section className="content-section">
      <Toolbar>
        <p> Tasks data and metrics /&nbsp;</p>
        <div className="bg-gray-200 rounded-md  p-1 px-2">
          <Dropdown
            label="Group by"
            size="sm"
            inline={true}
            >
            <Dropdown.Item onClick={()=>setGroupBy("Status")}>
                Status
            </Dropdown.Item>
            <Dropdown.Item onClick={()=>setGroupBy("Priority")}>
                Priority
            </Dropdown.Item>
          </Dropdown>
          </div>
          <p>&nbsp; &#8212; {groupBy}</p>
      </Toolbar>
      <div className="main-content-container relative flex items-center justify-around p-5">
        {isLoading ? <Spinner/> : <Doughnut data={chartData} className="borderr"/>}
      </div>
    </section>
    </>
  )
}

export default Dashboard