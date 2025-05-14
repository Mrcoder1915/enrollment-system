import connection from "@/app/lib/config/connection";
import enrollment from "@/app/models/enrollment.model";

export async function POST(Req) {
  try {
    const body = await Req.json();

    if (!body) {
      return new Response(JSON.stringify({ message: "no status value" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    await connection();
    await enrollment.updateMany({ studentID: studentID }, { $set: { status: 1 } });

    return new Response(JSON.stringify({ message: "approve" }), {
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
