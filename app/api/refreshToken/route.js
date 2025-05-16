import jwt from "jsonwebtoken"
import { NextResponse } from "next/server";
import generateAccessToken from "@/app/lib/auth/generateAccessToken";

export async function GET(Req){
    const Token =  cookies.get("refreshToken")?.value;
    
    if(!Token) {
        return NextResponse.json({message: "UNAUTHORIZE "}, {status: 401})  
    }

        try {
            const decoded = jwt.verify(Token, process.env.SECRET_KEY)

            const accessToken =  generateAccessToken({studentID: decoded.id,  role:decoded.role})
        
            const res = NextResponse.json("accessToken refresh")
            
            res.cookies.set("accessToken", accessToken, {httpOnly: true, path: "/"})
                
            return res
        } catch (error) {
            return NextResponse.json({message:"ERROR", error: error.message}, {status: 401})
        }

}