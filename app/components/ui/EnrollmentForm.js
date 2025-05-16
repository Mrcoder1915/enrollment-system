"use client";
import React, { useContext } from "react";
import { dashboardContext } from "@/app/providers/dashboardProvider";

const EnrollmentForm = () => {
  const { show } = useContext(dashboardContext);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const studentId = event.target.studentId.value.trim();
    const firstName = event.target.firstName.value.trim();
    const middleName = event.target.middleName.value.trim();
    const lastName = event.target.lastName.value.trim();
    const program = event.target.program.value.trim();
    const section = event.target.section.value;
    const yearLevel = event.target.yearLevel.value;
    const semester = event.target.semester.value;

    if (
      !studentId ||
      !firstName ||
      !middleName ||
      !lastName ||
      !program ||
      !section ||
      !yearLevel ||
      !semester
    ) {
      alert("Please fill in all the fields.");
      return;
    }

    const enrollments = {
      studentId,
      firstName,
      middleName,
      lastName,
      program,
      section,
      yearLevel,
      semester,
    };

    try {
      const response = await fetch("/api/Student/studentenrollment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(enrollments),
      });

      if (!response.ok) {
        throw new Error("Failed to submit enrollment data.");
      }

      const result = await response.json();
      console.log("Enrollment successful:", result);

      localStorage.setItem(
        "enrollmentStatus",
        JSON.stringify({
          name: `${firstName} ${middleName} ${lastName}`,
          year: yearLevel,
          semester: semester,
        })
      );

      window.location.href = "/status";
    } catch (error) {
      console.error("Error submitting enrollment:", error);
      alert("There was a problem submitting the enrollment. Please try again.");
    }
  };

  return (
    <div
      className={`w-full h-[80vh] p-5 absolute flex justify-center flex-col transition-all ease-in duration-300 ${
        show === 2 ? "translate-x-0 visible" : "-translate-x-[200%] invisible"
      }`}
    >
      <div className="bg-white p-6 shadow-md rounded-md">
        <h2 className="bg-red-800 text-white py-4 px-5 text-xl font-bold rounded-t-md mb-4">
          Enrollment Form
        </h2>
        <form id="enrollmentForm" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="studentId" className="block text-gray-700 text-sm font-bold mb-2">
              Student ID:
            </label>
            <input
              type="text"
              id="studentId"
              placeholder="Enter Student ID"
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
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Section</option>
                <option>BSIT-1A</option>
                <option>BSIT-1B</option>
                <option>BSIT-2A</option>
                <option>BSIT-2B</option>
              </select>
            </div>
            <div>
              <label htmlFor="yearLevel" className="block text-gray-700 text-sm font-bold mb-2">
                Year Level:
              </label>
              <select
                id="yearLevel"
                required
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              >
                <option value="">Select Year</option>
                <option>1st</option>
                <option>2nd</option>
                <option>3rd</option>
                <option>4th</option>
              </select>
            </div>
          </div>
          <div className="mb-4">
            <label htmlFor="semester" className="block text-gray-700 text-sm font-bold mb-2">
              Semester:
            </label>
           <div className="flex justify-start">
        <select
    id="semester"
    required
    className="shadow appearance-none border rounded w-full max-w-xs py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
  >
    <option value="">Select Semester</option>
    <option>1st sem</option>
    <option>2nd sem</option>
  </select>
</div>

          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-red-800 hover:bg-red-900 text-yellow-500 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Process Enrollment
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EnrollmentForm;
