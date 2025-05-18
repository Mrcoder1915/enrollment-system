import connection from "@/app/lib/config/connection";
import Schedule from "@/app/models/schedule.model";
import { NextResponse } from "next/server";

export async function GET() {
    await connection()
    try {
   const result = await Schedule.aggregate([
  {
    $match: {
      instructorID: 124
    }
  },
  {
    $lookup: {
      from: 'yearandsections',
      localField: 'year_sectionID',
      foreignField: '_id',
      as: 'yearandsection'
    }
  },
  {
    $unwind: {
      path: '$yearandsection',
      preserveNullAndEmptyArrays: true
    }
  },
  {
    $lookup: {
      from: 'courses',
      localField: 'courseID',
      foreignField: '_id',
      as: 'course'
    }
  },
  {
    $unwind: '$course'
  },
  {
    $lookup: {
      from: 'enrollments',
      let: { courseId: '$courseID', sectionId: '$year_sectionID' },
      pipeline: [
        {
          $match: {
            $expr: {
              $and: [
                { $in: ['$$courseId', '$courseIDs'] },
                { $eq: ['$yearandsectionID', '$$sectionId'] }
              ]
            }
          }
        },
        {
          $lookup: {
            from: 'students',
            localField: 'studentID',
            foreignField: '_id',
            as: 'student'
          }
        },
        {
          $unwind: {
            path: '$student',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $lookup: {
            from: 'programs',
            localField: 'programID',
            foreignField: '_id',
            as: 'program'
          }
        },
        {
          $unwind: {
            path: '$program',
            preserveNullAndEmptyArrays: true
          }
        }
      ],
      as: 'enrolledStudents'
    }
  },
  {
    $project: {
      _id: 0,
      instructorID: "$instructorID",
      sectionID: '$year_sectionID',
      sectionName: '$yearandsection.sectionName',
      courseID: '$course._id',
      courseName: '$course.courseName',
      courseYear: '$course.year',
      yearLevel: '$course.year',
      studentCount: { $size: '$enrolledStudents' },
      students: '$enrolledStudents.student',
      programs: '$enrolledStudents.program'
    }
  }
]);

          return NextResponse.json((result),{message: "sucess"}, {status: 500})
    
    } catch (error) {
        return NextResponse.json({message: "nothing happen error",error: error.message}, {status: 500})
    }

}
