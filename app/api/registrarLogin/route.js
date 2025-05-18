import connection from "@/app/lib/config/connection";
import verifyPassword from "@/app/lib/auth/verifyPassword";
import Registraraccount from "@/app/models/Registraraccount.model";
import { NextResponse } from "next/server";
// import HashPassword from "@/app/lib/auth/hashpassword";
import generateAccessToken from "@/app/lib/auth/generateAccessToken";
import generateRefreshToken from "@/app/lib/auth/generateRefreshToken";
import RegistrarData from "@/app/models/registrar.model";


export async function POST(Req) {
    await connection()
    try {
        const {userName , password} = await Req.json();
        const role = "registrar"
        if(!userName || !password ) return NextResponse.json({message: "please fill all fields"}, {status: 401})
        
        const Registrar = await  Registraraccount.findOne({userName})
        if(!Registrar) return NextResponse.json({message: "Student Not Exist"}, {status: 404})
        
        const passwordVerify = verifyPassword(password , Registrar.password)
        
        if(!passwordVerify) return NextResponse.json({message: "invalid credentials"}, {status: 401})
        
        const RegistrarName = await RegistrarData.findOne({_id: Registrar.registrarID}, {_id:0 ,firstName: 1 ,lastName: 1})
        console.log(RegistrarName.lastName);
        
        const fullName = `${RegistrarName.firstName} ${RegistrarName.lastName}` 

        const accessToken = generateAccessToken({registrarID:Registrar.registrarID,  role:role, fullName})
        const refreshToken = generateRefreshToken({registrarID:Registrar.registrarID,  role:role})

        const res = NextResponse.json({message: "login"}, {status: 200})

        res.cookies.set("accessToken", accessToken, {httpOnly: true, path: "/"} )
        res.cookies.set("refreshToken", refreshToken, {httpOnly: true, path: "/"} )
        
        return res;
    } catch (error) {
        return NextResponse.json({message: "cant Login", error: error.message}, {status: 400})
    }  
}

// export async function POST(Req) {
//     const {userName, password} = await Req.json()
//     const hashpass =await HashPassword(password)
// await connection()
//     await Registraraccount.insertOne({
//         userName: userName,
//         password: hashpass
//     })
//     return NextResponse.json({message: "sucess"})
// }