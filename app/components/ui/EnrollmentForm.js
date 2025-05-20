import React, { useContext, useEffect, useState } from "react";
import { dashboardContext } from '@/app/providers/dashboardProvider';

const EnrollmentForm = () => {
  const { show, view ,setView} = useContext(dashboardContext);
  const [Value, setValue] = useState("")
  const [yearLevel, setYearLevel] = useState("")
  const [semester, setSemester] = useState("")
  const [Data, setData] = useState()

  useEffect(() => {
    const students = async () => {
      try {
        const  res = await fetch("/api/Student/studentEnrollment",{
          method: "GET"
        })
        const data = await  res.json()
        setData(data)
      } catch (error) {
        console.log("error: ", error);
    }  
    }
     students() 
  },[])
  if(!Data){
    return
  }
  console.log("dATA: ",Data);
  let program = {}

switch (Data?.studentID?.program) {
  case "BSIT":
    program = { one: "BSIT-1A", two: "BSIT-1B" };
    break
  case "BSHM":
    program = { one: "BSHM-1A", two: "BSHM-1B" };
    break
  case "BSBA":
    program = { one: "BSBA-1A", two: "BSBA-1B" };
    break
  case "BSE":
    program = { one: "BSE-1A", two: "BSE-1B" };
    break
}
const getView = () => {
  if(view != 2 && show === 2){   
    return  'translate-x-0 visible'
  }
  return '-translate-x-[200%] invisible'
}
  return (
    <div
      className={`w-full h-[80vh] p-5 absolute flex justify-center flex-col transition-all ease-in duration-300 ${getView()
      }`}
    >

        <div className="bg-white p-6 shadow-md rounded-md">
          <h2 className="bg-red-800 text-white py-4 px-5 text-xl font-bold rounded-t-md mb-4">
            Enrollment Form
          </h2>
          <form id="enrollmentForm">
            <div className="mb-4">
              <label htmlFor="studentId" className="block text-gray-700 text-sm font-bold mb-2">
                Student ID: 
              </label>
              <input
                type="text"
                id="studentId"
                value={Data.studentID._id}
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div className="mb-4 md:mb-0">
                <label htmlFor="firstName" className="block text-gray-700 text-sm font-bold mb-2">
                  First Name: 
                </label>
                <input
                  type="text"
                  id="firstName"
                  value={Data.studentID.firstName}
                  placeholder="Enter First Name"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div className="mb-4 md:mb-0">
                <label htmlFor="middleName" className="block text-gray-700 text-sm font-bold mb-2">
                  Middle Name:
                </label>
                <input
                  type="text"
                  id="middleName"
                  value={Data?.studentID?.middleName}
                  placeholder="Enter Middle Name"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-gray-700 text-sm font-bold mb-2">
                  Last Name:
                </label>
                <input
                  type="text"
                  id="lastName"
                  value={Data.studentID?.lastName}
                  placeholder="Enter Last Name"
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
              <div>
                <label htmlFor="program" className="block text-gray-700 text-sm font-bold mb-2">
                  Program:
                </label>
                <input
                  type="text"
                  id="program"
                  value={Data.studentID?.program}
                  placeholder="e.g. BSIT, BSED, etc."
                  required
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
              </div>
              <div>
                <label htmlFor="section" className="block text-gray-700 text-sm font-bold mb-2">
                  Section:
                </label>
                <select
                  id="section"
                  required
                  onChange={(e) => setValue(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Section</option>
                  <option>{program.one}</option>
                  <option>{program.two}</option>
                </select>
              </div>
              <div>
                <label htmlFor="yearLevel" className="block text-gray-700 text-sm font-bold mb-2">
                  Year Level:
                </label>
                <select
                  id="yearLevel"
                  required
                  onChange={(e) => setYearLevel(e.target.value)}
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                >
                  <option value="">Select Year</option>
                  <option value={1}>1st</option>
                  <option value={2}>2nd</option>
                  <option value={3}>3rd</option>
                  <option value={4}>4th</option>
                </select>
              </div>
            </div>
            <div className="mb-4">
              <label htmlFor="semester" className="block text-gray-700 text-sm font-bold mb-2">
                Semester:
              </label>
              <select
                id="semester"
                required
                onChange={(e) => setSemester(e.target.value)}
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Semester</option>
                <option value={1}>1st sem</option>
                <option value={2}>2nd sem</option>
              </select>
            </div>
            <button
              type="submit"
              onClick={() => setView(2)}
              className="bg-red-800 hover:bg-red-900 text-yellow-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Process Enrollment
            </button>
          </form>
        </div>
    </div>
  );
};

export default EnrollmentForm;