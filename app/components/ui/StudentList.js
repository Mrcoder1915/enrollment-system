"use client";
import React, { useState, useContext, useEffect } from "react";
import { dashboardContext } from "@/app/providers/dashboardProvider";

const StudentList = () => {
  const { show , view, SetView} = useContext(dashboardContext);
  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedTerm, setSelectedTerm] = useState("");
  const [selectedStudentGroup, setSelectedStudentGroup] = useState(null);

  useEffect(() => {
    const fetchStudentList = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/instructor/studentlist");
        const data = await res.json();
        setStudentData(data);
      } catch (error) {
        console.error("Error fetching student list:", error.message);
        setStudentData([]);
      } finally {
        setLoading(false);
      }
    };
    fetchStudentList();
  }, []);

  if (selectedStudentGroup) {
    return (
      <div
        className={`transition-all ease-in duration-300 ${
          show === 3 ? "translate-x-0 visible" : "translate-x-[-200%] invisible"
        }`}
      >
        
        <button
          className="mt-4 ml-6 bg-gray-500 text-white px-4 py-2 rounded"
          onClick={() => setSelectedStudentGroup(null)}
        >
          Back to List
        </button>
      </div>
    );
  }
  const showStundent = () => {
      if(show === 3 && view !== 3){
        return "translate-x-[0] visible"
      }else {
          return "translate-x-[-200%]"
      }
    }

  return (
    <div
      className={`transition-all ease-in duration-300 ${showStundent()
      }`}
    >
      <div className="p-5">
        <div className="mb-4 text-left">
          <label htmlFor="term" className="font-bold mr-2">Term:</label>
          <select
            id="term"
            value={selectedTerm}
            onChange={(e) => setSelectedTerm(e.target.value)}
            className="border border-gray-300 p-2 rounded-md"
          >
            <option value="">Select Term</option>
            <option value="1st">1st Semester</option>
            <option value="2nd">2nd Semester</option>
          </select>
        </div>

        <div className="max-w-10xl mx-auto shadow-[4px_4px_10px_rgba(0,0,0,0.40)] rounded-lg overflow-hidden">
          <div className="bg-tertiary text-white px-6 py-3 text-xl font-bold rounded-t-md">
            Student List
          </div>
          <div className="overflow-y-auto hide-scrollbar max-h-[510px]">
            <table className="w-full table-auto border-collapse">
              <thead>
                <tr className="bg-gray-300 sticky top-0 z-10 text-center">
                  <th className="px-5 py-3 text-left border-r">Program</th>
                  <th className="px-5 py-3 text-left border-r">Year Level</th>
                  <th className="px-5 py-3 text-left border-r">Section</th>
                  <th className="px-5 py-3 text-left border-r">Course/Subject</th>
                  <th className="px-5 py-3 text-left border-r">Enrolled</th>
                  <th className="px-5 py-3 text-left">Select</th>
                </tr>
              </thead>
              <tbody>
                {loading ? (
                  <tr>
                    <td colSpan="6" className="text-center py-3">Loading student list...</td>
                  </tr>
                ) : studentData.length > 0 ? (
                  studentData.map((item, index) => (
                    <tr key={index} className="border-b">
                      <td className="px-5 py-3 text-center border-r">{item.program}</td>
                      <td className="px-5 py-3 text-center border-r">{item.yearLevel}</td>
                      <td className="px-5 py-3 text-center border-r">{item.section}</td>
                      <td className="px-5 py-3 text-center border-r">{item.course}</td>
                      <td className="px-5 py-3 text-center border-r">{item.enrolled}</td>
                      <td className="px-5 py-3 text-center">
                        <button
                          className="bg-yellow-500 text-white py-1 px-4 rounded-md"
                          onClick={() => SetView(3)}
                        >
                          Select
                        </button>
                      </td>
                    </tr>
                  ))
                ) : selectedTerm !== "" ? (
                  <tr>
                    <td colSpan="6" className="text-center py-3">No records found for this term.</td>
                  </tr>
                ) : (
                  <tr>
                    <td colSpan="6" className="text-center py-3">Please select a term.</td>
                  </tr>
                )}

                {Array.from({ length: Math.max(0, 8 - studentData.length) }).map((_, index) => (
                  <tr key={`empty-${index}`} className="border-b">
                    <td className="px-5 py-3 text-center border-r">&nbsp;</td>
                    <td className="px-5 py-3 text-center border-r">&nbsp;</td>
                    <td className="px-5 py-3 text-center border-r">&nbsp;</td>
                    <td className="px-5 py-3 text-center border-r">&nbsp;</td>
                    <td className="px-5 py-3 text-center border-r">&nbsp;</td>
                    <td className="px-5 py-3 text-center">&nbsp;</td>
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

export default StudentList;
