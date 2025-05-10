import nodemailer from 'nodemailer';
import connection from '../../../lib/config/connection';
import FacultyAccount from '../../../models/instructorAccount.model';
import Faculty from '../../../models/instructor.model';

export async function POST(req) {
  try {
    const { email, status, password } = await req.json();

    if (!email || !status || !password) {
      return new Response(JSON.stringify({ error: "Missing required fields: email, status, or password" }), { status: 400 });
    }

    await connection();

    let message = "";

    if (status === "approved") {
      message = `
        Congratulations! 🎉

        Your faculty account has been approved.
        Here is your temporary password: ${password}

        Please login and change your password immediately.           
      `;

      const instructor = await Faculty.findOne({ emailAddress: email });

      if (!instructor) {
        return new Response(JSON.stringify({ error: "Instructor not found" }), { status: 400 });
      }

      const { instructorID, emailAddress, _id } = instructor;

      if (typeof instructorID !== 'number' || isNaN(instructorID)) {
        return new Response(JSON.stringify({ error: "Instructor does not have a valid instructorID" }), { status: 400 });
      }

      const existingAccount = await FacultyAccount.findOne({ userName: emailAddress });

      if (existingAccount) {
        return new Response(JSON.stringify({ error: "Account already exists for this instructor" }), { status: 400 });
      }

      // Create account
      await FacultyAccount.create({
        userName: emailAddress,
        password,
        status: "approved",
        instructorID,
      });

      // Remove from Faculty collection
      await Faculty.findByIdAndDelete(_id);
    } else {
      message = `
        We regret to inform you that your application has been declined.
      `;
    }

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
    return new Response(JSON.stringify({ error: "Failed to process request", details: error.message }), { status: 500 });
  }
}
