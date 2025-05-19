import connect from "@/app/lib/config/connection.js";
import Student from "@/app/models/student.model.js";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connect();

  const { searchParams } = new URL(req.url);
  const studentId = searchParams.get("id");

  if (!studentId) {
    return NextResponse.json({ success: false, message: "No student ID provided" }, { status: 400 });
  }

  try {
    const student = await Student.findById(studentId).populate("program");
    if (!student) {
      return NextResponse.json({ success: false, message: "Student not found" }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: student });
  } catch (error) {
    return NextResponse.json({ success: false, message: error.message }, { status: 500 });
  }
}
