"use client";

import React, { useContext, useEffect, useState } from "react";
import { dashboardContext } from "@/app/providers/dashboardProvider";

const generateRandomPassword = () => {
  const chars =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()";
  let password = "";
  for (let i = 0; i < 10; i++) {
    password += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return password;
};

const sendEmail = async (email, status) => {
  let randomPassword = "";

  if (status === "approved") {
    randomPassword = generateRandomPassword();
  }

  const response = await fetch("/api/registrar/send-email", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, status, password: randomPassword }),
  });

  if (response.ok) {
    alert(`Email sent successfully to ${email}`);
  } else {
    alert("Error sending email");
  }
};

const FacultyAccount = () => {
  const { show } = useContext(dashboardContext);
  const [facultyList, setFacultyList] = useState([]);

  useEffect(() => {
    const fetchFaculty = async () => {
      try {
        const res = await fetch("/api/registrar/instructorList");
        const data = await res.json();

        console.log("Fetched faculty data:", data);

        if (Array.isArray(data) && data.length > 0) {
          setFacultyList(data);
        } else {
          console.log("No faculty data found.");
        }
      } catch (error) {
        console.error("Failed to fetch faculty:", error);
      }
    };

    fetchFaculty();
  }, []);

  // Include entries with no status as "pending"
  const pendingFaculty = facultyList.filter(
    (faculty) => !faculty.status || faculty.status === "pending"
  );

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

        {/* Table Header */}
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

        {/* Table Body */}
        <div className="overflow-y-scroll max-h-[60vh] hide-scrollbar">
          <table className="table table-fixed w-full border-collapse border border-gray-300 rounded-b-lg">
            <tbody>
              {pendingFaculty.length > 0 ? (
                pendingFaculty.map((faculty, index) => (
                  <tr key={faculty._id || index}>
                    <td className="w-[5%] truncate" title={faculty._id}>
                      {faculty._id.slice(-6)}
                    </td>
                    <td className="w-[15%]">{faculty.lastName}</td>
                    <td className="w-[15%]">{faculty.firstName}</td>
                    <td className="w-[15%]">{faculty.middleName || "-"}</td>
                    <td className="w-[15%]">{faculty.contactNumber}</td>
                    <td className="w-[20%]">{faculty.emailAddress}</td>
                    <td className="w-[15%]">
                      <div className="flex gap-2 justify-center">
                        <button
                          className="w-[80px] border border-[#8b0606] hover:opacity-90 active:scale-95 transition-all duration-150 text-info font-medium rounded-[5px] btn-success"
                          onClick={() => {
                            if (
                              confirm(
                                `Are you sure you want to APPROVE and send credentials to ${faculty.emailAddress}?`
                              )
                            ) {
                              sendEmail(faculty.emailAddress, "approved");
                            }
                          }}
                        >
                          Approved
                        </button>
                        <button
                          className="w-[70px] border border-[#8b0606] text-[#ffd700] hover:opacity-90 active:scale-95 font-medium rounded-[5px] btn-danger ml-2.5"
                          onClick={() => {
                            if (
                              confirm(
                                `Are you sure you want to mark ${faculty.emailAddress} as FAILED?`
                              )
                            ) {
                              sendEmail(faculty.emailAddress, "failed");
                            }
                          }}
                        >
                          Failed
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" className="text-center">
                    No pending faculty records found.
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

export default FacultyAccount;
