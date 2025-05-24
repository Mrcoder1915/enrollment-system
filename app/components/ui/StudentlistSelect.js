"use client";
import React, { useEffect, useState, useContext } from "react";
import { dashboardContext } from "@/app/providers/dashboardProvider";

const StudentListSelect = ({ selectedGroup }) => {
      const { show , view, studentlist} = useContext(dashboardContext);
      console.log("StudentList: ", studentlist);
      
      const ViewDetails = () => {
        if(show === 3 && view === 3){
            return "translate-x-[0] visible"
        }
        return "translate-x-[-200%]"
    }

  return (
     <div 
    className={   
        `w-full h-[80vh] absolute
        flex-icenter flex-col transition-all
        ease-in duration-300
        z-20
        ${ViewDetails()}`
    }>
    <div 
    className="p-6 w-[95%] h-full">
      <div className="bg-red-800 text-white text-xl font-bold px-6 py-3 rounded-t-md shadow">
        Student List
      </div>


      <div className="overflow-x-auto shadow  border border-t-0 border-gray-300 rounded-b-md h-[95%]">
        
          <table className="min-w-full bg-white text-sm">
            <thead className="bg-gray-200 text-gray-700 text-left">
              <tr>
                <th className="px-4 py-2 border">No.</th>
                <th className="px-4 py-2 border">Last Name</th>
                <th className="px-4 py-2 border">First Name</th>
                <th className="px-4 py-2 border">Middle Name</th>
                <th className="px-4 py-2 border">Student ID</th>
                <th className="px-4 py-2 border">Year Level</th>
                <th className="px-4 py-2 border">Program</th>
                <th className="px-4 py-2 border">Section</th>
              </tr>
            </thead>
            <tbody>
        {
         studentlist.length === 0 ? (
          < tr className="p-6 text-center">
            <td>No students found.</td>
            </tr>
        ) : (
          
            studentlist.map((student, index) => (
              student.student.map((studentInfo) => (
                <tr key={`${student._id}-${studentInfo.studentID || index}`} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border">{index + 1}</td>
                  <td className="px-4 py-2 border">{studentInfo.student.lastName}</td>
                  <td className="px-4 py-2 border">{studentInfo.student.firstName}</td>
                  <td className="px-4 py-2 border">{studentInfo.student?.middleName}</td>
                  <td className="px-4 py-2 border">{studentInfo.studentID}</td>
                  <td className="px-4 py-2 border">{student.yearLevel}</td>
                  <td className="px-4 py-2 border">{student.program}</td>
                  <td className="px-4 py-2 border">{student.section}</td>
                </tr>
              ))
              ))
                 )}
            </tbody>
          </table>
     
      </div>
    </div>
    </div>
  );
};

export default StudentListSelect;