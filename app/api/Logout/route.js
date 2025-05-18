import { NextResponse } from "next/server";

export async function GET() {
  try {
      const response = NextResponse.json({ message: "Logged out" }, { status: 200 });

    response.cookies.set("accessToken", "", {
      httpOnly: true,
      path: "/",
    });

    response.cookies.set("refreshToken", "", {
      httpOnly: true,
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json({message: "cant Logout due to internal error"}, {status: 500})
  }
}
