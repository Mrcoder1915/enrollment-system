'use client';
import React, { useEffect, useState, useContext } from 'react';
import { dashboardContext } from '@/app/providers/dashboardProvider';

const ReportOfGrades = () => {
  const { show } = useContext(dashboardContext);
  const [courses, setGrades] = useState([]);
  const [semester, setSemester] = useState('1, 2');
  
  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await fetch('/api/Student/GradeReport');
        const data = await res.json(courses);
        setGrades(data);
      } catch (error) {
        console.error('Error fetching grades:', err);
      }
    };

    fetchGrades();
  }, [semester]);

  return (
    <div className={`w-full h-[80vh] p-15 absolute flex justify-center flex-col transition-all ease-in duration-300 ${
      show === 4 ? 'translate-x-0 visible' : '-translate-x-[200%]'
    }`}>
      <h2 className="text-center bg-[#8b0606] p-6 mb-5 text-white text-5xl tracking-wide w-[95%] rounded-md">
        Report of Grades
      </h2>
      <div className="mb-5 w-[95%]">
        <label htmlFor="semester" className="mr-2">A.Y Semester:</label>
        <select
          id="semester"
          className="border rounded p-2"
          onChange={e => setSemester(e.target.value)}
          value={semester}
        >
          <option value="1st Semester">1st Semester</option>
          <option value="2nd Semester">2nd Semester</option>
        </select>
      </div>

      <table className="w-[95%] h-[400px] border-collapse shadow overflow-hidden">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-4 border">No.</th>
            <th className="p-4 border">Course Code</th>
            <th className="p-4 border">Course Name</th>
            <th className="p-4 border">Instructor</th>
            <th className="p-4 border">Final Grade</th>
            <th className="p-4 border">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {courses.map((courses, index) => (
            <tr key={courses._id}>
              <td className="p-2 border">{index + 1}</td>
              <td className="p-2 border">{courses.courseCode}</td>
              <td className="p-2 border">{courses.courseName}</td>
              <td className="p-2 border">{courses.instructor}</td>
              <td className="p-2 border">{courses.finalGrade}</td>
              <td className="p-2 border">{courses.remarks}</td> 
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ReportOfGrades;
