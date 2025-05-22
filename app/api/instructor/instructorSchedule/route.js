import { NextResponse } from "next/server";
import connection from "@/app/lib/config/connection";
import Schedule from "@/app/models/schedule.model";
import Course from "@/app/models/course.model";
import YearAndSection from "@/app/models/yearandsection.model";
import Instructor from "@/app/models/instructor.model";
import jwt from "jsonwebtoken";
import mongoose from "mongoose";

export async function GET(req) {
  await connection();
    const token = req.cookies.get('accessToken')?.value;
  
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log(decoded);
    const id = decoded.instructorID
 const schedules = await Schedule.aggregate([
        {
            $match: {instructorID: new mongoose.Types.ObjectId(id)}
        },
        {
            $lookup:{
                from: "courses",
                localField: "courseID",
                foreignField: "_id",
                as: "course"
            }
        },
        {$unwind: "$course"},
        {
            $lookup:{
                from: "yearandsections",
                localField: "year_sectionID",
                foreignField: "_id",
                as: "yearandsection"
            }
        },
        {$unwind: "$yearandsection"},
        {
            $lookup:{
                from: "programs",
                localField: "courseID",
                foreignField: "courseIDs",
                as: "program"
            }
        },
        {$unwind: "$program"},
        {
            $project: {
                programCode: "$program.programCode",
                course: "$course.courseName",
                day: "$dayOfWeek",
                startTime:  "$startTime",
                endTime: "$endTime",
                section: "$yearandsection.value",
                roomNumber: "$room",
                
            }
        }

 ])
    return NextResponse.json((schedules), { status: 200 });
  } catch (error) {
    console.error("Error fetching schedule:", error.message);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
