import React, { useState, useContext } from "react";
import { dashboardContext } from '@/app/providers/dashboardProvider';

const ReportOfGrades = () => {
  const { show } = useContext(dashboardContext);
  return (
    <div className={`w-full h-[80vh] p-15 absolute flex justify-center flex-col transition-all ease-in duration-300 ${
      show === 4 ? 'translate-x-0 visible' : '-translate-x-[200%]'
    }`}>

      <h2 className="text-center bg-[#8b0606] p-6 mb-5 text-white text-5xl tracking-wide w-[95%]">
        Report of Grades
      </h2>
      <div className="mb-5 w-[95%]">
        <label htmlFor="semester" className="mr-2">A.Y Semester:</label>
        <select id="semester" className="border rounded p-2">
          <option value="1">1st Semester</option>
          <option value="2">2nd Semester</option>
         
        </select>
      </div>

      <table className="w-[95%] h-[400px] border-collapse shadow-[4px_4px_10px_rgba(0,0,0,0.2),_-4px_4px_10px_rgba(0,0,0,0.2)] overflow-hidden">
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
          <tr>
            <td className="p-2 border">1</td>
            <td className="p-2 border">CC100</td>
            <td className="p-2 border">Introduction to Computing</td>
            <td className="p-2 border">Escalona, Jerome</td>
            <td className="p-2 border"></td>
            <td className="p-2 border"></td>
          </tr>
          <tr>
            <td className="p-2 border">2</td>
            <td className="p-2 border">CC101</td>
            <td className="p-2 border">Computer Programming 1, Fundamentals</td>
            <td className="p-2 border">Gavino, Edgen Dy</td>
            <td className="p-2 border"></td>
            <td className="p-2 border"></td>
          </tr>
          <tr>
            <td className="p-2 border">3</td>
            <td className="p-2 border">IT-NET01</td>
            <td className="p-2 border">Networking 1, Fundamentals</td>
            <td className="p-2 border">De Leon, Elias</td>
            <td className="p-2 border"></td>
            <td className="p-2 border"></td>
          </tr>
          <tr>
            <td className="p-2 border">4</td>
            <td className="p-2 border">GE04</td>
            <td className="p-2 border">Mathematics in the Modern World</td>
            <td className="p-2 border">Cuevo, Benito</td>
            <td className="p-2 border"></td>
            <td className="p-2 border"></td>
          </tr>
          <tr>
            <td className="p-2 border">5</td>
            <td className="p-2 border">GE05</td>
            <td className="p-2 border">Purposive Communication</td>
            <td className="p-2 border">Tolentino, Janelle</td>
            <td className="p-2 border"></td>
            <td className="p-2 border"></td>
          </tr>
          <tr>
            <td className="p-2 border">6</td>
            <td className="p-2 border">FIL1</td>
            <td className="p-2 border">Kontakstwalisadong Komunikasyon sa Filipino (KOMFIL)</td>
            <td className="p-2 border">Dela Cruz, Emma O.</td>
            <td className="p-2 border"></td>
            <td className="p-2 border"></td>
          </tr>
          <tr>
            <td className="p-2 border">7</td>
            <td className="p-2 border">GE07</td>
            <td className="p-2 border">Science, Technology and Society</td>
            <td className="p-2 border">Soliman, Marites</td>
            <td className="p-2 border"></td>
            <td className="p-2 border"></td>
          </tr>
          <tr>
            <td className="p-2 border">8</td>
            <td className="p-2 border">PE01</td>
            <td className="p-2 border">Advanced Gymnastics</td>
            <td className="p-2 border">Biando, Ryan</td>
            <td className="p-2 border"></td>
            <td className="p-2 border"></td>
          </tr>
          <tr>
            <td className="p-2 border">9</td>
            <td className="p-2 border">NSTP11</td>
            <td className="p-2 border">National Service Training Program 1</td>
            <td className="p-2 border">Lazaro, Arlene</td>
            <td className="p-2 border"></td>
            <td className="p-2 border"></td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ReportOfGrades;