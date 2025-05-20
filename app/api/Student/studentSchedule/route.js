import connection from '@/app/lib/config/connection';
import Schedule from '@/app/models/StudentSchedule.model';

export async function GET() {
  try {
    await connection();
    const schedule = await Schedule.find({});
    return new Response(JSON.stringify(schedule), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error fetching schedule list:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch schedule list' }), {
      status: 500,
    });
  }
}
