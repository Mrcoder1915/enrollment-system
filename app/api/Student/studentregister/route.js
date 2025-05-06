import connection from "@/app/lib/config/connection";
import verifyPassword from "@/app/lib/auth/verifyPassword";
import connection from "@/app/lib/config/connection";
import Studentaccount from "@/app/models/studentAccount.model";
import { NextResponse } from "next/server";
import generateAccessToken from "@/app/lib/auth/generateAccessToken";
import generateRefreshToken from "@/app/lib/auth/generateRefreshToken";


export async function POST(Req) {
    await connection()
    try {
        const {userName , password} = await Req.json();
        const role = "registrar"
        if(!userName || !password ) return NextResponse.json({message: "please fill all fields"}, {status: 401})
        
        const Student = await  Studentaccount.findOne({userName})
        if(!Student) return NextResponse.json({message: "Student Not Exist"}, {status: 404})

        const passwordVerify = verifyPassword(password , Student.password)

        if(!passwordVerify) return NextResponse.json({message: "invalid credentials"}, {status: 401})

        const accessToken = generateAccessToken({studentID:Student.studentID,  role:role})
        const refreshToken = generateRefreshToken({studentID:Student.studentID,  role:role})

        const res = NextResponse.json({message: "login", accessToken , refreshToken}, {status: 200})

        res.cookies.set("accessToken", accessToken, {httpOnly: true, path: "/"} )
        res.cookies.set("refreshToken", refreshToken, {httpOnly: true, path: "/"} )
        
        return res;
    } catch (error) {
        return NextResponse.json({message: "cant Login", error: error.message}, {status: 400})
    }  
}