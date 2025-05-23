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

  const pendingFaculty = facultyList.filter(
    (faculty) => faculty.status === "pending"
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
        <div className='flex w-full   absolute overflow-y-scroll hide-scrollbar' >
          <table className="table overflow-y-hidden">
            <thead className="sticky top-0 bg-white z-10 shadow-md">
              <tr>
                <th className="">ID</th>
                <th className="">Last Name</th>
                <th className="">First Name</th>
                <th className="">Middle Name</th>
                <th className="">Contact</th>
                <th className="">Email</th>
                <th className="">Action</th>
              </tr>
            </thead>
         
        

        {/* Table Body */}


            <tbody>
              {pendingFaculty.length > 0 ? (
                pendingFaculty.map((faculty, index) => (
                  <tr key={faculty._id || index}>
                    <td className="">{faculty._id}</td>
                    <td className="">{faculty.lastName}</td>
                    <td className="">{faculty.firstName}</td>
                    <td className="">{faculty.middleName}</td>
                    <td className="">{faculty.contactNumber}</td>
                    <td className="">{faculty.emailAddress}</td>
                    <td className="">
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
