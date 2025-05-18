import Enrollment from "@/app/models/enrollment.model";
import connection from "@/app/lib/config/connection";
import { NextResponse } from "next/server";
export async function GET(){
  await connection();
  try {

const enroll = await Enrollment.aggregate([
  {
    $match: { approve: false }
  },
  {
    $lookup: {
      from: "admissions",
      localField: "admissionID",
      foreignField: "_id",
      as: "admission"
    }
  },
  { $unwind: { path: "$admission", preserveNullAndEmptyArrays: true } },
  {
    $lookup: {
      from: "students",
      localField: "studentID",
      foreignField: "_id",
      as: "student"
    }
  },
  { $unwind: { path: "$student", preserveNullAndEmptyArrays: true } },
  {
    $lookup: {
      from: "courses",
      localField: "courseIDs",
      foreignField: "_id",
      as: "courses"
    }
  },
  {
    $project: {
      _id: 1,
      approve: 1,
      "student._id": 1,
      "student.firstName": 1,
      "student.lastName": 1,
      "student.middleName": 1,
      "student.program": 1,
      "student.yearLevel": 1,
      "admission._id": 1,
      "admission.schoolYear": 1,
      "courses._id": 1,
      "courses.courseCode": 1,
      "courses.courseName": 1,
      "courses.semester": 1,
    }
  }
]);

    if(!enroll && enroll.length === 0) return NextResponse.json({message: "enrollment Not Found"}, {status: 404})
      
   return NextResponse.json(enroll)
  } catch (error) {
    return NextResponse.json({message: error.message},{status: 500})
  }
  
}