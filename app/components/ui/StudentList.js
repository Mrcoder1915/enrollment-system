"use client";
import React, { useState } from "react";
import { useContext } from "react";
import { dashboardContext } from "@/app/providers/dashboardProvider";

const StudentList = () => {
  const { show } = useContext(dashboardContext);

  const students = [
    { id: 1, program: "BSIT", yearLevel: "2nd Year", section: "BSIT-2A", course: "Data Structures", enrolled: true },
    { id: 2, program: "BSHM", yearLevel: "3rd Year", section: "BSHM-3B", course: "Thermodynamics", enrolled: true },
    { id: 3, program: "BSBA", yearLevel: "1st Year", section: "BSBA-1C", course: "Principles of Management", enrolled: false },
    { id: 4, program: "BSIT", yearLevel: "4th Year", section: "BSIT-4D", course: "Advanced Calculus", enrolled: true },
    { id: 5, program: "BSIT", yearLevel: "2nd Year", section: "BSIT-2A", course: "Data Structures", enrolled: true },
  ];

  // Group and count enrolled students per course
  const courseEnrollment = students.reduce((acc, student) => {
    if (!acc[student.course]) {
      acc[student.course] = { ...student, count: 0 };
    }
    if (student.enrolled) {
      acc[student.course].count += 1;
    }
    return acc;
  }, {});

  const courseList = Object.values(courseEnrollment);

  return (
    <div
      className={`transition-all ease-in duration-300 ${
        show === 3 ? "translate-x-0 visible" : "translate-x-[-200%] invisible"
      }`}
    >
      <div className="p-5">
        {/* Term selection dropdown */}
        <div className="mb-4 text-left">
          <label htmlFor="term" className="font-bold mr-2">Term:</label>
          <select id="term" className="border border-gray-300 p-2 rounded-md" disabled>
            <option value="">Select Term</option>
            <option value="1st">1st Semester</option>
            <option value="2nd">2nd Semester</option>
          </select>
        </div>

        {/* Table for student list */}
        <div className="max-w-10xl mx-auto bg-white shadow-md rounded-lg">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-red-800 text-white">
                <th colSpan="6" className="py-3 text-xl font-bold text-left pl-5">
                  Student List
                </th>
              </tr>
              <tr className="bg-gray-300">
                <th className="px-5 py-3 text-left border-r">Program</th>
                <th className="px-5 py-3 text-left border-r">Year Level</th>
                <th className="px-5 py-3 text-left border-r">Section</th>
                <th className="px-5 py-3 text-left border-r">Course/Subject</th>
                <th className="px-5 py-3 text-left border-r">Enrolled Count</th>
                <th className="px-5 py-3 text-left">Select</th>
              </tr>
            </thead>
            <tbody>
              {courseList.map((courseData, index) => (
                <tr key={index} className="border-b">
                  <td className="px-5 py-3 text-center border-r">{courseData.program}</td>
                  <td className="px-5 py-3 text-center border-r">{courseData.yearLevel}</td>
                  <td className="px-5 py-3 text-center border-r">{courseData.section}</td>
                  <td className="px-5 py-3 text-center border-r">{courseData.course}</td>
                  <td className="px-5 py-3 text-center border-r">{courseData.count}</td>
                  <td className="px-5 py-3 text-center">
                    <button className="bg-yellow-500 text-white py-1 px-4 rounded-md">
                      Select
                    </button>
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

export default StudentList;