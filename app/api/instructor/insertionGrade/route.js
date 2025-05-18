import { NextResponse } from 'next/server';
import connection from '@/app/lib/config/connection'; // adjust path if needed
import Grade from '@/app/models/GradeEntry.model'; // adjust to your actual path

export async function POST(req) {
  try {
    await connection();
    const { studentID, instructorID, courseID, midtermGrade, finalGrade } = await req.json();

    if (!studentID || !instructorID || !courseID || midtermGrade == null || finalGrade == null) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const avg = (parseFloat(midtermGrade) + parseFloat(finalGrade)) / 2;

    let remarks = "inc";
    if (avg <= 3.00) remarks = "passed";
    else if (avg > 3.00) remarks = "failed";

    const newGrade = await Grade.create({
      studentID,
      instructorID,
      courseID,
      midtermGrade,
      finalGrade,
      grade_computation: avg,
      remarks
    });

    return NextResponse.json({ message: "Grade inserted successfully", grade: newGrade }, { status: 201 });
  } catch (error) {
    console.error("Grade insertion failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
