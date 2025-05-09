import express from "express";
import connect from "@/app/lib/config/connection.js";
import Student from "../../../models/student.model.js";
import { NextResponse } from "next/server.js";
 
const app=express();
app.use(express.json());

export async function GET() {
    await connect()
    try {
        const students=await Student.find({_id:"67f4ad436c40f92e96733eea"});
        return NextResponse.json((students),{success: true});
           
        } catch (error) {
            console.log(error);
        }
}
