import { NextResponse } from 'next/server';
import connection from "@/app/lib/config/connection";
import Instructor from '@/app/models/instructor.model';

export async function POST(Req) {
  const {firstName, lastName, middleName, emailAddress,contactNumber} = await Req.json()
     
    if(!firstName) return NextResponse.json({message: "s"}, {status: 404})
    try {
      await connection();
          await Instructor.insertOne({
            firstName,
            lastName,
            middleName,
            emailAddress,
            contactNumber
          })
          return NextResponse.json({message: "inserted"}, {status: 201})
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON input', error: error.message },
        { status: 400 }
      );
    }   
}
