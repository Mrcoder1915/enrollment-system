import verifyPassword from "@/app/lib/auth/verifyPassword";
import connection from "@/app/lib/config/connection";
import { NextResponse } from "next/server";
import generateAccessToken from "@/app/lib/auth/generateAccessToken";
import generateRefreshToken from "@/app/lib/auth/generateRefreshToken";
import InstructorAccount from "@/app/models/instructorAccount.model";
import Instructor from "@/app/models/instructor.model"

export async function POST(req) {
  await connection();

  try {
    const { userName, password } = await req.json();
    const role = "instructor";
    
    if (!userName || !password) {
      return NextResponse.json({ error: "Please fill all fields" }, { status: 400 });
    }

    const account = await InstructorAccount.findOne({ userName });

    if (!account) {
      return NextResponse.json({ error: "Instructor not found" }, { status: 404 });
    }

    const isPasswordValid = verifyPassword(password, account.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const InstructorName = await Instructor.findOne({_id: account.instructorID}, {_id:0 ,firstName: 1 ,lastName: 1})
    const fullName = `${InstructorName.firstName} ${InstructorName.lastName}`
     
    const accessToken = generateAccessToken({ instructorID: account.instructorID, role , fullName: fullName});
    const refreshToken = generateRefreshToken({ instructorID: account.instructorID, role });

    const res = NextResponse.json(
      { message: "Login successful"},
      { status: 200 }
    );

    res.cookies.set("accessToken", accessToken, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    res.cookies.set("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/",
      sameSite: "strict",
      secure: process.env.NODE_ENV === "production",
    });

    return res;
  } catch (error) {
    return NextResponse.json({ error: "Login failed", detail: error.message }, { status: 500 });
  }
}
