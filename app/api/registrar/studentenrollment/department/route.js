import connection from "@/app/lib/config/connection";
import Program from "@/app/models/program.model";
import { NextResponse } from "next/server";

export async function GET() {
    await connection()

    try {
        const program = await Program.aggregate([
            {
                $lookup:{
                    from: "departments",
                    localField: "departmentID",
                    foreignField: "_id",
                    as: "department"
                }
            },
            {$unwind: "$department"},
            {
                $project:{
                    programCode: "$programCode",
                    departmentCode: "$department.departmentCode"
                }
            }
        ])
        
        const departmentProgram= {}
        program.forEach(({departmentCode, programCode}) => {
            if(!departmentProgram[departmentCode]) {
                departmentProgram[departmentCode] =[]
            }
            departmentProgram[departmentCode].push(programCode)   
         })
        return NextResponse.json((departmentProgram), {status: 200})
    } catch (error) {
         return NextResponse.json( {message: error.message},{status: 500})
    }
}