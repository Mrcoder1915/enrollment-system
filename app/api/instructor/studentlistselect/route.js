import { NextResponse } from "next/server";
import connection from "@/app/lib/config/connection";
import Schedule from "@/app/models/schedule.model";
import jwt from "jsonwebtoken";
import { ObjectId } from "mongodb";

export const GET = async (req) => {
  await connection();
  

  const token = req.cookies.get('accessToken')?.value;

  if (!token) {
    return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    const id = decoded.instructorID
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
              { $in: ["$$cid", "$courseIDs"] }
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
      {
        $project: {
          _id: 0,
          studentID: "$student._id",
          firstName: "$student.firstName",
          lastName: "$student.lastName",
        }
      }
    ],
    as: "enrolled"
  }
},
     
      {
        $addFields: {
          section: "$yearSection.value",          // Full section like "BSIT-2B"
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
          student: "$enrolled",
          course: "$course.courseName",
          ins: "$instructorID",
          program: "$program.programName",
          section: 1,
          yearLevel: 1,
          year_sectionID: 1,
        }
      }
    ]);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Aggregation Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
};