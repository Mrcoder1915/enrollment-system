import nodemailer from 'nodemailer';
import connection from '../../../lib/config/connection';
import FacultyAccount from '../../../models/instructorAccount.model';
import Faculty from '../../../models/instructor.model';
import mongoose from 'mongoose';

export async function POST(req) {
  try {
    const { email, status, password } = await req.json();

    if (!email || !status || (status === "approved" && !password)) {
      return new Response(
        JSON.stringify({ error: "Missing required fields" }),
        { status: 400 }
      );
    }

    await connection();

    const instructor = await Faculty.findOne({ emailAddress: email });

    if (!instructor) {
      return new Response(JSON.stringify({ error: "Instructor not found" }), { status: 400 });
    }

    const { _id, emailAddress } = instructor;

    let message = "";

    if (status === "approved") {
      // Generate a new ObjectId for the instructorID
      const newInstructorID = new mongoose.Types.ObjectId();

      // Check if account already exists by userName (email)
      const existingAccountByEmail = await FacultyAccount.findOne({ userName: emailAddress });
      if (existingAccountByEmail) {
        return new Response(JSON.stringify({ error: "Account already exists for this instructor email" }), { status: 402 });
      }

      await FacultyAccount.create({
        userName: emailAddress,
        password,
        status: "approved",
        instructorID: newInstructorID,  // New unique ObjectId here
      });

      // Update instructor status to approved
      await Faculty.findByIdAndUpdate(_id, { status: "approved" });

      message = `
        Congratulations! 🎉

        Your faculty account has been approved.
        Here is your temporary password: ${password}

        Please login and change your password immediately.
      `;
    } else {
      // For declined or other statuses
      await Faculty.findByIdAndUpdate(_id, { status: "declined" });

      message = `We regret to inform you that your application has been declined.`;
    }

    // Send Email
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'edwardnelson0099@gmail.com',
        pass: 'elswhdyrbmiqjkkx',
      },
    });

    await transporter.sendMail({
      from: '"Faculty Admin" <edwardnelson0099@gmail.com>',
      to: email,
      subject: status === "approved" ? "Account Approved" : "Account Declined",
      text: message,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });

  } catch (error) {
    console.error("Error caught:", error);
    return new Response(JSON.stringify({ error: "Failed to process request", details: error.message }), { status: 500 });
  }
}
