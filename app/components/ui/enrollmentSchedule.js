'use client';

import React, { useState, useEffect, useContext } from 'react';
import { dashboardContext } from '@/app/providers/dashboardProvider';
import Link from 'next/link';

const EnrollmentSchedule = () => {
  const { show,view } = useContext(dashboardContext);
  const [enrollments, setEnrollments] = useState([]);

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const response = await fetch('/api/Student/EnrollmentSchedule', {
          method: 'GET'
        });
        if (response.ok) {
          const data = await response.json();
          setEnrollments(data);
        } else {
          console.error('Failed to fetch schedule data');
        }
      } catch (error) {
        console.error('Error fetching schedule:', error);
      }
    };

    fetchSchedule();
  }, []);

  const handleEnroll = () => {
    alert("You are now enrolled!");

  };
const getView = () => {
  if(view == 2 && show == 2){   
    return  'translate-x-0 visible'
  }
  return '-translate-x-[200%] invisible'
}
  return (
    <div
      className={`w-full absolute flex items-center justify-center flex-col transition-all ease-in duration-300 ${ getView()
      }`}
    >
      <div className="w-full max-w-7xl bg-white p-5 sm:p-5 md:p-8 rounded-lg shadow-lg">
        <div className="bg-[#800000] px-4 py-2 rounded-t-md shadow-lg">
          <h1 className="text-xl sm:text-2xl text-white font-semibold">Schedule</h1>
        </div>

          <table className="w-full border-collapse text-left">
            <thead className="bg-gray-200 sticky top-0 z-10">
              <tr>
                <th className="p-4 border">Course Code</th>
                <th className="p-4 border">Course Name</th>
                <th className="p-4 border">Room #</th>
                <th className="p-4 border">Day</th>
                <th className="p-4 border">Time</th>
                <th className="p-4 border">Units</th>
              </tr>
            </thead>
 <tbody>
      {/* Static Entries */}
      <tr>
        <td className="p-2 border">CC100</td>
        <td className="p-2 border">Introduction to Computing</td>
        <td className="p-2 border">RM.206</td>
        <td className="p-2 border">Monday</td>
        <td className="p-2 border">1:00PM-4:00PM</td>
        <td className="p-2 border">3 Units</td>
      </tr>
      <tr>
        <td className="p-2 border">CC101</td>
        <td className="p-2 border">Computer Programming 1, Fundamentals</td>
        <td className="p-2 border">RM.201</td>
        <td className="p-2 border">Tuesday</td>
        <td className="p-2 border">12:00NN to 5:00PM</td>
        <td className="p-2 border">3 Units</td>
      </tr>
      <tr>
        <td className="p-2 border">IT-NET01</td>
        <td className="p-2 border">Networking 1, Fundamentals</td>
        <td className="p-2 border">RM.202/LAB 2</td>
        <td className="p-2 border">Friday</td>
        <td className="p-2 border">12:00NN to 5:00PM</td>
        <td className="p-2 border">3 Units</td>
      </tr>
      <tr>
        <td className="p-2 border">GE04</td>
        <td className="p-2 border">Mathematics in the Modern World</td>
        <td className="p-2 border">RM.206</td>
        <td className="p-2 border">Thursday</td>
        <td className="p-2 border">5:30PM to 8:30PM</td>
        <td className="p-2 border">3 Units</td>
      </tr>
      <tr>
        <td className="p-2 border">GE05</td>
        <td className="p-2 border">Purposive Communication</td>
        <td className="p-2 border">Multi-Purpose Hall</td>
        <td className="p-2 border">Monday</td>
        <td className="p-2 border">5:30PM to 8:30PM</td>
        <td className="p-2 border">3 Units</td>
      </tr>
      <tr>
        <td className="p-2 border">FIL 1</td>
        <td className="p-2 border">Kontakstwalisadong Komunikasyon sa Filipino (KOMFIL)</td>
        <td className="p-2 border">RM.101</td>
        <td className="p-2 border">Tuesday</td>
        <td className="p-2 border">5:30PM to 8:30PM</td>
        <td className="p-2 border">3 Units</td>
      </tr>
      <tr>
        <td className="p-2 border">GE07</td>
        <td className="p-2 border">Science, Technology and Society</td>
        <td className="p-2 border">RM.206</td>
        <td className="p-2 border">Wednesday</td>
        <td className="p-2 border">5:30PM to 8:30PM</td>
        <td className="p-2 border">3 Units</td>
      </tr>
      <tr>
        <td className="p-2 border">PE01</td>
        <td className="p-2 border">Advanced Gymnastics</td>
        <td className="p-2 border">Function Room 2/Nagano Gym</td>
        <td className="p-2 border">Friday</td>
        <td className="p-2 border">5:30PM to 7:30PM</td>
        <td className="p-2 border">3 Units</td>
      </tr>
      <tr>
        <td className="p-2 border">NSTP11</td>
        <td className="p-2 border">National Service Training Program 1</td>
        <td className="p-2 border">Nagano Gym</td>
        <td className="p-2 border">Wednesday</td>
        <td className="p-2 border">2:00PM to 5:00PM</td>
        <td className="p-2 border">3 Units</td>
      </tr>

      {/* Dynamic Entries */}
      {enrollments.length === 0 ? (
        <tr>
          <td colSpan="6" className="p-2 text-center text-gray-500">
          </td>
        </tr>
      ) : (
        enrollments.map((item, index) => (
          <tr key={item._id || index}>
            <td className="p-2 border">{item.courseCode}</td>
            <td className="p-2 border">{item.courseName}</td>
            <td className="p-2 border">{item.room}</td>
            <td className="p-2 border">{item.day}</td>
            <td className="p-2 border">{item.time}</td>
            <td className="p-2 border">{item.units}</td>
          </tr>
        ))
      )}
    </tbody>
  </table>
  
        <div className="flex justify-end mt-6">
            <Link href= "/enrollmentCard">
          <button
            className="px-5 py-2 bg-[#8b0606] text-yellow-300 font-bold border-2 border-yellow-300 rounded-md hover:bg-[#a30000] transition"
          >
            Enroll
          </button>
          </Link>
        </div>
      </div>
   </div>
  );
};

export default EnrollmentSchedule;
