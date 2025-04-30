"use client";

import React, { useEffect, useContext } from "react";
import { dashboardContext } from '@/app/providers/dashboardProvider';

export default function InstructorSchedule() {
  const { show } = useContext(dashboardContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  const scheduleData = [
    { program: "BSIT", subject: "CC-101 (Computer Programming 1, Fundamentals)", day: "Tuesday", start: "9:00AM", end: "2:00PM", section: "BSIT 1A", room: "TBA" },
    { program: "BSIT", subject: "CC-101 (Computer Programming 1, Fundamentals)", day: "Monday", start: "12:00PM", end: "5:00PM", section: "BSIT 1B", room: "TBA" },
    { program: "BSIT", subject: "GE-04 (Mathematics in the Modern World)", day: "Monday", start: "5:30PM", end: "8:30PM", section: "BSIT 1A", room: "TBA" },
    { program: "BSIT", subject: "GE-04 (Mathematics in the Modern World)", day: "Thursday", start: "5:30PM", end: "8:30PM", section: "BSIT 1B", room: "TBA" },

    { program: "BSHM", subject: "THC 1 (Philippine Culture and Tourism Geography)", day: "Tuesday", start: "5:30PM", end: "8:30PM", section: "BSHM 1A", room: "TBA" },
    { program: "BSHM", subject: "THC 1 (Philippine Culture and Tourism Geography)", day: "Friday", start: "5:30PM", end: "8:30PM", section: "BSHM 1B", room: "TBA" },
    { program: "BSHM", subject: "THC 1 (Philippine Culture and Tourism Geography)", day: "Monday", start: "5:30PM", end: "8:30PM", section: "BSHM 1C", room: "TBA" },

    { program: "BSHM", subject: "GE Fil 1 (Kontekstwalisadong Komunikasyon sa Filipino)", day: "Saturday", start: "8:00AM", end: "11:00AM", section: "BSHM 1A", room: "TBA" },
    { program: "BSHM", subject: "GE Fil 1 (Kontekstwalisadong Komunikasyon sa Filipino)", day: "Saturday", start: "12:00PM", end: "3:00PM", section: "BSHM 1B", room: "TBA" },
    { program: "BSHM", subject: "GE Fil 1 (Kontekstwalisadong Komunikasyon sa Filipino)", day: "Saturday", start: "3:00PM", end: "6:00PM", section: "BSHM 1C", room: "TBA" },

    { program: "BSE", subject: "GEN ED 1 (Understanding the Self)", day: "Monday", start: "2:00PM", end: "5:00PM", section: "BSE 1A", room: "TBA" },
    { program: "BSE", subject: "PROF ED 1 (The Teaching Profession)", day: "Tuesday", start: "5:30PM", end: "8:30PM", section: "BSE 1A", room: "TBA" },

    { program: "BSBA", subject: "GE 5 (Purposive Communication)", day: "Thursday", start: "12:00PM", end: "3:00PM", section: "BSBA 1A", room: "TBA" },
    { program: "BSBA", subject: "GE 5 (Purposive Communication)", day: "Tuesday", start: "2:00PM", end: "5:00PM", section: "BSBA 1B", room: "TBA" },
    { program: "BSBA", subject: "GE 5 (Purposive Communication)", day: "Friday", start: "5:30PM", end: "8:30PM", section: "BSBA 1C", room: "TBA" },

    { program: "BSBA", subject: "BA CORE 1 (Basic Microeconomics)", day: "Monday", start: "8:00AM", end: "11:00AM", section: "BSBA 1A", room: "TBA" },
    { program: "BSBA", subject: "BA CORE 1 (Basic Microeconomics)", day: "Monday", start: "12:00PM", end: "3:00PM", section: "BSBA 1B", room: "TBA" },
    { program: "BSBA", subject: "BA CORE 1 (Basic Microeconomics)", day: "Tuesday", start: "8:00AM", end: "11:00AM", section: "BSBA 1C", room: "TBA" },
  ];

  return (
    <div
  className={`absolute top-5 right-5 left-5 w-full md:w-[calc(100%-40px)] h-full bg-white z-30 overflow-y-auto transition-transform duration-300 ease-in-out ${
    show === 2 ? "translate-x-0" : "translate-x-full "
  }`}
>

      <style>{`
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .table-container {
          max-height: 400px;
          overflow-y: auto;
        }
        thead th {
          position: sticky;
          top: 0;
          background-color: #D1D5DB;
        }
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
                      <td className="px-4 py-2 border">{item.program}</td>
                      <td className="px-4 py-2 border">{item.subject}</td>
                      <td className="px-4 py-2 border">{item.day}</td>
                      <td className="px-4 py-2 border">{item.start}</td>
                      <td className="px-4 py-2 border">{item.end}</td>
                      <td className="px-4 py-2 border">{item.section}</td>
                      <td className="px-4 py-2 border">{item.room}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
