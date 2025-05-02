import connection from "../../../lib/config/connection";
import Admission from "@/app/models/Admission.model";
import Enrollment from "@/app/models/enrollment.model";
import Course from '../../../models/course.model'
import { NextResponse } from "next/server";
import Student from "../../../models/student.model";
import Program from '../../../models/program.model'

export async function POST(Req){
    const {YearLevel, Semester, AdmissionId} = await Req.json(); 
    
    if(!YearLevel || !Semester || !AdmissionId) return new Response(JSON.stringify({message: "no input body"}))
    
    await connection();

    try {
        const admission = await Admission.find({remarks: "approve", _id: AdmissionId}).populate("studentID");
        
        for(const aprovedAdmission of admission){
            if(aprovedAdmission && aprovedAdmission.studentID.program){
              const foundCourses = await Course.aggregate([
                {
                  $match: {$and: [{ year: YearLevel},{semester: Semester } ]},
                  
                },
                {
                  $lookup: {
                    from: "programs", 
                    localField: "programID",
                    foreignField: "_id",
                    as: "programData"
                  }
                },
                {
                    $match: {
                      "programData.programCode": aprovedAdmission.studentID.program,
                    },
                  },
                  {
                    $unwind: "$programData",
                  },
                  {
                      $project:{
                          _id:1,
                          year:1,
                          semester:1,
                          courseCode:1,
                          courseName:1,
                          credits:1,
                          programID: "$programData"
                      }
                  }
                ]);
                if(foundCourses && foundCourses.length > 0){
                  const acadYear = new Date().getFullYear()
                  const existingEnrollment = await Enrollment.find({studentID: aprovedAdmission.studentID._id, academicYear: acadYear})
                  
                  if(existingEnrollment.length === 0){
                    const enrollmentCourse = foundCourses.map((courses) => ({
                        
                        studentID : aprovedAdmission.studentID._id,
                        courseID: courses._id,
                        academicYear: acadYear,
                        enrollmentDate: Date.now()
                        
                    }))
                 
                    if(enrollmentCourse.length > 0){
                      
                      try {
                        await Enrollment.insertMany(enrollmentCourse);
                      } catch (error) {
                        return NextResponse.json({message: "Cant Insert Enrollment"})
                      }
                      
                      return NextResponse.json(enrollmentCourse)
                    }else{
                      return NextResponse.json({message: "no enrollment"})
                    }  
                  }else{
                    return NextResponse.json({message: "already enroll"})
                  }
                }else{
                  return NextResponse.json({message: "Course not found"})
                }  
            }
        }
        
       
       
    } catch (error) {
        return NextResponse.json({message: "cant find anything in admission", error: error.message})
    }
}

export async function GET(){
  await connection();
  try {
<<<<<<< HEAD
    const enroll = await Enrollment.find({status: 0})
=======
    const enroll = await Enrollment.find()
>>>>>>> a6f45e8eeb68fc8a061ddd004d94606ef45e21ef
    .populate({
      path: "studentID",
      model: "Student"
    })
    .populate({
      path: "courseID",
      model: "Course",
      populate: {
        path: "programID",
        model: "Program"
      }
    })
    if(!enroll && enroll.length === 0) return NextResponse.json({message: "no enrollment"})
   
   return NextResponse.json(enroll)
  } catch (error) {
    return NextResponse.json({message: error.message})
  }
  
}