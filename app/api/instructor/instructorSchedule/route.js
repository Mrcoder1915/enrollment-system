import { NextResponse } from "next/server";
import connection from "@/app/lib/config/connection";
import Schedule from "@/app/models/schedule.model";
import Course from "@/app/models/course.model";
import YearAndSection from "@/app/models/yearandsection.model";
import Instructor from "@/app/models/instructor.model";
import Program from "@/app/models/program.model"; // ✅ Add this

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const instructorID = searchParams.get("instructorID");

  if (!instructorID) {
    return NextResponse.json({ message: "Missing instructorID" }, { status: 400 });
  }

  try {
    await connection();

    const schedules = await Schedule.find({ instructorID })
      .populate({
        path: "courseID",
        model: Course,
      })
      .populate({
        path: "year_sectionID",
        model: YearAndSection,

      })
      .populate({
        path: "instructorID",
        model: Instructor,
      });

    return NextResponse.json((schedules), { status: 200 });
  } catch (error) {
    console.error("Error fetching schedule:", error.message);
    return NextResponse.json({ message: "Server error" }, { status: 500 });
  }
}
