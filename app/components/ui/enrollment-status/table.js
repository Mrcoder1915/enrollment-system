  "use client"
import { dashboardContext } from '@/app/providers/dashboardProvider'
  import React, { useCallback, useContext, useEffect, useState } from 'react'


  const EnrollStatusTable = (props) => {
    const {SetView, setInsertInfo} = useContext(dashboardContext)
      const [enrollDetails, setEnrollDetails] = useState([])
      const [departmentProgram, setDeparmentProgram] = useState({})

      const approveEnrollment =  useCallback(async (ID) => {
        try{
           await fetch("/api/registrar/studentenrollment/approveEnrollment",{
          method: "POST",
          headers: {
            "Content-Type":"application/json"
          },
          body: JSON.stringify({ studentID: ID, approve: true})
        })
        const enrollStudent = await fetch("/api/registrar/studentenrollment");
        const data = await enrollStudent.json()
        setEnrollDetails(data) 
        }catch(error){
          console.log("error in approve enrollment: ",error)
        }
        
      },[])

      const deleteEnrollment =  useCallback(async (ID) => {
        try {
             await fetch("/api/registrar/studentenrollment/deleteEnrollment",{
            method: "POST",
            headers: {
              "Content-Type":"application/json"
            },
            body: JSON.stringify({studentID: ID})
          })
          const enrollStudent = await fetch("/api/registrar/studentenrollment");
          const data = await enrollStudent.json()
          setEnrollDetails(data) 
        } catch (error) {
           console.log("error in delete enrollment: ",error)
        }
       
      },[])
      
      useEffect(() => {
        try {
          async function enroll() {
              const enrollStudent = await fetch("/api/registrar/studentenrollment");
              const data = await enrollStudent.json()
              setEnrollDetails(data)
              
              const department = await fetch("/api/registrar/studentenrollment/department");
              const departmentdata = await department.json()
              setDeparmentProgram(departmentdata)
          }
          enroll()
        } catch (error) {
           console.log("error in getting enrollment data: ",error)
        }
          
      }, [])
      

      const ustudent = enrollDetails
      
const filterdstudents = ustudent.filter((student) => {
  const studentProgram = student.student?.program;

  const filterByDepartment = props.department
    ? departmentProgram[props.department]?.includes(studentProgram)
    : true;

  const filterBySemester = props.semester
    ? student.courses[0]?.semester == props.semester
    : true;

  return filterByDepartment && filterBySemester;
});
      
      
      
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
                  <td>{info.student?.lastName}</td>
                  <td>{info.student?.firstName}</td>
                  <td>{info.student?.middleName}</td>
                  <td>{info.student?._id}</td>
                  <td>{info.student?.yearLevel}</td>
                  <td>{info.student?.program}</td>
                  <td ><button onClick={() => {setInsertInfo(info.student); SetView(3)}} className='w-[70px] border-[1px] border-solid border-[#8b0606] text-info font-medium rounded-[5px] btn-success'>VIEW</button></td>
                  <td colSpan={2}>
                      <button onClick={() =>  {approveEnrollment(info.student?._id)}} className='w-[80px] border-[1px] border-solid border-[#8b0606] text-info font-medium rounded-[5px] btn-success'>Approved</button>
                      <button onClick={() =>  {deleteEnrollment(info.student?._id)}} className='w-[70px] border-[1px] border-solid border-[#8b0606] text-[#ffd700] font-medium rounded-[5px] btn-danger ml-2.5'>Failed</button>
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

  export default React.memo(EnrollStatusTable)
