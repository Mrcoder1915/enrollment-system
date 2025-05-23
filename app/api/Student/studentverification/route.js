import connection from "@/app/lib/config/connection";
import Student from "@/app/models/student.model";
import { NextResponse } from "next/server";

export async function POST(Req) {
    const {firstName,lastName,emailAddress} = await Req.json()

    if(!firstName, !lastName,!emailAddress) return NextResponse.json({message: "required to field all inputs"},{status: 404})
    await connection()
    try {
        if(!firstName || !lastName || !emailAddress) return new Response(JSON.stringify({message: "no input body"}))
            await Student.insertOne({firstName:firstName,lastName:lastName,emailAddress:emailAddress})
            return NextResponse.json({message:"student succesfully"})  
    } catch (error) {
        return NextResponse.json({message:"error",error:error.message},{status:500})
    }
}