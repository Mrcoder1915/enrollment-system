"use client";
import React, { useState, useContext, useEffect } from 'react';
import { dashboardContext } from '@/app/providers/dashboardProvider';

const GradeTable = () => {
  const { show } = useContext(dashboardContext);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [studentGrades, setStudentGrades] = useState([]);
  const [grades, setGrades] = useState({});
  console.log(grades);
  
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
    if (avg > 3.15 && avg <= 5.00) return "5.00";
    return "";
  };

  const getRemarks = (gradeData) => {
    const midterm = parseFloat(gradeData?.midterm);
    const final = parseFloat(gradeData?.final);
    const semester = parseFloat(gradeData?.semester);

    if (isNaN(midterm) && isNaN(final)) return { text: '', color: '' };
    if (!isNaN(final) && isNaN(midterm)) return { text: 'INC', color: 'text-yellow-500' };
    if (!isNaN(midterm) && isNaN(final)) return { text: 'Incomplete', color: 'text-yellow-500' };
    if (!isNaN(semester)) {
      if (semester <= 3.00) return { text: 'Passed', color: 'text-green-600' };
      if (semester > 3.00) return { text: 'Failed', color: 'text-red-600' };
    }
    return { text: '', color: '' };
  };

  const handleSemesterChange = async (e) => {
    const semester = e.target.value;
    setSelectedSemester(semester);
    try {
      const res = await fetch(`/api/instructor/grades`);
      const data = await res.json();
      setStudentGrades(data);
    } catch (err) {
      console.error("Failed to fetch grades:", err);
    }
  };

  const handleGradeChange = (id, type, value) => {
    setGrades(prev => {
      const updated = {
        ...prev[id],
        [type]: value
      };

      const midterm = parseFloat(updated.midterm);
      const final = parseFloat(updated.final);

      if (!isNaN(midterm) && !isNaN(final)) {
        const average = ((midterm + final) / 2).toFixed(2);
        updated.semester = getEquivalentGrade(average);
      } else {
        updated.semester = '';
      }

      return {
        ...prev,
        [id]: updated
      };
    });
  };

  const handleSubmitAllGrades = async () => {
    const payloads = studentGrades.map(entry => {
      console.log("entry", entry);
      
      const gradeData = grades.entry.students[0]._id || {};
      if (!gradeData?.midterm || !gradeData?.final || !gradeData?.semester) return null;
      console.log(payloads);
      
      return {
        studentID: entry.student[0]._id,
        instructorID: entry.instructorID || '123',
        courseID: entry.courseID || 'CC100',
        midtermGrade: gradeData.midterm,
        finalGrade: gradeData.final,
        semesterGrade: gradeData.semester
      };
    }).filter(Boolean);

    if (payloads.length === 0) {
      alert("No complete grade data to submit.");
      return;
    }

    try {
      const res = await fetch('/api/instructor/insertionGrade', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payloads)
      });

      const result = await res.json();
      if (!res.ok) {
        console.error("Error submitting grades:", result.error);
        alert("Failed to submit grades.");
      } else {
        alert("Grades submitted successfully.");
        handleSemesterChange({ target: { value: selectedSemester } });
      }
    } catch (err) {
      console.error("Submission failed:", err);
    }
  };

  return (
    <div className={`w-full h-[80vh] absolute flex items-center justify-center flex-col transition-all ease-in duration-300 ${
      show === 4 ? 'translate-x-0 visible' : '-translate-x-[200%]'
    }`}>
      <div className='w-[95%] h-[95%]'>
        <div className='w-full mb-3'>
          <label htmlFor="semester" className="font-bold mr-2">Semester:</label>
          <select
            id="semester"
            className="p-2 border rounded"
            value={selectedSemester}
            onChange={handleSemesterChange}
          >
            <option value="">Select</option>
            <option>1st Semester</option>
            <option>2nd Semester</option>
          </select>
        </div>

        <div className="w-full bg-red-800 text-white text-2xl font-bold p-4 flex justify-between border-collapse shadow-[4px_4px_10px_rgba(0,0,0,0.2),_-4px_4px_10px_rgba(0,0,0,0.2)]">
          <span>BSIT</span>
          <span className="flex-1 text-center">Academic Year: {selectedSemester}</span>
        </div>

        <div className="w-full bg-gray-100 p-3 text-lg font-medium border-collapse shadow-[4px_4px_10px_rgba(0,0,0,0.2),_-4px_4px_10px_rgba(0,0,0,0.2)]">
          Course: CC100 - Introduction to Computing
        </div>

        <div className='w-full h-[80%] shadow-[4px_4px_10px_rgba(0,0,0,0.2),_-4px_4px_10px_rgba(0,0,0,0.2)] overflow-y-scroll hide-scrollbar'>
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-gray-200">
              <tr>
                <th className="border px-4 py-2 text-center">Student ID</th>
                <th className="border px-4 py-2 text-center">Student Name</th>
                <th className="border px-4 py-2 text-center">Midterm</th>
                <th className="border px-4 py-2 text-center">Final</th>
                <th className="border px-4 py-2 text-center">Semester Grade</th>
                <th className="border px-4 py-2 text-center">Remarks</th>
              </tr>
            </thead>
            <tbody>
              {studentGrades.length > 0 ? studentGrades.map((entry, idx) => {
                const studentID = entry.studentID;
                const studentName = entry.studentName || "Student Name";
                const gradeData = grades[entry.studentID] || {};
                const remark = getRemarks(gradeData);

                return (
                  <tr key={idx}>
                    <td className="border px-4 py-2 text-center">{entry.students[0]._id}</td>
                    <td className="border px-4 py-2 text-center">{`${entry.students[0].firstName} ${entry.students[0].lastName}`}</td>
                    <td className="border px-4 py-2 text-center">
                      <input
                        type="number"
                        value={gradeData.midterm || ''}
                        onChange={(e) => handleGradeChange(studentID, 'midterm', e.target.value)}
                        className="w-16 border border-gray-400 px-1 py-1 rounded m-auto text-center bg-gray-200"
                      />
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <input
                        type="number"
                        value={gradeData.final || ''}
                        onChange={(e) => handleGradeChange(studentID, 'final', e.target.value)}
                        className="w-16 border border-gray-400 px-1 py-1 rounded m-auto text-center bg-gray-200"
                      />
                    </td>
                    <td className="border px-4 py-2 text-center">
                      <input
                        type="text"
                        value={gradeData.semester || ''}
                        readOnly
                        className="w-16 border border-gray-400 px-1 py-1 rounded m-auto text-center bg-gray-100"
                      />
                    </td>
                    <td className={`border px-4 py-2 text-center font-bold ${remark.color}`}>
                      {remark.text}
                    </td>
                  </tr>
                );
              }) : (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">No data available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div className='w-[95%] relative top-13 pt-5 flex justify-end'>
        <button
          onClick={handleSubmitAllGrades}
          className="bg-red-800 text-yellow-300 p-2 rounded-md hover:bg-red-700 border border-yellow-500"
        >
          Upload
        </button>
      </div>
    </div>
  );
};

export default GradeTable;
