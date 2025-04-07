import React, { useContext } from 'react'
import {dashboardContext} from '@/app/providers/dashboardProvider'

// this is static data only
const enrollStudent = [
  {id: 1, lastname: "doe", firstname: "john", middlename: "mill", studentid: "U25-124", yearlevel: 1, program: "BSIT"},
  { id: 2, lastname: "smith", firstname: "alice", middlename: "jane", studentid: "U25-125", yearlevel: 2, program: "BSCS" },
  { id: 2, lastname: "miller", firstname: "bob", middlename: "lee", studentid: "U25-126", yearlevel: 3, program: "BSE" },
  { id: 3, lastname: "jones", firstname: "carol", middlename: "dawn", studentid: "U25-127", yearlevel: 4, program: "BSBA" }
]

const enrollmentStatus = () => {
    const {show} = useContext(dashboardContext)
  return (
    <div className={`w-full h-[80vh]  flex-icenter flex-col transition-all ease-in duration-300  ${show == 3? "translate-x-[0]" : "translate-x-[-200%]" }`}>
        <div className='w-[95%] h-10 mb-2.5 flex-icenter gap-10'>
            <div className='w-70  flex-rows gap-1'>
              <label>Department:</label>
              <select className='w-[60%] border-[2px] border-solid border-black'>
                  <option>BSIT</option>
                  <option>BSHM</option>
                  <option>BSBA</option>
                  <option>BSE</option>
              </select>
            </div>
            <div className='w-70  flex-rows gap-1'>
              <label>Semester:</label>
              <select className='w-[40%] border-[2px] border-solid border-black'>
                  <option>1st Sem</option>
                  <option>2ns Sem</option>
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
            <div className='flex w-full  h-full absolute overflow-y-scroll ' style={{scrollbarWidth: "none"}}>
            <table className='table overflow-y-hidden'>
              <thead>
                <tr >
                  <th>ID</th>
                  <th>Last Name</th>
                  <th>First Name</th>
                  <th>Middle Name</th>
                  <th>Student ID</th>
                  <th>Year Level</th>
                  <th>Program</th>
                  <th>Req</th>
                  <th >Action</th>
                </tr>
              </thead>
              <tbody>
                {enrollStudent.map((info,key) => (
                  <tr key={key}>
                    <td>{info.id}</td>
                    <td>{info.lastname}</td>
                    <td>{info.firstname}</td>
                    <td>{info.middlename}</td>
                    <td>{info.studentid}</td>
                    <td>{info.yearlevel}</td>
                    <td>{info.program}</td>
                    <td ><button className='w-[70px] border-[1px] border-solid border-[#8b0606] text-info font-medium rounded-[5px] btn-success'>VIEW</button></td>
                    <td colSpan={2}>
                      <button className='w-[80px] border-[1px] border-solid border-[#8b0606] text-info font-medium rounded-[5px] btn-success'>Approved</button>
                      <button className='w-[70px] border-[1px] border-solid border-[#8b0606] text-[#ffd700] font-medium rounded-[5px] btn-danger ml-2.5'>Failed</button>
                    </td>
                    <td></td>
                  </tr>
                ))}
                
               <tr>
                  <td className='h-[95%]  '></td>
                  <td className='h-[95%] '></td>
                  <td className='h-[95%] '></td>
                  <td className='h-[95%] '></td>
                  <td className='h-[95%] '></td>
                  <td className='h-[95%] '></td>
                  <td className='h-[95%] '></td>
                  <td className='h-[95%] '></td>
                  <td className='h-[95%] '></td>
                </tr>
              </tbody>
            </table>
            </div>
        </div>
    </div>
  )
}

export default enrollmentStatus
