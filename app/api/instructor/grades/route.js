import connection from "@/app/lib/config/connection";
import { NextResponse } from "next/server";
import Grade from '@/app/models/GradeEntry.model'; 
import mongoose from "mongoose";

export async function POST(req) {
  try {
    await connection();
    const grades = await req.json();

    if (!Array.isArray(grades)) {
      return NextResponse.json({ error: "Expected an array of grades." }, { status: 400 });
    }

    const results = [];

    for (const g of grades) {
      const { studentID, instructorID, courseID, midtermGrade, finalGrade, year_sectionID } = g;
      console.log("ALL BODY: ",  studentID, instructorID, courseID, midtermGrade, finalGrade, year_sectionID );
      
      if (!studentID || !instructorID || !courseID || midtermGrade == null || !finalGrade == null) {
        console.log("All fields are required for each grade.");
        
        return NextResponse.json({ error: "All fields are required for each grade." }, { status: 400 });
      } 

      const avg = (parseFloat(midtermGrade) + parseFloat(finalGrade)) / 2;
      let remarks = "inc";

        const getEquivalentGrade = (average) => {
          const avg = parseFloat(average);
          if (avg >= 1.00 && avg <= 1.12) return 1.00;
          if (avg >= 1.13 && avg <= 1.37) return 1.25;
          if (avg >= 1.38 && avg <= 1.62) return 1.50;
          if (avg >= 1.63 && avg <= 1.87) return 1.75;
          if (avg >= 1.88 && avg <= 2.12) return 2.00;
          if (avg >= 2.13 && avg <= 2.37) return 2.25;
          if (avg >= 2.38 && avg <= 2.62) return 2.50;
          if (avg >= 2.63 && avg <= 2.87) return 2.75;
          if (avg >= 2.88 && avg <= 3.15) return 3.00;
          if (avg > 3.15 && avg <= 5.00) return 5.00;
          return null;
        };

      if (getEquivalentGrade(avg) <= 3.00 && getEquivalentGrade(avg) >= 1.00) remarks = "passed";
      else if (getEquivalentGrade(avg) > 3.00) remarks = "failed";

      const grade = await Grade.findOneAndUpdate(
  {
    studentID: new mongoose.Types.ObjectId(studentID),
    instructorID: new  mongoose.Types.ObjectId(instructorID),
    courseID: new  mongoose.Types.ObjectId(courseID),
    year_sectionID: new  mongoose.Types.ObjectId(year_sectionID),
  },
  {
    midtermGrade,
    finalGrade,
    grade_computation: getEquivalentGrade(avg),
    remarks,
  },
  { upsert: true, new: true }
);

      results.push(grade);
    }

    return NextResponse.json({ message: "Grades saved successfully", grades: results }, { status: 201 });

  } catch (error) {
    console.error("Grade save failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
