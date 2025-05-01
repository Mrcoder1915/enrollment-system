import connection from "@/app/lib/config/connection";
import Faculty from "@/app/models/faculty.model";

export async function GET() {
  try {
    console.log("Connecting to database...");
    await connection();

    const facultyList = await Faculty.find({}).lean();

    return new Response(JSON.stringify(facultyList), { status: 200 });
    
  } catch (error) {
    console.error("Error fetching faculty list:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch faculty list" }), { status: 500 });
  }
}
