import Student from "@/app/models/student.model"
import Admission from "@/app/models/Admission.model"
import { NextResponse } from "next/server"
import connection from "../../lib/config/connection"
export async function POST(Req) {
    const studentdata = await Req.json()
    console.log("student: ", studentdata);
    
    await connection()
    try {
        if(!studentdata) return NextResponse.json({message: "please fill all field"})

        const student = new Student(studentdata)

        await student.save()

        const addmission = new Admission({studentID: student._id})
        await addmission.save()

        return NextResponse.json({message: "student register", StudentName: `${student.firstName} ${student.lastName}`})
    } catch (error) {
        return NextResponse.json({message: "student cant register", error: error.message} , {status: 400})
    }

}