import Admission from "@/app/models/Admission.model";
import { NextResponse } from "next/server";
import connection from "@/app/lib/config/connection";
import Student from "@/app/models/student.model";
import StudentAccount from "@/app/models/studentaccount.model";
import nodemailer from 'nodemailer'

export async function POST(Req) {
    const {remarks,studentID} = await Req.json()
    await connection()
    console.log (remarks,studentID)
    try {
        const admission =await Admission.updateOne({studentID},{$set:{remarks}})
       
        if (!admission) return NextResponse.json({message:"No Student in Admission"},{status:404})
    
         const student = await Student.find({_id:  studentID });

      if (!student) {
        console.log("error");
        
        return new Response(JSON.stringify({ error: "Student not found" }), { status: 400 });
      }
      console.log("email: ",student[0].firstName)
      // Create account
      await StudentAccount.create({
        studentID,
        userName: student[0].firstName,
        password:`2025-${student[0].firstName}`,
      });


    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'johnpauldin77@gmail.com',
        pass: 'tyvhbfnbubnijekg',
      },
    });

    const mailOptions = {
      from: 'johnpauldin77@gmail.com',
      to: student[0].emailAddress,
      subject: "user Account",
      text: ` Congratulations! 🎉

        Your student account has been approved.
        here is your username ${student[0].firstName}
        Here is your temporary password: 2025-${student[0].firstName}

        Please login and change your password immediately`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log('Error:', error);
        } else {
          console.log('Email sent:', info.response);
        }
      });
      console.log(mailOptions);
      

    return NextResponse.json({message:"Succesful"},{status:201})
    } catch (error) {
        return NextResponse.json({message:"Internal Error", error: error.message},{status:400})
    }
}
export async function GET() {
    await connection()
try {
    const admission = await Admission.find({remarks: "pending"}).populate("studentID")
if(admission.length == 0)  return NextResponse.json({message:"No Student"},{status:404})

    return NextResponse.json((admission),{status:200})
} catch (error) {
    
}

}