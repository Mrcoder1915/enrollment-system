import connection from "@/app/lib/config/connection";
import Enrollment from "@/app/models/enrollment.model";
import { NextResponse } from "next/server";

export async function POST(Req) {
    const {studentID,status} = await Req.json()

    await connection()
    try {
        if(!status) return NextResponse.json({message: "no status value"}, {status: 404})

         await Enrollment.updateMany({studentID: studentID}, {$set: {status: 1}})
        
         return NextResponse.json({message: "approve"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Internal Server Error"}, {status: 500})
    }
    
}