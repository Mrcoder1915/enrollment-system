import connection from "@/app/lib/config/connection";
import Admission from "@/app/models/Admission.model";
import Enrollment from "@/app/models/enrollment.model";
import Course from '@/app/models/course.model'
import { NextResponse } from "next/server";
import Student from "../../../../models/student.model";
import Program from '@/app/models/program.model'



export async function GET(){
  await connection();
  try {

    const enroll = await Admission.find()
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