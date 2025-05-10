"use client";
import React, { useState, useContext } from "react";
import { dashboardContext } from "@/app/providers/dashboardProvider";

const GradeEntry = () => {
  const { show } = useContext(dashboardContext) || {};

  const students = [
    {
      program: "BSIT",
      yearLevel: "1st Year",
      section: "BSIT-1B",
      course: "Introduction to Computing",
      enroll: true,
    },
  ];

  const courseEnroll = students.reduce((acc, stud) => {
    if (!acc[stud.course]) {
      acc[stud.course] = { ...stud, count: 51 };
    }
    if (stud.enrolled) {
      acc[stud.course].count += 1;
    }
    return acc;
  }, {});

  const courseList = Object.values(courseEnroll);

  return (
    <div>
      <div className="mt-10 px-75 pt-4 pb-2 flex items-center gap-2">
        <label htmlFor="term" className="font-lg text-2xl">Term:</label>
        <select id="term" className="border border-black-300 p-0.5 rounded-md w-45">
          <option value="" hidden></option>
          <option value="1st">1st Semester</option>
          <option value="2nd">2nd Semester</option>
        </select>
      </div>
      <h1 className="w-[90%] max-w-3xl mx-auto bg-red-800 text-white py-3 text-3xl font-lg text-left pl-5 rounded-t-lg">
        Grade Entry
      </h1>
      <div className="w-[90%] max-w-3xl mx-auto bg-white shadow-[0px_4px_15px_rgba(0,0,0,0.25)] rounded-b-lg overflow-hidden">
        <div className="overflow-y-auto hide-scrollbar max-h-[510px]">
          <table className="w-full table-auto border-collapse">
            <thead>
              <tr className="bg-gray-300 sticky top-0 z-10 text-center border-b">
                <th className="px-5 py-4 text-center border-r font-medium">Program</th>
                <th className="px-5 py-4 text-center border-r font-medium">Year Level</th>
                <th className="px-5 py-4 text-center border-r font-medium">Section</th>
                <th className="px-5 py-4 text-center border-r font-medium">Course/Subject</th>
                <th className="px-5 py-4 text-center border-r font-medium">Enrolled</th>
                <th className="px-5 py-4 text-center font-medium">Select</th>
              </tr>
            </thead>
            <tbody>
              {courseList.map((courseData, index) => (
                <tr key={index} className="border-b">
                  <td className="px-5 py-3 text-center border-r">
                    {courseData.program}
                  </td>
                  <td className="px-5 py-3 text-center border-r">
                    {courseData.yearLevel}
                  </td>
                  <td className="px-5 py-3 text-center border-r">
                    {courseData.section}
                  </td>
                  <td className="px-5 py-3 text-center border-r">
                    {courseData.course}
                  </td>
                  <td className="px-5 py-3 text-center border-r">
                    {courseData.count}
                  </td>
                  <td className="px-5 py-3 text-center">
                    <button className="bg-yellow-500 text-red-900 py-1 px-4 rounded-md">Select</button>
                  </td>
                </tr>
              ))}
              {Array.from({ length: Math.max(0, 8 - courseList.length) }).map((_, index) => (
                  <tr key={`empty-${index}`}>
                    <td className="px-5 py-3 text-center border-r">&nbsp;</td>
                    <td className="px-5 py-3 text-center border-r">&nbsp;</td>
                    <td className="px-5 py-3 text-center border-r">&nbsp;</td>
                    <td className="px-5 py-3 text-center border-r">&nbsp;</td>
                    <td className="px-5 py-3 text-center border-r">&nbsp;</td>
                    <td className="px-5 py-3 text-center"></td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GradeEntry;