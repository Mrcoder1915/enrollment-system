import { NextResponse } from "next/server";
import connection from "@/app/lib/config/connection";
import Schedule from "@/app/models/schedule.model";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export const GET = async (req) => {
  await connection();

  const cookieToken = req.cookies.get('accessToken')?.value;
  const authHeader = req.headers.get('authorization');
  const headerToken = authHeader?.startsWith('Bearer ') ? authHeader.slice(7) : null;
  const token = cookieToken || headerToken;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const id = decoded.instructorID;

    const data = await Schedule.aggregate([
      {
        $match: { instructorID: new ObjectId(id) }
      },
      {
        $lookup: {
          from: "courses",
          localField: "courseID",
          foreignField: "_id",
          as: "course"
        }
      },
      { $unwind: "$course" },
      {
        $lookup: {
          from: "programs",
          localField: "courseID",
          foreignField: "courseIDs",
          as: "program"
        }
      },
      { $unwind: "$program" },
      {
        $lookup: {
          from: "yearandsections",
          localField: "year_sectionID",
          foreignField: "_id",
          as: "yearSection"
        }
      },
      { $unwind: "$yearSection" },
      {
        $lookup: {
          from: "enrollments",
          let: { ysid: "$year_sectionID", cid: "$courseID" },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ["$year_sectionID", "$$ysid"] },
                    { $in: ["$$cid", "$courseIDs"] },            
                  ]
                }
              }
            },
             {
              $lookup: {
                from: "students",
                localField: "studentID",
                foreignField: "_id",
                as: "student"
              }
            },
          {
            $unwind: "$student"
          },
          
             { $lookup: {
          from: "grades",
          let: {
            sId: "$studentID",   // ObjectId of this student
            cId: "$$cid"         // courseId from parent Schedule
          },
          pipeline: [
            { $match: {
                $expr: {
                  $and: [
                    { $eq: [ "$studentID", "$$sId" ] },
                    { $eq: [ "$courseID",  "$$cId" ] }
                  ]
                }
            }}
          ],
          as: "grade"
      }},
{
  $unwind: { path: '$grade', preserveNullAndEmptyArrays: true } // 🔒 No preserveNullAndEmptyArrays = only students with grades appear
},
{
  $project: {
    _id: 0,
    studentID: 1,
    firstName: "$student.firstName",
    lastName: "$student.lastName",
    finalGrade: "$grade.finalGrade",
    midtermGrade: "$grade.midtermGrade",
    calculatedGrade: "$grade.grade_computation",
    remarks: "$grade.remarks"
  }
}

          ],
          as: "enrolled"
        }
      },
      {
        $addFields: {
          enrolledCount: {$size: "$enrolled"},
          section: "$yearSection.value",
          yearLevel: {
            $toInt: {
              $substrCP: [
                { $arrayElemAt: [{ $split: ["$yearSection.value", "-"] }, 1] },
                0,
                1
              ]
            }
          }
        }
      },
      
      {
        $project: {
          _id: 0,
          courseID: 1,
          courseName: "$course.courseName",
          instructorID: 1,
          programName: "$program.programName",
          studentID: '$student._id',
          students: "$enrolled",
          section: 1,
          yearLevel: 1,
          enrolled: "$enrolledCount" ,
          year_sectionID: 1,
          room: 1,
          dayOfWeek: 1,
          startTime: 1,
          endTime: 1, 
        }
      }
    ]);

    return NextResponse.json(data); 
  } catch (error) {
    console.error("Aggregation Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
};
