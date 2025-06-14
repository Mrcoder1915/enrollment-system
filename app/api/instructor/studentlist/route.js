import { NextResponse } from "next/server";
import connection from "@/app/lib/config/connection";
import Schedule from "@/app/models/schedule.model";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

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
        $match: { instructorID: new mongoose.Types.ObjectId(id) }
      },
      {
        $lookup: {
          from: "courses",
          localField: "courseID",
          foreignField: "_id",
          as: "course"
        }
      },
      { $unwind: { path: "$course",       preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "programs",
          localField: "courseID",
          foreignField: "courseIDs",
          as: "program"
        }
      },
      { $unwind: { path: "$program",     preserveNullAndEmptyArrays: true } },
      {
        $lookup: {
          from: "yearandsections",
          localField: "year_sectionID",
          foreignField: "_id",
          as: "yearSection"
        }
      },
      { $unwind: { path: "$yearSection", preserveNullAndEmptyArrays: true } },
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
     
    ],
    as: "enrolled"
  }
},
     
      {
        $addFields: {
          enrolledCount: { $size: "$enrolled" },
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
          sem: "$course.semester",
          ins: "$instructorID",
          program: "$program.programName",
          enrolledCount: "$enrolledCount",
          section: 1,
          yearLevel: 1,
          year_sectionID: 1,
          room: 1,
          dayOfWeek: 1,
          startTime: 1,
          endTime: 1
        }
      }
    ]);

    return NextResponse.json(data);
  } catch (error) {
    console.error("Aggregation Error:", error);
    return NextResponse.json({ error: "Server Error" }, { status: 500 });
  }
};