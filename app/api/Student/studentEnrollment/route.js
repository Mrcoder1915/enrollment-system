import connection from "../../../lib/config/connection";
import Admission from "@/app/models/Admission.model";
import Enrollment from "@/app/models/enrollment.model";
import Course from '../../../models/course.model'
import { NextResponse } from "next/server";
import Student from "../../../models/student.model";
import Program from '../../../models/program.model'
import YearAndSection from "@/app/models/yearandsection.model";
import jwt from "jsonwebtoken"

export async function POST(Req) {
  const { YearLevel, Semester, AdmissionId , value} = await Req.json();

  if (!YearLevel || !Semester || !AdmissionId) {
    return NextResponse.json({ message: "no input body" });
  }

  await connection();

  try {
    const admission = await Admission.find({
      remarks: "approve",
      _id: AdmissionId
    }).populate("studentID");

    const yearandsection = await YearAndSection.find({value})

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
      year_sectionID: yearandsection.year_sectionID,
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

export async function GET(req) {
  await connection()

  const token = req.cookies.get('accessToken')?.value;
  
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decoded);

      const admission = await Admission.findOne({studentID: decoded.studentID}).populate("studentID")

      if(!admission ||admission?.length === 0 ) return NextResponse.json({message: "admission not found"},{status: 404})
      
      return NextResponse.json((admission),{status: 404})
    }catch(error){
      return NextResponse.json({message: error.message},{status: 500})
    }
}