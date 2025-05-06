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

    const enroll = await Enrollment.find({approve: false})
    .populate({
      path: "studentID",
      model: "Student"
    })

    if(!enroll && enroll.length === 0) return NextResponse.json({message: "no enrollment"})

      // console.log(enroll);
      
   
   return NextResponse.json(enroll)
  } catch (error) {
    return NextResponse.json({message: error.message})
  }
  
}