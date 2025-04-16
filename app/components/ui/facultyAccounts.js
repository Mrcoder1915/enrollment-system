"use client";

import React, { useContext } from "react";
import { dashboardContext } from "@/app/providers/dashboardProvider";

const facultyList = [
  {
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },
  {
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
    _id: 2,
    lastName: "Dela Cruz",
    firstName: "Janine",
    middleName: "O.",
    contact: "09159130770",
    email: "maisd@gmail.com",
  },{
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
      <div className="w-[95%] min-h-[95%] relative overflow-hidden bg-white rounded-lg shadow-lg z-0">
        {/* Header */}
        <div className="w-full h-15 bg-tertiary flex-icenter pl-1 text-white">
          <h1 className="text-2xl p-2">Faculty Accounts</h1>
        </div>

        {/* Table */}
        <div className="overflow-hidden">
          <table className="table table-fixed w-full border-collapse border border-gray-300 rounded-t-lg">
            <thead className="sticky top-0 bg-white z-10 shadow-md">
              <tr>
                <th className="w-[5%]">ID</th>
                <th className="w-[15%]">Last Name</th>
                <th className="w-[15%]">First Name</th>
                <th className="w-[15%]">Middle Name</th>
                <th className="w-[15%]">Contact</th>
                <th className="w-[17%]">Email</th>
                <th className="w-[20%]">Action</th>
              </tr>
            </thead>
          </table>
        </div>

        <div className="overflow-y-scroll max-h-[60vh] hide-scrollbar">
          <table className="table table-fixed w-full border-collapse border border-gray-300 rounded-b-lg">
            <tbody>
              {facultyList.map((faculty, index) => (
                <tr key={index}>
                  <td className="w-[5%]">{faculty._id}</td>
                  <td className="w-[15%]">{faculty.lastName}</td>
                  <td className="w-[15%]">{faculty.firstName}</td>
                  <td className="w-[15%]">{faculty.middleName}</td>
                  <td className="w-[15%]">{faculty.contact}</td>
                  <td className="w-[17%]">{faculty.email}</td>
                  <td className="w-[20%]">
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
