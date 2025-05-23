'use client'
import React, { useContext, useState, useEffect } from 'react'
import { dashboardContext } from '@/app/providers/dashboardProvider'

const Masterlist = () => {
  const { show } = useContext(dashboardContext)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [enrollDetails, setEnrollDetails] = useState([])


  useEffect(() => {
    async function enroll() {
      const enrollStudent = await fetch("http://localhost:3000/api/registrar/dashboard/totalEnrollment");
      const data = await enrollStudent.json();
      setEnrollDetails(data);
    }
    enroll();
  }, [])

  const masterList = enrollDetails.filter((student) => student.approve === true);
  console.log(masterList);
  
    

    const filtered = masterList.filter((student) => {
      const { studentID } = student;
      const term = searchTerm.toLowerCase();
      const matchesSearch = (

        studentID?.firstName?.toLowerCase().includes(term) ||
        studentID?.lastName?.toLowerCase().includes(term) ||
        studentID?.middleName?.toLowerCase().includes(term) ||
        studentID?._id?.toLowerCase().includes(term) ||
        studentID?.program?.toLowerCase().includes(term) ||
        studentID?.section?.toLowerCase().includes(term)
      );

      const programToDept = {
        BSIT: 'CICT',
        BSCS: 'CICT',
        BSBA: 'CMBT',
        BSE: 'COE',
        BSHM: 'CMBT'
      };

      const matchesDepartment = selectedDepartment
        ? programToDept[studentID?.program] === selectedDepartment
        : true;

      return matchesSearch && matchesDepartment;
    });



  return (
    <div
      className={`w-full h-[80vh] absolute flex flex-col items-center justify-center transition-all ease-in duration-300 ${show === 4 ? "translate-x-0 visible" : "-translate-x-[200%]"}`}
    >
      <div className="flex h-full w-[95%] flex-col rounded">
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <label className="font-semibold">Department:</label>
            <select
              className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={selectedDepartment}
              onChange={(e) => setSelectedDepartment(e.target.value)}
            >
              <option value="">All</option>
              <option value="CICT">CICT</option>
              <option value="CMBT">CMBT</option>
              <option value="COE">COE</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-semibold">Search:</label>
            <input
              type="text"
              name="search"
              id="search"
              className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-tertiary text-white text-xl px-4 py-2 rounded-t">
          Master List
        </div>

        <div className="hide-scrollbar overflow-y-scroll w-full h-[95%] border rounded-b shadow-2xl">
          <table className="table w-full overflow-y-hidden">
            <thead className="bg-gray-200 text-left">
              <tr>
                <th className="px-4 py-2">No.</th>
                <th className="px-4 py-2">Last Name</th>
                <th className="px-4 py-2">First Name</th>
                <th className="px-4 py-2">Middle Name</th>
                <th className="px-4 py-2">Student ID</th>
                <th className="px-4 py-2">Year Level</th>
                <th className="px-4 py-2">Program</th>
                <th className="px-4 py-2">Section</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((student, index) => (
                  <tr key={index} className="border-t hover:bg-gray-50">
                    <td className="px-4 py-2">{index + 1}</td>
                    <td className="px-4 py-2">{student?.studentID?.lastName}</td>
                    <td className="px-4 py-2">{student?.studentID?.firstName}</td>
                    <td className="px-4 py-2">{student?.studentID?.middleName}</td>
                    <td className="px-4 py-2">{student?.studentID?._id}</td>
                    <td className="px-4 py-2">{student?.studentID?.yearLevel}</td>
                    <td className="px-4 py-2">{student?.studentID?.program}</td>
                    <td className="px-4 py-2">{student?.studentID?.section}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="8" className="px-4 py-4 text-center text-gray-500">
                    No results found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default Masterlist;
