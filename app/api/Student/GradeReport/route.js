import connection from '@/app/lib/config/connection';
import Grade from '@/app/models/Grade.model';
import Instructor from '@/app/models/instructor.model';
import Course from '@/app/models/course.model';


export async function GET() {
  try {
    await connection();
    await Instructor();
    await Course();
 
    const grades = await Grade.find({})
      .populate('courseID')
      .populate('instructorID');

    const formatted = grades.map((grade) => ({
      _id: grade._id,
      courseCode: grade.courseID?.courseCode || 'N/A',
      courseName: grade.courseID?.courseName || 'N/A',
      instructor: `${grade.instructorID?.firstName || ''} ${grade.instructorID?.lastName || ''}`.trim() || 'N/A',
      finalGrade: grade.finalGrade,
      remarks: grade.remarks,
    }));

    return new Response(JSON.stringify(formatted), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error fetching grades:', error);
    return new Response(JSON.stringify({
      message: 'Failed to fetch grades',
      error: error.message,
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
