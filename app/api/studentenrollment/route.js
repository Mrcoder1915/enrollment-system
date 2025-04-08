import mongoose from "mongoose";
import Student from "../../models/student.model";
import connection from "../../lib/config/connection";
import Admission from "@/app/models/Admission.model";

export async function POST(Req){
    const student = await Req.json()
    await connection()
    try {
        const students = new Student(student) 
        await students.save()

        const newadmission = new Admission({
            studentID: students._id,
        })
        await newadmission.save()
        return new Response(JSON.stringify({message: "added to admission"}))
    } catch (error) {
        console.log("faild to fetch students")
        return new Response(JSON.stringify({error: "failed to fetch students"}), {status: 500})
    }

}