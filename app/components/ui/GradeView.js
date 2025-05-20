'use client';
import React, { useEffect, useState, useContext } from 'react';
import { dashboardContext } from '@/app/providers/dashboardProvider';

const ReportOfGrades = () => {
  const { show } = useContext(dashboardContext);
  const [grades, setGrades] = useState([]);
  const [semester, setSemester] = useState('1st Semester');

  useEffect(() => {
    const fetchGrades = async () => {
      try {
        const res = await fetch('/api/Student/GradeReport');
        const data = await res.json();
        setGrades(data);
      } catch (error) {
        console.error('Error fetching grades:', error);
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
    <div className='flex w-full  overflow-y-scroll hide-scrollbar'>
      <table className="table overflow-y-hidden">
        <thead className='border-0 border-black border-solid'>
          <tr className="bg-gray-200">
            <th className="">No.</th>
            <th className="">Course Code</th>
            <th className="">Course Name</th>
            <th className="">Instructor</th>
            <th className="">Final Grade</th>
            <th className="">Remarks</th>
          </tr>
        </thead>
        <tbody>
          {grades.map((course, index) => (
            <tr key={index}>
              <td >{index + 1}</td>
              <td >{course.courseCode}</td>
              <td >{course.courseName}</td>
              <td >{`${course.instructorFirstName} ${course.instructorLastName}`}</td>
              <td >{course.finalGrade}</td>
              <td >{course.remarks}</td> 
            </tr>
          ))}
           
        </tbody>
      </table>
      </div>
    </div>
  );
};

export default ReportOfGrades;
