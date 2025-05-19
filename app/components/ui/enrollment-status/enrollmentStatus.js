"use client"
import React, { useContext ,useState} from 'react'
import {dashboardContext} from '@/app/providers/dashboardProvider'
import Table from './table'

const enrollmentStatus = () => {
    const {show} = useContext(dashboardContext)
    const [department , setProgram] = useState("")
    const [semester, setSemester] = useState(1)
    console.log("department:",department);
    console.log("enrollment status rerender");
    
  return (
    <div className={`w-full h-[80vh] absolute  flex-icenter flex-col transition-all ease-in duration-300 ${show == 3? "translate-x-[0] visible" : "translate-x-[-200%]" }`}>
      
        <div className='w-[95%] h-10 mb-2.5 flex-icenter gap-10'>
            <div className='w-70  flex-rows gap-1'>
              <label>Department:</label>
              <select className='w-[60%] border-[2px] border-solid border-black' onChange={(e) => setProgram(e.target.value)}>
                  <option></option>
                  <option value={"CICT"}>CICT</option>
                  <option value={"CMBT"}>CMBT</option>
                  <option>COE</option>
              </select>
            </div>
            <div className='w-70  flex-rows gap-1'>
              <label>Semester:</label>
              <select className='w-[40%] border-[2px] border-solid border-black' onChange={(e) => setSemester(e.target.value)}>
                  <option value={1}>1st Sem</option>
                  <option value={2}>2nd Sem</option>
              </select>
            </div>
            <div className='w-70  flex-rows gap-1'>
              <label>Academic Year:</label>
              <select className='w-[40%] border-[2px] border-solid border-black'>
                  <option>2021-2022</option>
                  <option>2022-2023</option>
                  <option>2023-2024</option>
                  <option>BS2024-2025</option>
              </select>
            </div>
        </div>
        <div className='w-[95%] min-h-[95%] relative overflow-hidden bg-white shadow-[4px_4px_10px_rgba(0,0,0,.40)] z-0 '>
          {/* header */}
            <div className='w-full h-8 bg-tertiary flex-icenter pl-1 text-white '>
                <h1>Enrollment Status</h1>
            </div>
            {/* tables */}
            <div className='flex w-full  h-full absolute overflow-y-scroll hide-scrollbar' >
              <Table department={department} semester={semester}/>
            </div>
        </div>
    </div>
  )
}

export default enrollmentStatus
