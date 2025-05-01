import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { NextResponse } from "next/server"
dotenv.config()

export async function POST(Req) {
    const {userotp} = await Req.json()
     const token = Req.cookies.get("otp")?.value
     if(!token){
         return NextResponse.json({messsage: "no token"})
     }
     try{
       const decoded = jwt.verify(token,process.env.OTP_SECRET)
     if(decoded.otp !== userotp){
         return NextResponse.json({messsage: "invalid otp"}) 
     }
 
     
     return NextResponse.json({messsage: "successful"})
     }catch(error){
         return NextResponse.json({messsage: "server error", error: error.message})
     }
 
 }