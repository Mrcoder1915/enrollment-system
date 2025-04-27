"use client"
import React, { useContext, useState } from "react";
import { dashboardContext } from "@/app/providers/dashboardProvider";

const AdmissionTable = () => {
  const { show } = useContext(dashboardContext);
  const [selectedDept, setSelectedDept] = useState("");

  const admissions = [
    {
      id: 1,
      lastName: "Concha",
      firstName: "Jhoven A.",
      middleName: "Cordero",
      program: "BSIT",
      academicYear: "2024-2025",
      yearLevel: "1st Year",
      department: "CICT",
    },
    {
      id: 2,
      lastName: "Dela Cruz",
      firstName: "Maria",
      middleName: "Santos",
      program: "BSBA",
      academicYear: "2024-2025",
      yearLevel: "2nd Year",
      department: "CMBT",
    },
    {
      id: 3,
      lastName: "Reyes",
      firstName: "Juan",
      middleName: "Torres",
      program: "BSE",
      academicYear: "2024-2025",
      yearLevel: "3rd Year",
      department: "COE",
    },
    {
      id: 4,
      lastName: "Lopez",
      firstName: "Ana",
      middleName: "Marquez",
      program: "BSCS",
      academicYear: "2024-2025",
      yearLevel: "1st Year",
      department: "CICT",
    },
  ];

  const filteredAdmissions = selectedDept
    ? admissions.filter((item) => item.department === selectedDept)
    : admissions;

  return (
    <div
      className={`w-full h-[80vh] absolute flex flex-col items-center justify-center transition-all ease-in duration-300 ${
        show === 2 ? "translate-x-0 visible" : "-translate-x-[200%]"
      }`}
    >
      <div className="flex h-[95%] w-full p-4 rounded shadow-md">
        <main className="w-full">
          <div className="mb-4 flex items-center">
            <label className="mr-2 font-semibold">Department:</label>
            <select
              value={selectedDept}
              onChange={(e) => setSelectedDept(e.target.value)}
              className="border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="CICT">CICT</option>
              <option value="CMBT">CMBT</option>
              <option value="COE">COE</option>
            </select>
          </div>

          <div className="bg-tertiary text-white text-xl px-4 py-2 rounded-t">
            Admission
          </div>

          <div className="hide-scrollbar overflow-auto border rounded-b shadow-md">
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
                  filteredAdmissions.map((item) => (
                    <tr key={item.id} className="border-t hover:bg-gray-50">
                      <td className="px-4 py-2">{item.id}</td>
                      <td className="px-4 py-2">{item.lastName}</td>
                      <td className="px-4 py-2">{item.firstName}</td>
                      <td className="px-4 py-2">{item.middleName}</td>
                      <td className="px-4 py-2">{item.program}</td>
                      <td className="px-4 py-2">{item.academicYear}</td>
                      <td className="px-4 py-2">{item.yearLevel}</td>
                      <td>
                        <button className = 'w-[70px] border-[1px] border-solid border-[#8b0606] text-info font-medium rounded-[5px] btn-success'>
                          VIEW
                        </button>
                      </td>
                      <td classname ="flex gap-2 justify-center">
                        <button className= 'w-[80px] border-[1px] border-solid border-[#8b0606] text-info font-medium rounded-[5px] btn-success'>
                          Approve
                        </button>
                        <button className= 'w-[70px] border-[1px] border-solid border-[#8b0606] text-[#ffd700] font-medium rounded-[5px] btn-danger ml-2.5'>
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
        </main>
      </div>
    </div>
  );
};

export default AdmissionTable;