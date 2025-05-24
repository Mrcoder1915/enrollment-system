import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";
import dotenv from "dotenv"
import generateAccessToken from "@/app/lib/auth/generateAccessToken";
dotenv.config()

export async function GET(Req){
       
        const Token =  Req.cookies.get("refreshToken")?.value;
    
        if(!Token) {
            return NextResponse.json({message: "UNAUTHORIZE "}, {status: 401})  
        }

        try {
            const decoded = jwt.verify(Token, process.env.SECRET_KEY)
            console.log("decoded: iD:", decoded.studentID);
            
           let accessToken
               switch (decoded.role) {
                    case "student":
                        accessToken = generateAccessToken({ studentID: decoded.studentID, role: decoded.role});
                        break;
                    case "registrar":
                        accessToken = generateAccessToken({ registrarID: decoded.registrarID, role: decoded.role });
                        break;
                    case "instructor":
                        accessToken = generateAccessToken({ instructorID: decoded.instructorID, role: decoded.role });
                        break;
                    default:
                        return NextResponse.json({ message: "Invalid role" }, { status: 403 });
                }
            const res = NextResponse.json("accessToken refresh")
            
            res.cookies.set("accessToken", accessToken, {httpOnly: true, path: "/", secure: process.env.NODE_ENV === "production", sameSite: "Strict"})
            console.log("TOKEN REFRESH SUCCESS: ", accessToken);
            
            return res
        } catch (error) {
            return NextResponse.json({message:"ERROR", error: error.message}, {status: 401})
        }

}