import connection from "@/app/lib/config/connection";
import Enrollment from "@/app/models/enrollment.model";
import mongoose from "mongoose";
import { NextResponse } from "next/server";

export async function POST(Req) {
    const {studentID,approve} = await Req.json()
    console.log(approve);
    
    await connection()
    try {
         const en = await Enrollment.updateOne({studentID: studentID}, {$set: {approve: approve}})
         console.log("deleted", en)
        
         return NextResponse.json({message: "approve"}, {status: 200})
    } catch (error) {
        return NextResponse.json({message: "Internal Server Error", error: error.message}, {status: 500})
    }
    
}