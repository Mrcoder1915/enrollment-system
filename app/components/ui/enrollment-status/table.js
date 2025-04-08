import React from 'react'

const enrollStatusTable = () => {
    const enrollStudent = [
      {id: 1, lastname: "doe", firstname: "john", middlename: "mill", studentid: "U25-124", yearlevel: 1, program: "BSIT"},
      { id: 2, lastname: "smith", firstname: "alice", middlename: "jane", studentid: "U25-125", yearlevel: 2, program: "BSCS" },
      { id: 2, lastname: "miller", firstname: "bob", middlename: "lee", studentid: "U25-126", yearlevel: 3, program: "BSE" },
      { id: 3, lastname: "jones", firstname: "carol", middlename: "dawn", studentid: "U25-127", yearlevel: 4, program: "BSBA" }
    ]
  return (
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
  )
}

export default enrollStatusTable
