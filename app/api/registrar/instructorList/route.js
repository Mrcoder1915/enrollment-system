import connection from "@/app/lib/config/connection";
import Instructor from "@/app/models/instructor.model";

export async function GET() {
  try {
    await connection();

    const instructors = await Instructor.find({}).lean();

    return new Response(JSON.stringify(instructors), { status: 200 });
    
  } catch (error) {
    console.error("Error fetching instructor list:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch instructor list" }), { status: 500 });
  }
}
