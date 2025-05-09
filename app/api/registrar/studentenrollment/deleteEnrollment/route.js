import connection from "@/app/lib/config/connection";
import Enrollment from "@/app/models/enrollment.model";
import { NextResponse } from "next/server";

export async function POST(Req) {
    const {studentID} = await Req.json()

    await connection()
    try {
        if(!studentID) return NextResponse.json({message: "cant find student ID"}, {status: 404})

         const del = await Enrollment.deleteMany({studentID: studentID})
        
         return NextResponse.json((del),{message: "Delete"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
    
}