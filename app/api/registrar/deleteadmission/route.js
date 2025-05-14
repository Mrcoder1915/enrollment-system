import connection from "@/app/lib/config/connection";
import Admission from "@/app/models/Admission.model";
import Student from "@/app/models/student.model";
import { NextResponse } from "next/server";

export async function POST(Req) {
    const {studentID} = await Req.json()

    await connection()
    try {
        if(!studentID) return NextResponse.json({message: "cant find student ID"}, {status: 404})

          await Student.deleteOne({_id: studentID})
          await Admission.deleteOne({studentID: studentID})
        
         return NextResponse.json({message: "Delete"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
    
}