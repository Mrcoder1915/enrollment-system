'use client'
import React, { useContext, useState, useEffect } from 'react'
import { dashboardContext } from '@/app/providers/dashboardProvider'

const Masterlist = () => {
  const { show } = useContext(dashboardContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [enrollDetails, setEnrollDetails] = useState([])
  const [filteredStudents, setFilteredStudents] = useState([])

  useEffect(() => {
    async function enroll() {
      const enrollStudent = await fetch("http://localhost:3000/api/registrar/dashboard/totalEnrollment");
      const data = await enrollStudent.json();
      setEnrollDetails(data);
    }
    enroll();
  }, [])

  const masterList = enrollDetails.filter((student) => student.approve === true);

  useEffect(() => {
  const term = searchTerm.toLowerCase();

  const filtered = masterList.filter((student) => {
    const { studentID } = student;

    const matchesSearch = (
      studentID?.firstName?.toLowerCase().includes(term) ||
      studentID?.lastName?.toLowerCase().includes(term) ||
      studentID?.middleName?.toLowerCase().includes(term) ||
      studentID?._id?.toLowerCase().includes(term) ||
      studentID?.section?.toLowerCase().includes(term)
    );

   const programToDept = {
       BSIT: 'CICT',
       BSCS: 'CICT',
       BSBA: 'CMBT',
       BSE: 'COE',
  };

  const matchesDepartment = selectedDepartment
     ? programToDept[studentID?.program] === selectedDepartment
     : true;



    return matchesSearch && matchesDepartment;
  });

  setFilteredStudents(filtered);
}, [searchTerm, masterList, selectedDepartment]);


  return (
    <div className={`w-full h-[80vh] absolute flex-icenter flex-col transition-all ease-in duration-300 ${show === 4 ? "translate-x-[0] visible" : "translate-x-[-200%]"}`}>
      <div className='w-[95%] h-15 mb-2.5 flex-icenter gap-10 justify-between'>
        <div className='w-70 h-7 mb-5 flex-rows gap-1'>
          <label>Department:</label>
          <select className="w-[60%] border-[2px] border-solid border-black" value={selectedDepartment}onChange={(e) => setSelectedDepartment(e.target.value)}> 
              <option value="">All</option>
              <option value="CICT">CICT</option>
              <option value="CMBT">CMBT</option>
              <option value="COE">COE</option>
          </select>

        </div>

        <div className='mb-6'>
          <label>Search:</label>
          <input
            type="text"
            name='search'
            id='search'
            className='w-[60%] border-[2px] border-solid border-black ml-1'
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <div className='w-[95%] h-10 mb-2.5 mt-20 flex-icenter gap-10'>
        <div className='w-full min-h-[95%] relative overflow-hidden bg-white shadow-[4px_4px_10px_rgba(0,0,0,.40)] z-0'>
          <div className='w-full h-8 bg-tertiary pl-1 text-white pt-0.5 '>
            <h1>Master List</h1>
          </div>

          <div className="hide-scrollbar overflow-y-scroll w-full h-[95%] border rounded-b shadow-2xl">
            <table className='table overflow-y-hidden'>
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
                {filteredStudents.length > 0 ? (
                  filteredStudents.map((student, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{student?.studentID?.lastName}</td>
                      <td>{student?.studentID?.firstName}</td>
                      <td>{student?.studentID?.middleName}</td>
                      <td>{student?.studentID?._id}</td>
                      <td>{student?.studentID?.yearLevel}</td>
                      <td>{student?.studentID?.program}</td>
                      <td>{student?.studentID?.section}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4">No results found.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Masterlist
