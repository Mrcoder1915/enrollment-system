  "use client"
  import React, { useCallback, useEffect, useState } from 'react'


  const enrollStatusTable = (props) => {
      const [enrollDetails, setEnrollDetails] = useState([])
    
      const approveEnrollment =  useCallback(async (ID) => {
         await fetch("/api/Student/studentenrollment/approveEnrollment",{
          method: "POST",
          headers: {
            "content-type":"application/json"
          },
          body: JSON.stringify({ studentID: ID, approve: true})
        })
        const enrollStudent = await fetch("http://localhost:3000/api/Student/studentenrollment");
        const data = await enrollStudent.json()
        setEnrollDetails(prev => prev = data) 
      },)

      const deleteEnrollment =  useCallback(async (ID) => {
        await fetch("/api/Student/studentenrollment/deleteEnrollment",{
          method: "POST",
          headers: {
            "content-type":"application/json"
          },
          body: JSON.stringify({studentID: ID})
        })
        const enrollStudent = await fetch("http://localhost:3000/api/Student/studentenrollment");
        const data = await enrollStudent.json()
        setEnrollDetails(prev => prev = data) 
      },)
      
      useEffect(() => {
          async function enroll() {
              const enrollStudent = await fetch("http://localhost:3000/api/Student/studentenrollment");
              const data = await enrollStudent.json()
              setEnrollDetails(prev => prev = data)         
          }
          enroll()
      }, [])
      

      const ustudent = enrollDetails
      const u = ustudent.map((s) => s.studentID._id)
      console.log("ID: ",  u);
      
      
      const filterdstudents = ustudent.filter((student) => {
        const filterByProgram = props.program? student.studentID.program == props.program : true
        const filterBySemester = props.semester? student.courseID.semester == props.semester : true

        return filterByProgram && filterBySemester
      })
      
      
      
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
          {filterdstudents?.map((info) => (
              <tr key={info._id}>
                  <td>{info._id}</td>
                  <td>{info.studentID?.lastName}</td>
                  <td>{info.studentID?.firstName}</td>
                  <td>{info.studentID?.middleName}</td>
                  <td>{info.studentID?._id}</td>
                  <td>{info.studentID.yearLevel}</td>
                  <td>{info.studentID.program}</td>
                  <td ><button className='w-[70px] border-[1px] border-solid border-[#8b0606] text-info font-medium rounded-[5px] btn-success'>VIEW</button></td>
                  <td colSpan={2}>
                      <button onClick={() =>  {approveEnrollment(info.studentID?._id)}} className='w-[80px] border-[1px] border-solid border-[#8b0606] text-info font-medium rounded-[5px] btn-success'>Approved</button>
                      <button onClick={() =>  {deleteEnrollment(info.studentID?._id)}} className='w-[70px] border-[1px] border-solid border-[#8b0606] text-[#ffd700] font-medium rounded-[5px] btn-danger ml-2.5'>Failed</button>
                  </td>
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

  export default React.memo(enrollStatusTable)
