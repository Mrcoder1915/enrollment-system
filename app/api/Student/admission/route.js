import connection from "@/app/lib/config/connection";
import Admission from "@/app/models/Admission.model";
import student from "@/app/models/student.model";
import { NextResponse } from "next/server";

export async function POST(Req) {
  try {
    await connection(); // Connect to DB
    await Admission(newstudent);
    const body = await Req.json();// Parse JSON body   

    const newstudent = await student.create(body); // Create new doc in DB
    Admission.insert({studentID: newstudent._id});

    return  NextResponse.json(newstudent, { status: 200 });
  } catch (error) {
    console.error("Error saving student admission:", error);
    return NextResponse.json (
      { success: false, message: error.message },
      { status: 400 }
    );  
  }
}