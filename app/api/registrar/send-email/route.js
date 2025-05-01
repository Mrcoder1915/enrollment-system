import nodemailer from 'nodemailer';

export async function POST(req) {
  try {
    const { email, status, password } = await req.json();

    let message = "";

    if (status === "approved") {
      message = `
        Congratulations! 🎉

        Your faculty account has been approved.
        Here is your temporary password: ${password}

        Please login and change your password immediately.
      `;
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
      from: `"Faculty Admin" <edwardnelson0099@gmail.com>`,
      to: email,
      subject: status === "approved" ? "Account Approved" : "Account Declined",
      text: message,
    });

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(JSON.stringify({ error: "Failed to send email" }), { status: 500 });
  }
}
