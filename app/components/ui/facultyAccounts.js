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
    email: "maisd@gmail.com",
  },
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
        {/* Header */}
        <div className="w-full h-16 bg-tertiary flex items-center text-secondary font-bold text-xl px-4 rounded-t-lg">
          <h1>Faculty Account</h1>
        </div>

        {/* Table Container */}
        <div className="flex w-full h-[calc(100%-64px)] mt-0">
          {/* Table */}
          <div className="w-full h-[calc(100%-48px)] overflow-y-scroll hide-scrollbar">
            <table className="table w-full rounded-b-lg shadow-[0px_4px_10px_rgba(0,0,0,0.2)] border-collapse">
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
                        <button className="btn-success px-4 py-1 border border-yellow-600 text-info font-medium rounded-md hover:bg-primary-light">
                          Approved
                        </button>
                        <button className="btn-danger px-4 py-1 border border-red-600 text-secondary font-medium rounded-md hover:bg-secondary-light">
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
    </div>
  );
};

export default FacultyAccount;