"use client";
import React, { useState, useContext, useEffect  } from 'react';
import { dashboardContext } from '@/app/providers/dashboardProvider';


const GradeTable = () => {
  const { show } = useContext(dashboardContext);
  const [selectedSemester, setSelectedSemester] = useState('');
  const [grades, setGrades] = useState([]);
  const [loading, setLoading] = useState(false)

    const handleChange = (index, field,  value) => {
    const newGrades = [...grades];
    newGrades[index][field] = value;
    setGrades(newGrades);
  };

  
  // const getEquivalentGrade = (average) => {
  //   const avg = parseFloat(average);
  //   if (avg >= 1.00 && avg <= 1.12) return "1.00";
  //   if (avg >= 1.13 && avg <= 1.37) return "1.25";
  //   if (avg >= 1.38 && avg <= 1.62) return "1.50";
  //   if (avg >= 1.63 && avg <= 1.87) return "1.75";
  //   if (avg >= 1.88 && avg <= 2.12) return "2.00";
  //   if (avg >= 2.13 && avg <= 2.37) return "2.25";
  //   if (avg >= 2.38 && avg <= 2.62) return "2.50";
  //   if (avg >= 2.63 && avg <= 2.87) return "2.75";
  //   if (avg >= 2.88 && avg <= 3.15) return "3.00";
  //   if (avg > 3.15 && avg <= 5.00) return "5.00";
  //   return "";
  // };

  const getRemarks = (gradeData) => {
    const semester = parseFloat(gradeData.semester);
    if (!isNaN(semester)) {
      if (semester <= 3.00) return { color: 'text-green-600' };
      if (semester > 3.00) return { color: 'text-red-600' };
    }
    return { color: '' };
  };
console.log(grades);
useEffect(() => {
   const fetchGrade = async () => {
    try {
      const res = await fetch(`/api/instructor/grades`);
      const data = await res.json();
      setGrades(data);
    } catch (err) {
      console.error("Failed to fetch grades:", err);
    }
  };
  fetchGrade()
},[])


  const uploadGrade = async () => {
    setLoading(true)
    try {
       await fetch(`/api/instructor/grades`,{
        method: "POST",
        headers: {"Content-Type": "application/json"},
        body: JSON.stringify(grades)
      });
     
    } catch (err) {
      console.error("Failed to fetch grades:", err);
    }finally{
       
      setLoading(false)
    }
    const res = await fetch(`/api/instructor/grades`);
    const data = await res.json();
    setGrades(data);
  };
  

 



  return (
    <div className={`w-full h-[80vh]  absolute flex items-center justify-center flex-col transition-all ease-in duration-300 ${
      show === 4 ? 'translate-x-0 visible' : '-translate-x-[200%]'
    }`}>
      <div className='flex flex-col w-[95%]'>
      <div className='w-full[ h-full'>
        <div className='w-full mb-3'>
          <label htmlFor="semester" className="font-bold mr-2">Semester:</label>
          <select
            id="semester"
            className="p-2 border rounded"
            // value={selectedSemester}
            // onChange={handleSemesterChange}
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
    <div className='w-full h-[90%]overflow-y-scroll'>
      <table className="w-full relative  border-collapse shadow-[4px_4px_10px_rgba(0,0,0,0.2),_-4px_4px_10px_rgba(0,0,0,0.2)] ">

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
  {
    grades?.map((Data, i) => {
         const { color } = getRemarks({semester: Data.calculatedGrade});
      return( 
      <tr key={Data.studentID}>
        <td className="border px-4 text-center min-h-[80px]">{Data.studentID}</td>
        <td className="border px-4 text-center">{`${Data.studentFirstName} ${Data.studentLastName}`}</td>
        <td className="border px-4 text-center">
          <input
            type="number"
            defaultValue={Data.midtermGrade}
            onChange={(e) => handleChange(i, "midtermGrade", Number(e.target.value))}
            className="w-16 border border-gray-400 px-1 py-1 rounded m-auto text-center bg-gray-200"
          />
        </td>
        <td className="border px-4 py-4 text-center">
          <input
            type="number"
            name="finals"
            defaultValue={Data.finalGrade}
            onChange={(e) => handleChange(i, "finalGrade", Number(e.target.value))}
            className="w-16 border border-gray-400 px-1 py-1 rounded m-auto text-center bg-gray-200"
          />
        </td>
        <td className="border px-4 py-4 text-center">
          <div  className="w-16 border border-gray-400 px-1 py-1 rounded m-auto text-center bg-gray-100">
           {Data.calculatedGrade} 
           
          </div>
        </td>
        <td className={`border px-4 py-4 text-center font-bold ${color}`}>
          {Data.remarks}
        </td>
      </tr>
    )
    }
    )}
  <tr>
    <td className="border px-4 py-25 text-center min-h-[80px]"></td>
    <td className="border px-4 py-25 text-center"></td>
    <td className="border px-4 py-25 text-center">
     
    </td>
    <td className="border px-4 py-4 text-center">
   
    </td>
    <td className="border px-4 py-4 text-center">
     
    </td>
    <td className={`border px-4 py-4 text-center font-bold }`}>
     
    </td>
  </tr>
</tbody>

      </table>
      </div>
 
     
    </div>
       <div className='w-[100%] flex justify-end'>
          <button disabled={loading? true: false} onClick={uploadGrade} className="bg-red-800 text-yellow-300 p-2 rounded-md mt-5 hover:bg-red-700 ml-240 border border-yellow">
              {loading? <div role="status">
          <svg aria-hidden="true" className="w-[50px] h-6 text-gray-200 animate-spin dark:text-green-600 fill-gray-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
              </svg>
              <span className="sr-only">Loading...</span>
            </div>: "Upload"}
          </button>
        </div>
        </div>
    </div>
  );
};

export default GradeTable;