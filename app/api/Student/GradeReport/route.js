import connection from '@/app/lib/config/connection';
import Grade from '@/app/models/GradeEntry.model';
import Instructor from '@/app/models/instructor.model';
import Course from '@/app/models/course.model';
import { NextResponse } from 'next/server';
import { ObjectId } from 'mongodb';


export async function GET() {
  await connection()
  try {
    const Grades = await Grade.aggregate([
      {
        $match: {studentID: new ObjectId("67f7e4a86dcdfbab210025bc")}
      },
      {
        $lookup: {
            from: "instructors",
            localField: "instructorID",
            foreignField: "_id",
            as: "instructor"
        }
      },
      { $unwind: { path: '$instructor', preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
            from: "courses",
            localField: "courseID",
            foreignField: "_id",
            as: "course"
        }
      },
      { $unwind: { path: '$course', preserveNullAndEmptyArrays: true } },
      {
        $project: {
          _id: 0,
          courseName: "$course.courseName",
          courseCode: "$course.courseCode",
          instructorFirstName: "$instructor.firstName",
          instructorLastName: "$instructor.lastName",
          finalGrade: "$finalGrade",
          remarks: "$remarks"
        }
      }
    ])
    return NextResponse.json((Grades), {status: 200})
  } catch (error) {
    return NextResponse.json({message: error.message}, {status: 500})
  }
   
}
