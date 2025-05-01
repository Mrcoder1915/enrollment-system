import { NextResponse } from "next/server"
import nodemailer from "nodemailer"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
dotenv.config()
const generateotp =() =>{
    const random = Math.floor(100000 + Math.random() * 900000)

    return random
}
const otp =generateotp()
export async function POST(Req){
    const {Email} = await Req.json()
    try {
        if (!Email) return NextResponse.json({message: "Email not found"},{status: 404})
     
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
        
                    user: 'adungvillar@gmail.com',
                    pass:'thae pssp iaxn ctpe',
                },
        
            });
        
            const mailOptions = {
        
                from: 'adungvillar@gmail.com',
                
                to: Email,
                
                subject: "otp",
                
                text: `hello this is your otp ${otp}`,
                
                };
                
        
                
                transporter.sendMail(mailOptions, (error, info) => {
                
                if (error) {
                
                console.log('Error:', error);
                
                } else {
                
                console.log('Email sent:', info.response);
                
                }
                
                });
                
                const otptoken = jwt.sign({otp:otp},process.env.OTP_SECRET,{expiresIn:"2m"})
                console.log(otptoken)
                const res = NextResponse.json({message: "Email sent successfully"},{status:200}) 
                res.cookies.set("otp",otptoken,{httpOnly:true,path:"/"})
                return res
                
    } catch (error) {
      return NextResponse.json({messsage: "server",error:error.message})  
    }
   
}
