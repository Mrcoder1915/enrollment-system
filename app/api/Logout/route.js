import { NextResponse } from "next/server";

export async function GET() {
  try {
      const response = NextResponse.json({ message: "Logged out" }, { status: 200 });

    response.cookies.set("accessToken", "", {
      httpOnly: true,
      path: "/",
     secure: process.env.NODE_ENV === "production", sameSite: "Strict"
    });

    response.cookies.set("refreshToken", "", {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production", sameSite: "Strict"
    });

    return response;
  } catch (error) {
    return NextResponse.json({message: "cant Logout due to internal error"}, {status: 500})
  }
}
