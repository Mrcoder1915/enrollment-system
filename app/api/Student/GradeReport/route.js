// app/api/Student/GradeReport/route.js
import { NextResponse } from 'next/server';
import connection from '@/app/lib/config/connection'; // renamed for clarity
import Grade from '@/models/Grade.model';
import Course from '@/models/course.model';
import Instructor from '@/models/instructor.model';

export async function GET() {
  try {
    await connection();
    await Course();
    await Instructor();

    const grades = await Grade.find({})
      .populate('courseID')
      .populate('instructorID');

    const formatted = grades.map((grade) => ({
      _id: grade._id,
      courseCode: grade.courseID?.code || 'N/A',
      courseName: grade.courseID?.name || 'N/A',
      instructor: grade.instructorID?.name || 'N/A',
      finalGrade: grade.finalGrade,
      remarks: grade.remarks,
    }));

    return NextResponse.json(formatted, { status: 200 });

  } catch (error) {
    console.error('Error fetching grades:', error);
    return NextResponse.json(
      { message: 'Failed to fetch grades', error: error.message },
      { status: 500 }
    );
  }
}
