import { NextResponse } from 'next/server';
import connection from '@/lib/connection';
import Student from '@/models/Student';

export async function GET(req) {
  try {
    await connection();

    const email = req.nextUrl.searchParams.get('email');
    if (!email) {
      return NextResponse.json({ error: 'Email query param is required' }, { status: 400 });
    }

    const student = await Student.findOne({ emailAddress: email }).lean();
    if (!student) {
      return NextResponse.json({ error: 'Student not found' }, { status: 404 });
    }

    const fullName = `${student.firstName} ${student.lastName}`;

    return NextResponse.json({
      name: fullName,
      image: './public/images/Student.png',
    });

  } catch (error) {
    console.error('Error fetching student info:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}