import React, { useState, useContext } from 'react';
import { dashboardContext } from '@/app/providers/dashboardProvider';

const GradeTable = () => {
  const { show } = useContext(dashboardContext);
  const [grades, setGrades] = useState({
    midterm: '',
    finals: '',
    semester: '',
  });

  const getEquivalentGrade = (average) => {
    const avg = parseFloat(average);
    if (avg >= 1.00 && avg <= 1.12) return "1.00";
    if (avg >= 1.13 && avg <= 1.37) return "1.25";
    if (avg >= 1.38 && avg <= 1.62) return "1.50";
    if (avg >= 1.63 && avg <= 1.87) return "1.75";
    if (avg >= 1.88 && avg <= 2.12) return "2.00";
    if (avg >= 2.13 && avg <= 2.37) return "2.25";
    if (avg >= 2.38 && avg <= 2.62) return "2.50";
    if (avg >= 2.63 && avg <= 2.87) return "2.75";
    if (avg >= 2.88 && avg <= 3.15) return "3.00";
    if (avg > 3.15 && avg <= 5.00) return "5.00"; // Failing grade
    return "";
  };

  const handleGradeChange = (e) => {
    const { name, value } = e.target;
  
    const updatedGrades = {
      ...grades,
      [name]: value,
    };
  
    const midterm = parseFloat(updatedGrades.midterm);
    const finals = parseFloat(updatedGrades.finals);
  
    if (!isNaN(midterm) && !isNaN(finals)) {
      const average = ((midterm + finals) / 2).toFixed(2);
      updatedGrades.semester = getEquivalentGrade(average);
    } else {
      updatedGrades.semester = '';
    }
  
    setGrades(updatedGrades);
  };

  const getRemarks = (grades) => {
    const midterm = parseFloat(grades.midterm);
    const finals = parseFloat(grades.finals);

    // If both are missing, no remarks
    if (isNaN(midterm) && isNaN(finals)) {
      return { text: '', color: '' };
    }

    // If only finals is present, and midterm is missing
    if (isNaN(midterm) && !isNaN(finals)) {
      return { text: 'INC', color: 'text-yellow-500' };
    }

    // If only midterm is present, and finals is missing
    if (!isNaN(midterm) && isNaN(finals)) {
      return { text: 'Incomplete', color: 'text-yellow-500' };
    }

    const parsed = parseFloat(grades.semester); // This is the final grade
    if (!isNaN(parsed)) {
      if (parsed <= 3.00) return { text: 'Passed', color: 'text-green-600' };
      if (parsed > 3.00) return { text: 'Failed', color: 'text-red-600' };
    }

    return { text: '', color: '' };
  };

  // Dynamically call getRemarks to ensure it updates when grades change
  const remarks = getRemarks(grades);

  return (
    <div className={`w-full h-[80vh]  absolute flex items-center justify-center flex-col transition-all ease-in duration-300 ${
      show === 4 ? 'translate-x-0 visible' : '-translate-x-[200%]'
    }`}>
      <div className="mb-3 mr-205">
        <label htmlFor="semester" className="font-bold mr-2">Semester:</label>
        <select id="semester" className="p-2 border rounded">
          <option value="">Select</option>
          <option>1st Semester</option>
          <option>2nd Semester</option>
        </select>
      </div>

      <div className="bg-red-800 text-white text-2xl font-bold p-4 flex justify-between w-[95%] border-collapse shadow-[4px_4px_10px_rgba(0,0,0,0.2),_-4px_4px_10px_rgba(0,0,0,0.2)]  overflow-hidden">
        <span>BSIT</span>
        <span className="flex-1 text-center">Academic Year:</span>
      </div>

      <div className="bg-gray-100 p-3 text-lg font-medium w-[95%] border-collapse shadow-[4px_4px_10px_rgba(0,0,0,0.2),_-4px_4px_10px_rgba(0,0,0,0.2)] overflow-hidden">
        Course: CC100 - Introduction to Computing
      </div>

      <table className="w-[95%] h-[400px] border-collapse shadow-[4px_4px_10px_rgba(0,0,0,0.2),_-4px_4px_10px_rgba(0,0,0,0.2)] overflow-hidden">

        <thead>
          <tr>
            <th className="border px-4 py-2 bg-gray-200 text-center">Student ID</th>
            <th className="border px-4 py-2 bg-gray-200 text-center">Student Name</th>
            <th className="border px-4 py-2 bg-gray-200 text-center">Midterm</th>
            <th className="border px-4 py-2 bg-gray-200 text-center">Final</th>
            <th className="border px-4 py-2 bg-gray-200 text-center">Semester Grade</th>
            <th className="border px-4 py-2 bg-gray-200 text-center">Remarks</th>
          </tr>
        </thead>
        <tbody>
  <tr>
    <td className="border px-4 text-center min-h-[80px]">U25-124</td>
    <td className="border px-4 text-center">Dela Cruz, Marian Pallarca</td>
    <td className="border px-4 text-center">
      <input
        type="number"
        name="midterm"
        value={grades.midterm}
        onChange={handleGradeChange}
        className="w-16 border border-gray-400 px-1 py-1 rounded m-auto text-center bg-gray-200"
      />
    </td>
    <td className="border px-4 py-4 text-center">
      <input
        type="number"
        name="finals"
        value={grades.finals}
        onChange={handleGradeChange}
        className="w-16 border border-gray-400 px-1 py-1 rounded m-auto text-center bg-gray-200"
      />
    </td>
    <td className="border px-4 py-4 text-center">
      <input
        type="text"
        name="semester"
        value={grades.semester}
        readOnly
        className="w-16 border border-gray-400 px-1 py-1 rounded m-auto text-center bg-gray-100"
      />
    </td>
    <td className={`border px-4 py-4 text-center font-bold ${remarks.color}`}>
      {remarks.text}
    </td>
  </tr>

  <tr>
    <td className="border px-4 py-25 text-center min-h-[80px]"></td>
    <td className="border px-4 py-25 text-center"></td>
    <td className="border px-4 py-25 text-center">
     
    </td>
    <td className="border px-4 py-4 text-center">
   
    </td>
    <td className="border px-4 py-4 text-center">
     
    </td>
    <td className={`border px-4 py-4 text-center font-bold ${remarks.color}`}>
     
    </td>
  </tr>
</tbody>

      </table>

      <button className="bg-red-800 text-yellow-300 p-2 rounded-md mt-5 hover:bg-red-700 ml-240 border border-yellow">
        Upload
      </button>
    </div>
  );
};

export default GradeTable;