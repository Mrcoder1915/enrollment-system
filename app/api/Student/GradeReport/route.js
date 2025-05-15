import connection from '@/app/lib/config/connection';
import Grade from '@/app/models/Grade.model';

// GET all grade reports
export async function GET() {
  try {
    await connection();
    const courses = await Grade.find();
    
    return new Response(JSON.stringify(courses), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('GET error:', error);
    return new Response(JSON.stringify({ message: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
