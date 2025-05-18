"use client";

import React, { useEffect, useContext, useState } from "react";
import { dashboardContext } from '@/app/providers/dashboardProvider';

export default function InstructorSchedule() {
  const { show } = useContext(dashboardContext);
  const [scheduleData, setScheduleData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
console.log(scheduleData);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const res = await fetch(`/api/instructor/instructorProfile?instructorID=681cb3d0647a57329227988c`);
        if (!res.ok) throw new Error("Failed to fetch schedule");
        const data = await res.json();
        setScheduleData(data);
      } catch (err) {
        console.error(err);
        setError("Error loading schedule.");
      } finally {
        setLoading(false);
      }
    };

    fetchSchedule();
  }, []);

  return (
    <div
      className={`absolute top-5 right-5 left-5 w-full md:w-[calc(100%-40px)] h-full bg-white z-30 overflow-y-auto transition-transform duration-300 ease-in-out ${
        show === 2 ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <style>{`
        .hide-scrollbar::-webkit-scrollbar { display: none; }
        .hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .table-container { max-height: 400px; overflow-y: auto; }
        thead th { position: sticky; top: 0; background-color: #D1D5DB; }
      `}</style>

      <div className="flex flex-col items-center pt-24 px-4">
        <div className="rounded-md w-full max-w-6xl shadow-md">
          <h2 className="text-3xl text-white px-4 py-2 rounded-sm bg-red-900">
            Schedule
          </h2>

          <div className="grid grid-cols-2 bg-gray-300 text-sm font-semibold">
            <div className="p-3 border-r border-gray-500">Academic Year/Semester:</div>
            <div className="p-3">2024-2025 - 1st Semester</div>
          </div>

          <div className="border border-gray-300">
            <div className="table-container hide-scrollbar">
              {loading ? (
                <div className="p-4 text-center text-gray-600">Loading schedule...</div>
              ) : error ? (
                <div className="p-4 text-center text-red-600">{error}</div>
              ) : (
                <table className="min-w-full text-sm border-collapse">
                  <thead>
                    <tr>
                      <th className="px-4 py-2 border font-semibold">Program</th>
                      <th className="px-4 py-2 border font-semibold">Course/Subject</th>
                      <th className="px-4 py-2 border font-semibold">Day</th>
                      <th className="px-4 py-2 border font-semibold">Start Time</th>
                      <th className="px-4 py-2 border font-semibold">End Time</th>
                      <th className="px-4 py-2 border font-semibold">Section</th>
                      <th className="px-4 py-2 border font-semibold">Room#</th>
                    </tr>
                  </thead>
                  <tbody>
                    {scheduleData.map((item, index) => (
                      <tr key={index} className="text-center">
                        <td className="px-4 py-2 border">{item.courseID?.programID?.programName || "N/A"}</td>
                        <td className="px-4 py-2 border">
                          {item.courseID?.courseCode} ({item.courseID[0]?.courseName})
                        </td>
                        <td className="px-4 py-2 border">{item.day}</td>
                        <td className="px-4 py-2 border">{item.startTime}</td>
                        <td className="px-4 py-2 border">{item.endTime}</td>
                        <td className="px-4 py-2 border">{item.year_sectionID?.value}</td>
                        <td className="px-4 py-2 border">{item.room || "TBA"}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
