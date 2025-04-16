"use client";

import React, { useContext } from "react";
import { dashboardContext } from "@/app/providers/dashboardProvider";

const sendEmail = async (email, status) => {
  const response = await fetch("/api/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, status }),
  });

  if (response.ok) {
    alert(`Email sent successfully to ${email}`);
  } else {
    alert("Error sending email");
  }
};

const FacultyAccount = () => {
  const { show } = useContext(dashboardContext);

  const facultyList = [
    {
      _id: 2,
      lastName: "Dela Cruz",
      firstName: "Janine",
      middleName: "O.",
      contact: "09159130770",
      email: "edwardnelson0099@gmail.com",
    }
  ];

  return (
    <div
      className={`w-full h-[80vh] absolute flex-icenter flex-col transition-all ease-in duration-300 ${
        show === 5 ? "translate-x-[0] visible" : "translate-x-[-200%]"
      }`}
    >
      <div className="w-[95%] min-h-[95%] relative overflow-hidden bg-white rounded-lg shadow-lg z-0">
        {/* Header */}
        <div className="w-full h-15 bg-tertiary flex-icenter pl-1 text-white">
          <h1 className="pl-3 text-2xl">Faculty Account</h1>
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
                <th className="w-[20%]">Email</th>
                <th className="w-[15%]">Action</th>
              </tr>
            </thead>
          </table>
        </div>

        {/* Scrollable Body */}
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
                  <td className="w-[20%]">{faculty.email}</td>
                  <td className="w-[15%]">
                    <div className="flex gap-2 justify-center">
                      <button
                        className="w-[80px] border border-[#8b0606] text-info font-medium rounded-[5px] btn-success"
                        onClick={() => sendEmail(faculty.email, "approved")}
                      >
                        Approved
                      </button>
                      <button
                        className="w-[70px] border border-[#8b0606] text-[#ffd700] font-medium rounded-[5px] btn-danger ml-2.5"
                        onClick={() => sendEmail(faculty.email, "failed")}
                      >
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