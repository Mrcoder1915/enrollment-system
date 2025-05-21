"use client";
import React, { useState, useEffect, useContext } from "react";
import { dashboardContext } from "@/app/providers/dashboardProvider";

const GradeEntry = () => {
  const { show, view, SetView } = useContext(dashboardContext) 

  const [studentData, setStudentData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchSelectGrade = async () => {
      setLoading(true);
      try {
        const res = await fetch("/api/instructor/SelectGrade");
        const data = await res.json();
        setStudentData(data);
      } catch (error) {
        console.error("Error fetching Select Grade Entry:", error.message);
        setStudentData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSelectGrade();
  }, []);

      const showStudent = () => {
      if(show === 4 && view !== 4){
        return "translate-x-[0] visible"
      }else {
          return "translate-x-[-200%]"
      }
    }
  return (
     <div className={`w-full h-[80vh] absolute  flex-icenter flex-col transition-all ease-in duration-300 ${showStudent()}
    `}>
        <div className="w-[95%]">
      <div className=" flex items-center gap-2">
        <label htmlFor="term" className="font-lg text-2xl">Term:</label>
        <select id="term" className="border border-black-300 p-0.5 rounded-md w-45">
          <option value="" hidden></option>
          <option value="1st">1st Semester</option>
          <option value="2nd">2nd Semester</option>
        </select>
      </div>
      <h1 className="w-full   bg-red-800 text-white py-3 text-3xl font-lg text-left pl-5 rounded-t-lg">
        Grade Entry
      </h1>
      <div className="w-full   bg-white shadow-[0px_4px_15px_rgba(0,0,0,0.25)] rounded-b-lg overflow-hidden">
        <div className="w-full overflow-y-auto hide-scrollbar max-h-[810px]">
          {loading ? (
            <div className="text-center py-10 text-lg font-semibold">Loading...</div>
          ) : (
            <table className="w-full  border-collapse">
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
                {studentData.map((courseData, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-5 py-3 text-center border-r">{courseData.program}</td>
                    <td className="px-5 py-3 text-center border-r">{courseData.yearLevel} Year</td>
                    <td className="px-5 py-3 text-center border-r">{courseData.section}</td>
                    <td className="px-5 py-3 text-center border-r">{courseData.course}</td>
                    <td className="px-5 py-3 text-center border-r">{courseData.enrolled}</td>
                    <td className="px-5 py-3 text-center">
                      <button className="bg-yellow-500 text-red-900 py-1 px-4 rounded-md" onClick={() => SetView(4)}>Select</button>
                    </td>
                  </tr>
                ))}
                {Array.from({ length: Math.max(0, 8 - studentData.length) }).map((_, index) => (
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
          )}
        </div>
      </div>
      </div>
    </div>
  );
};

export default GradeEntry;
