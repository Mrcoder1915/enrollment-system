import connection from "@/app/lib/config/connection";
import enrollment from "@/app/models/enrollment.model";

export async function POST(Req) {
  try {
    const body = await Req.json();

    if (!body) {
      return new Response(JSON.stringify({ message: "Can't find student ID" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connection();
    const del = await enrollment.deleteMany({ body });

    return new Response(JSON.stringify({ message: "Delete", deleted: del.deletedCount }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });

  } catch (error) {
    return new Response(JSON.stringify({ message: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
