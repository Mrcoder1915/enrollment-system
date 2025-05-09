import express from "express";
import connect from "@/app/lib/config/connection.js";
import Student from "@/app/models/student.model.js";
import { NextResponse } from "next/server.js";
 

export async function GET() {
    await connect()
    try {
        const students=await Student.find({_id:"67f4ad436c40f92e96733eea"});
        return NextResponse.json((students),{success: true});
           
        } catch (error) {
            console.log(error);
        }
}
