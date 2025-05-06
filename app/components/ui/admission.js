"use client"
import React, { useContext, useEffect, useState , useCallback} from "react";
import { dashboardContext } from "@/app/providers/dashboardProvider";

const AdmissionTable = () => {
  const { show } = useContext(dashboardContext);
  const [selectedDept, setSelectedDept] = useState("");
  const [Data,setData] = useState([])

  const deleteAdmission =  useCallback(async (ID) => {
          await fetch("http://localhost:3000/api/registrar/deleteadmission",{
            method: "POST",
            headers: {
              "content-type":"application/json"
            },
            body: JSON.stringify({studentID: ID})
          })
          const result = await fetch("http://localhost:3000/api/registrar/approvedadmission")
         const data = await result.json()
         setData(prev => prev = data)
        },)
  const approveAdmission =  useCallback(async (ID) => {
          await fetch("http://localhost:3000/api/registrar/approvedadmission",{
            method: "POST",
            headers: {
              "content-type":"application/json"
            },
            body: JSON.stringify({studentID: ID, remarks: "approve"})
          })
          const result = await fetch("http://localhost:3000/api/registrar/approvedadmission")
         const data = await result.json()
         setData(prev => prev = data)
        },)

  useEffect(() => {
    const student = async () => {
      const result = await fetch("http://localhost:3000/api/registrar/approvedadmission")
      const data = await result.json()
      setData(prev => prev = data)
    }
    student()
  },[])
  

  console.log(Data);
  
  const filteredAdmissions = selectedDept
    ? Data.filter((item) => item.department === selectedDept)
    : Data;

  return (
    <div
      className={`w-full h-[80vh] absolute flex flex-col items-center justify-center transition-all ease-in duration-300 ${
        show === 2 ? "translate-x-0 visible" : "-translate-x-[200%]"
      }`}
    >
      <div className="flex h-full w-[95%] flex-col rounded  ">
        
          <div className="mb-4 flex items-center">
            <label className="mr-2 font-semibold">Department:</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value=""></option>
              <option value="CICT">CICT</option>
              <option value="CMBT">CMBT</option>
              <option value="COE">COE</option>
            </select>
          </div>

          <div className="bg-tertiary text-white text-xl px-4 py-2 rounded-t">
            Admission
          </div>

          <div className=" hide-scrollbar overflow-y-scroll w-full h-[95%] border rounded-b shadow-2xl">
            <table className= 'table overflow-y-hidden '>
              <thead className="bg-gray-200 text-left">
                <tr>
                  <th className="px-4 py-2">ID</th>
                  <th className="px-4 py-2">Last Name</th>
                  <th className="px-4 py-2">First Name</th>
                  <th className="px-4 py-2">Middle Name</th>
                  <th className="px-4 py-2">Program</th>
                  <th className="px-4 py-2">Academic Year</th>
                  <th className="px-4 py-2">Year Level</th>
                  <th className="px-4 py-2">Requirements</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>

              <tbody>
                {filteredAdmissions.length > 0 ? (
                  filteredAdmissions?.map((item) => (
                    <tr key={item._id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{item.studentID._id}</td>
                      <td className="px-4 py-2">{item.studentID.lastName}</td>
                      <td className="px-4 py-2">{item.studentID.firstName}</td>
                      <td className="px-4 py-2">{item.studentID.middleName}</td>
                      <td className="px-4 py-2">{item.studentID.program}</td>
                      <td className="px-4 py-2">{`${item.studentID.academicYear} - ${item.studentID.academicYear + 1}`}</td>
                      <td className="px-4 py-2">{item.studentID.yearLevel? item.studentID.yearLevel: ""}</td>
                      <td>
                        <button className = 'w-[70px] border-[1px] border-solid border-[#8b0606] text-info font-medium rounded-[5px] btn-success'>
                          VIEW
                        </button>
                      </td>
                      <td className ="flex gap-2 justify-center items-center">
                        <button onClick={() => approveAdmission(item.studentID._id)} className= 'w-[80px] h-[27px] border-[1px] border-solid border-[#8b0606] text-info font-medium rounded-[5px] btn-success'>
                          Approve
                        </button>
                        <button onClick={() => deleteAdmission(item.studentID._id)} className= 'w-[70px] h-[27px] border-[1px] border-solid border-[#8b0606] text-[#ffd700] font-medium rounded-[5px] btn-danger ml-2.5'>
                          Failed
                        </button>
                        </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={9} className="px-4 py-4 text-center text-gray-500">
                      No records found for selected department.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        
      </div>
    </div>
  );
};

export default AdmissionTable;