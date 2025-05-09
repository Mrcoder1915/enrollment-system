import { NextResponse } from 'next/server';
import connection from "@/app/lib/config/connection";
import Instructor from '@/app/models/instructor.model';

export async function POST(Req) {
  const {firstName, lastName, middleName, emailAddress,contact} = await Req.json()
     // Connect to MongoDB
 // Log the raw request body
    if(!firstName) return NextResponse.json({message: "s"}, {status: 404})
    try {
      await connection();
          await Instructor.insertOne({
            firstName,
            lastName,
            middleName,
            emailAddress,
            contact
          })
          return NextResponse.json({message: "inserted"}, {status: 201})
    } catch (error) {
      return NextResponse.json(
        { success: false, message: 'Invalid JSON input' },
        { status: 400 }
      );
    }   // Check if email already exist
}
