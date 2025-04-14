import React from 'react'
import {dashboardContext} from '@/app/providers/dashboardProvider'
import { useContext } from 'react'

const masterlist = () => {
    const {show} = useContext(dashboardContext)
  return (
    <div className={`w-full h-[80vh] absolute  flex-icenter flex-col transition-all ease-in duration-300 ${show == 4? "translate-x-[0] visible" : "translate-x-[-200%]" }`}>
         <div className='w-[95%] h-15 mb-2.5 flex-icenter gap-10'>
            <div className='w-70 h-7 mb-5 flex-rows gap-1'>
              <label>Department:</label>
              <select className='w-[60%] border-[2px] border-solid border-black'>
                  <option>BSIT</option>
                  <option>BSHM</option>
                  <option>BSBA</option>
                  <option>BSE</option>
              </select>
             </div>
            </div> 
<div>
       <div>
        <input type="text"name='search' id='searchh' className='shadow xl shadow-slate-500 w-[75%] h-10 p-2 
        outline-none' placeholder="Search" />
       </div>
       <div></div>
</div>                
<div className='w-[95%] h-10 mb-2.5 mt-10 flex-icenter gap-10'>
<div className='w-[95%] min-h-[95%] relative overflow-hidden bg-white shadow-[4px_4px_10px_rgba(0,0,0,.40)] z-0 '>
<div className='w-full h-8 bg-tertiary pl-1 text-white pt-0.5 '>
                <h1>Master List</h1>
            </div>

    <table className='table overflow-y-hidden '>
    <thead>
        
        <tr>
            <th>No.</th>
            <th>Last Name</th>
            <th>First Name</th>
            <th>Middle Name</th>
            <th>Student ID</th>
            <th>Year Level</th>
            <th>Program</th>
            <th>Section</th>
        </tr>
    </thead>
    <tbody>
        <tr>
        <td> .</td>
        <td> .</td>
        <td> .</td>
        <td> .</td>
        <td> .</td>
        <td> .</td>
        <td> .</td>
        <td> .</td>
        </tr>
        
    </tbody>
    </table>
    </div>
    </div>

    </div>
  )
}

export default masterlist