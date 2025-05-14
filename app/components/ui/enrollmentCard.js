'use client';

import React, { useState , useContext } from 'react';
import { dashboardContext } from '@/app/providers/dashboardProvider';

const EnrollmentCard = () => {
  const { show } = useContext(dashboardContext);
  const {showForm, setShowForn} = useState (false); 

  const enrollmentInfo = {
    department: "College of Information and Communications Technology",
    program: "Bachelor of Science in Information Technology",
    section: "1st Year - BSIT-2B",
    status: "ON PROCESS",
  };

  return (
    <div
      className={`w-full h-[80vh] absolute flex items-center justify-center flex-col transition-all ease-in duration-300 ${
        show === 2 ? 'translate-x-0 visible' : '-translate-x-[200%]'
      }`}
    >
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-[calc(100%-60px)] mx-[30px] bg-white rounded-lg shadow-lg">
          <div className="bg-red-800 text-white text-xl font-semibold px-6 py-4 rounded-t-lg">
            Enrollment (A.Y. 2024-2025 - 1st Semester)
          </div>
          <div className="px-6 py-5 text-gray-800 space-y-4 text-base">
            <div>
              <span className="font-bold inline-block w-32">DEPARTMENT:</span>
              {enrollmentInfo.department}
            </div>
            <div>
              <span className="font-bold inline-block w-32">PROGRAM:</span>
              {enrollmentInfo.program}
            </div>
            <div>
              <span className="font-bold inline-block w-32">SECTION:</span>
              {enrollmentInfo.section}
            </div>
            <div>
              <span className="font-bold inline-block w-32">STATUS:</span>
              <span className="text-red-800 font-bold">{enrollmentInfo.status}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EnrollmentCard;