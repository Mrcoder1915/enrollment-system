"use client";

import React, { useContext } from "react";
import { dashboardContext } from "@/app/providers/dashboardProvider";

const facultyList = [
  {
    _id: 1,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "mryndc@gmail.com",
  },
  {
    _id: 2,
    lastName: "Dela Cruz", 
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com"
  }
];

const FacultyAccount = () => {
  const { show } = useContext(dashboardContext);

  return (
    <div
      className={`w-full h-[80vh] absolute flex-icenter flex-col transition-all ease-in duration-300 ${
        show === 5 ? "translate-x-[0] visible" : "translate-x-[-200%]"
      }`}
    >
      <div className="w-[95%] min-h-[95%] relative overflow-hidden bg-white shadow-[4px_4px_10px_rgba(0,0,0,.40)] z-0">
        {/* header */}
        <div className="w-full h-8 bg-tertiary flex-icenter pl-1 text-white">
          <h1>Faculty Accounts</h1>
        </div>

        {/* table */}
        <div
          className="flex w-full absolute overflow-y-scroll"
          style={{ scrollbarWidth: "none" }}
        >
          <table className="table overflow-y-hidden">
            <thead>
              <tr>
                <th>ID</th>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Middle Name</th>
                <th>Contact</th>
                <th>Email</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {facultyList.map((faculty) => (
                <tr key={faculty._id}>
                  <td>{faculty._id}</td>
                  <td>{faculty.lastName}</td>
                  <td>{faculty.firstName}</td>
                  <td>{faculty.middleName}</td>
                  <td>{faculty.contact}</td>
                  <td>{faculty.email}</td>
                  <td>
                    <div className="flex gap-2 justify-center">
                      <button className="w-[80px] border border-[#8b0606] text-info font-medium rounded-[5px] btn-success">
                        Approved
                      </button>
                      <button className="w-[70px] border border-[#8b0606] text-[#ffd700] font-medium rounded-[5px] btn-danger ml-2.5">
                        Failed
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default FacultyAccount;