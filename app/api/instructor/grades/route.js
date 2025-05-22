import connection from "@/app/lib/config/connection";
import Schedule from "@/app/models/schedule.model";
import { NextResponse } from "next/server";
import Grade from '@/app/models/GradeEntry.model'; 
import jwt from "jsonwebtoken"
import { ObjectId } from "mongodb";

export async function GET(req) {
  await connection();
  const token = req.cookies.get('accessToken')?.value;
  
    if (!token) {
      return NextResponse.json({ message: 'Unauthorized' }, { status: 401 });
    }
  
    try {
      const decoded = jwt.verify(token, process.env.SECRET_KEY);
      console.log(decoded);
      

    const result = await Schedule.aggregate([
      { $match: { instructorID: new ObjectId(decoded.instructorID) } },

      // Lookup yearandsection
      {
        $lookup: {
          from: 'yearandsections',
          localField: 'year_sectionID',
          foreignField: '_id',
          as: 'yearandsection',
        },
      },
      { $unwind: { path: '$yearandsection', preserveNullAndEmptyArrays: true } },

      // Lookup course
      {
        $lookup: {
          from: 'courses',
          localField: 'courseID',
          foreignField: '_id',
          as: 'course',
        },
      },
      { $unwind: { path: '$course', preserveNullAndEmptyArrays: true } },

      // Lookup enrollments
      {
        $lookup: {
          from: 'enrollments',
          let: { courseId: '$courseID', sectionId: '$year_sectionID' },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $in: ['$$courseId', '$courseIDs'] },
                    { $eq: ['$year_sectionID', '$$sectionId'] },
                  ],
                },
              },
            },
            {
              $project: {
                _id: 1,
                studentID: 1,
                programID: 1,
              },
            },
          ],
          as: 'enrollments',
        },
      },
      { $unwind: '$enrollments' },

      // Lookup student
      {
        $lookup: {
          from: 'students',
          localField: 'enrollments.studentID',
          foreignField: '_id',
          as: 'student',
        },
      },
      { $unwind: '$student' },

      // Lookup program
      {
        $lookup: {
          from: 'programs',
          localField: 'enrollments.programID',
          foreignField: '_id',
          as: 'program',
        },
      },
      { $unwind: { path: '$program', preserveNullAndEmptyArrays: true } },

      // Lookup grade
      {
        $lookup: {
          from: 'grades',
          let: {
            sId: '$student._id',
            cId: '$courseID',
          },
          pipeline: [
            {
              $match: {
                $expr: {
                  $and: [
                    { $eq: ['$studentID', '$$sId'] },
                    { $eq: ['$courseID', '$$cId'] },
                  ],
                },
              },
            },
          ],
          as: 'grade',
        },
      },
      { $unwind: { path: '$grade', preserveNullAndEmptyArrays: true } },

      // Final projection
      {
        $project: {
          _id: 0,
          courseID: 1,
          instructorID: "$instructorID",
          courseName: '$course.courseName',
          sectionName: '$value',
          sectionName: '$yearandsection.value',
          studentID: '$student._id',
          studentFirstName: '$student.firstName',
          studentLastName: '$student.lastName',
          programName: '$program.programName',
          midtermGrade: "$grade.midtermGrade",
          finalGrade: "$grade.finalGrade",
          calculatedGrade: "$grade.grade_computation",
          remarks: "$grade.remarks"
        },
      },
    ]);

    return NextResponse.json((result), { status: 200 });

  } catch (error) {
    return NextResponse.json({
      message: "nothing happen error",
      error: error.message,
    }, { status: 500 });
  }
}



export async function POST(req) {
  try {
    await connection();
    const grades = await req.json();

    if (!Array.isArray(grades)) {
      return NextResponse.json({ error: "Expected an array of grades." }, { status: 400 });
    }

    const results = [];

    for (const g of grades) {
      const { studentID, instructorID, courseID, midtermGrade, finalGrade } = g;

      if (!studentID || !instructorID || !courseID || midtermGrade == null || finalGrade == null) {
        console.log("All fields are required for each grade.");
        
        return NextResponse.json({ error: "All fields are required for each grade." }, { status: 400 });
      } 

      const avg = (parseFloat(midtermGrade) + parseFloat(finalGrade)) / 2;
      let remarks = "inc";

        const getEquivalentGrade = (average) => {
          const avg = parseFloat(average);
          if (avg >= 1.00 && avg <= 1.12) return 1.00;
          if (avg >= 1.13 && avg <= 1.37) return 1.25;
          if (avg >= 1.38 && avg <= 1.62) return 1.50;
          if (avg >= 1.63 && avg <= 1.87) return 1.75;
          if (avg >= 1.88 && avg <= 2.12) return 2.00;
          if (avg >= 2.13 && avg <= 2.37) return 2.25;
          if (avg >= 2.38 && avg <= 2.62) return 2.50;
          if (avg >= 2.63 && avg <= 2.87) return 2.75;
          if (avg >= 2.88 && avg <= 3.15) return 3.00;
          if (avg > 3.15 && avg <= 5.00) return 5.00;
          return null;
        };

      if (getEquivalentGrade(avg) <= 3.00 && getEquivalentGrade(avg) >= 1.00) remarks = "passed";
      else if (getEquivalentGrade(avg) > 3.00) remarks = "failed";

      const grade = await Grade.findOneAndUpdate(
        { studentID, instructorID, courseID },
        { midtermGrade, finalGrade, grade_computation: getEquivalentGrade(avg), remarks },
        { upsert: true, new: true }
      );

      results.push(grade);
    }

    return NextResponse.json({ message: "Grades saved successfully", grades: results }, { status: 201 });

  } catch (error) {
    console.error("Grade save failed:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
