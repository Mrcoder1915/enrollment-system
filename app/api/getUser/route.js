import { NextResponse } from "next/server";
import jwt from "jsonwebtoken"

export async function GET(req) {
  const token = req.cookies?.get("accessToken")?.value;
console.log("toks:" ,token);

  if (!token) {
    return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 });
  }

  try {
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    console.log("decoded", decoded)
    return NextResponse.json({ user: decoded });
  } catch (err) {
    if (err.name === "TokenExpiredError") {
        return NextResponse.json({ message: "UNAUTHORIZED" }, { status: 401 });
      }
    return NextResponse.json({ message: "Invalid token", error: err.message }, { status: 401 });
  }
}