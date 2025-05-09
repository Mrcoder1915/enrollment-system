'use client'
import React, { useContext, useState, useEffect } from 'react'
import { dashboardContext } from '@/app/providers/dashboardProvider'

const Masterlist = () => {
  const { show } = useContext(dashboardContext)

  // Sample data to filter
  const [students] = useState([
    { id: 1, lastName: 'Smith', firstName: 'John', middleName: 'A', studentId: 'S123', year: '1st', program: 'BSIT', section: 'A' },
    { id: 2, lastName: 'Doe', firstName: 'Jane', middleName: 'B', studentId: 'S124', year: '2nd', program: 'BSBA', section: 'B' },
    { id: 3, lastName: 'Lee', firstName: 'Chris', middleName: 'C', studentId: 'S125', year: '3rd', program: 'BSHM', section: 'C' }
    // Add more sample data as needed
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filteredStudents, setFilteredStudents] = useState(students)

  useEffect(() => {
    const term = searchTerm.toLowerCase()
    setFilteredStudents(
      students.filter(
        s =>
          s.firstName.toLowerCase().includes(term) ||
          s.lastName.toLowerCase().includes(term) ||
          s.middleName.toLowerCase().includes(term) ||
          s.studentId.toLowerCase().includes(term)
      )
    )
  }, [searchTerm, students])

  return (
    <div className={`w-full h-[80vh] absolute flex-icenter flex-col transition-all ease-in duration-300 ${show === 4 ? "translate-x-[0] visible" : "translate-x-[-200%]"}`}>
      <div className='w-[95%] h-15 mb-2.5 flex-icenter gap-10 justify-between'>
        <div className='w-70 h-7 mb-5 flex-rows gap-1'>
          <label>Department:</label>
          <select className='w-[60%] border-[2px] border-solid border-black'>
            <option>BSIT</option>
            <option>BSHM</option>
            <option>BSBA</option>
            <option>BSE</option>
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
                {filteredStudents.map((student, index) => (
                  <tr key={student.id}>
                    <td>{index + 1}</td>
                    <td>{student.lastName}</td>
                    <td>{student.firstName}</td>
                    <td>{student.middleName}</td>
                    <td>{student.studentId}</td>
                    <td>{student.year}</td>
                    <td>{student.program}</td>
                    <td>{student.section}</td>
                  </tr>
                ))}
                {filteredStudents.length === 0 && (
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
