import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { NextResponse } from "next/server"
dotenv.config()

export async function POST(Req) {
    const {userotp} = await Req.json()
    const otp = Number(userotp)
    
     const token = Req.cookies.get("otp")?.value
     if(!token){
         return NextResponse.json({messsage: "no token"}, {status: 404})
     }
     try{
       const decoded = jwt.verify(token,process.env.OTP_SECRET)
     if(decoded.otp !== otp){
         return NextResponse.json({messsage: "invalid otp"}, {status: 400}) 
     }
 
     
     return NextResponse.json({messsage: "successful"},{status: 200})
     }catch(error){
         return NextResponse.json({messsage: "server error", error: error.message}, {status: 500})
     }
 
 }