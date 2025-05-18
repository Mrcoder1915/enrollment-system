import verifyPassword from "@/app/lib/auth/verifyPassword";
import connection from "@/app/lib/config/connection";
import Studentaccount from "@/app/models/studentaccount.model";
import { NextResponse } from "next/server";
import generateAccessToken from "@/app/lib/auth/generateAccessToken";
import generateRefreshToken from "@/app/lib/auth/generateRefreshToken";
import Student from "@/app/models/student.model";

export async function POST(req) {
    await connection();
    try {
        const { userName, password } = await req.json();
        const role = "student";

        if (!userName || !password) {
            return NextResponse.json({ message: "All fields are required." }, { status: 400 });
        }

        const student = await Studentaccount.findOne({ userName });
        if (!student) {
            return NextResponse.json({ message: "Student does not exist." }, { status: 404 });
        }

        const passwordVerify = verifyPassword(password, student.password);
        if (!passwordVerify) {
            return NextResponse.json({ message: "Incorrect username or password." }, { status: 401 });
        }

        const studentName = await Student.findOne({_id: student.studentID}, {_id:0 ,firstName: 1 ,lastName: 1})
        const fullName = `${studentName.firstName} ${studentName.lastName}`
        
        const accessToken = generateAccessToken({ studentID: student.studentID, role, fullName });
        const refreshToken = generateRefreshToken({ studentID: student.studentID, role});
        console.log(studentName);
        
        const res = new NextResponse(
            JSON.stringify({ message: "Login successful!"}),
            { status: 200 }
        );

        res.cookies.set("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "strict",
        });

        res.cookies.set("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            path: "/",
            sameSite: "strict",
        });

        return res;
    } catch (error) {
        console.error("Login Error:", error.message);
        return NextResponse.json({ message: "Unable to login.", error: error.message }, { status: 500 });
    }
}

export async function GET(req) {
    const token = req.cookies.get("accessToken")?.value;

    if (!token) {
        return NextResponse.json({ message: "Unauthorized access." }, { status: 401 });
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);
        console.log("Decoded Token:", decoded);
        return NextResponse.json({ user: decoded });
    } catch (err) {
        if (err.name === "TokenExpiredError") {
            return NextResponse.json({ message: "Session expired. Please log in again." }, { status: 401 });
        }
        return NextResponse.json({ message: "Invalid token." }, { status: 401 });
    }
}
