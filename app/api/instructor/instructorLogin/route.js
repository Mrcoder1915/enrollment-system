import verifyPassword from "@/app/lib/auth/verifyPassword";
import connection from "@/app/lib/config/connection";
import { NextResponse } from "next/server";
import generateAccessToken from "@/app/lib/auth/generateAccessToken";
import generateRefreshToken from "@/app/lib/auth/generateRefreshToken";
import InstructorAccount from "@/app/models/instructorAccount.model";

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

    const isPasswordValid = await verifyPassword(password, account.password);

    if (!isPasswordValid) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
    }

    const accessToken = generateAccessToken({ registrarID: account.registrarID, role });
    const refreshToken = generateRefreshToken({ registrarID: account.registrarID, role });

    const res = NextResponse.json(
      { message: "Login successful", userName: account.userName, accessToken, refreshToken },
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
