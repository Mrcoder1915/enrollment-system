import connection from "../../../lib/config/connection";
import Admission from "@/app/models/Admission.model";
import Enrollment from "@/app/models/enrollment.model";
import Course from '../../../models/course.model'
import { NextResponse } from "next/server";
import Student from "../../../models/student.model";
import Program from '../../../models/program.model'

export async function POST(Req) {
  const { YearLevel, Semester, AdmissionId } = await Req.json();

  if (!YearLevel || !Semester || !AdmissionId) {
    return NextResponse.json({ message: "no input body" });
  }

  await connection();

  try {
    const admission = await Admission.find({
      remarks: "approve",
      _id: AdmissionId
    }).populate("studentID");

    

    const programCode = admission[0].studentID.program;

    const program = await Program.findOne({ programCode });

    const acadYear = new Date().getFullYear();

    const existingEnrollment = await Enrollment.find({studentID: admission[0].studentID._id, academicYear: acadYear})

    if(existingEnrollment.length > 0) return NextResponse.json({message: "You are already enroll"})

    const foundCourse = await Course.find({
      _id: { $in: program.courseIDs },
      year: YearLevel,
      semester: Semester
    });

    const courseIDs = foundCourse.map(course => course._id);
    console.log(courseIDs);
    
     await Enrollment.create({
      studentID: admission[0].studentID._id,
      admissionID: admission[0]._id,
      programID: program._id,
      academicYear: acadYear,
      enrolldate: Date.now(),
      approved: false,
      courseIDs: courseIDs
    });

    return NextResponse.json({message: "sucess"});
    
  } catch (error) {
    return NextResponse.json({
      message: "Error inserting enrollment",
      error: error.message
    });
  }
}

export async function GET(){
  await connection();
  try {

    // const enroll = await Enrollment.find({approve: false})
    //     .populate({
    //   path: "studentID",
    //   model: "Student"
    // }).populate({
    //   path: "admissionID",
    //   model: "Admission"
    // })
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



    if(!enroll && enroll.length === 0) return NextResponse.json({message: "no enrollment"})

      // console.log(enroll);
      
   
   return NextResponse.json(enroll)
  } catch (error) {
    return NextResponse.json({message: error.message})
  }
  
}