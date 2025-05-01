  "use client"
  import React, { useEffect, useState } from 'react'


  const enrollStatusTable = () => {
      const [enrollDetails, setEnrollDetails] = useState([])
      console.log(enrollDetails)
      
      useEffect(() => {
          async function enroll() {
              const enrollStudent = await fetch("http://localhost:3000/api/Student/studentenrollment");
              const data = await enrollStudent.json()
              setEnrollDetails(prev => prev = data)         
          }
          enroll()
      }, [])
      
      const getUniqueEnrollments = (enrollments) => {
          const uniqueEnrollmentKeys = new Set();
          const uniqueEnrollmentData = [];
      
          enrollments.forEach((enrollment) => {
            // Create a unique key for each enrollment based on studentID and courseID.
            const enrollmentKey = enrollment.studentID._id;
      
            if (!uniqueEnrollmentKeys.has(enrollmentKey)) {
              uniqueEnrollmentKeys.add(enrollmentKey);
              uniqueEnrollmentData.push(enrollment);
            }
          });
      
          return uniqueEnrollmentData;
        };

      const ustudent = getUniqueEnrollments(enrollDetails)
      console.log("inique: ",ustudent)
      
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
          {ustudent?.map((info) => (
              <tr key={info._id}>
                  <td>{info._id}</td>
                  <td>{info.studentID?.lastName}</td>
                  <td>{info.studentID?.firstName}</td>
                  <td>{info.studentID?.middleName}</td>
                  <td>{info.studentID?._id}</td>
                  <td>{info.courseID.year}</td>
                  <td>{info.courseID.programID.programCode}</td>
                  <td ><button className='w-[70px] border-[1px] border-solid border-[#8b0606] text-info font-medium rounded-[5px] btn-success'>VIEW</button></td>
                  <td colSpan={2}>
                      <button className='w-[80px] border-[1px] border-solid border-[#8b0606] text-info font-medium rounded-[5px] btn-success'>Approved</button>
                      <button className='w-[70px] border-[1px] border-solid border-[#8b0606] text-[#ffd700] font-medium rounded-[5px] btn-danger ml-2.5'>Failed</button>
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

  export default enrollStatusTable
