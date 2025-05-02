import Admission from "@/app/models/Admission.model";
import { NextResponse } from "next/server";
import connection from "@/app/lib/config/connection";
import Student from "@/app/models/student.model";

export async function POST(Req) {
    const {remarks,studentID} = await Req.json()
    await connection()
    console.log (remarks,studentID)
    try {
        const admission =await Admission.updateOne({studentID},{$set:{remarks}})
       

        if (!admission) return NextResponse.json({message:"No Student in Admission"},{status:404})
    
            return NextResponse.json({message:"Succesful"},{status:201})
    } catch (error) {
        return NextResponse.json({message:"Internal Error"},{status:400})
    }
}
export async function GET() {
    await connection()
try {
    const student = await Student.find() 
if(student.length == 0)  return NextResponse.json({message:"No Student"},{status:404})

    return NextResponse.json((student),{status:200})
} catch (error) {
    
}

}