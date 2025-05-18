import connection from "@/app/lib/config/connection";
import Instructor from "@/app/models/instructor.model";
import { cookies } from "next/headers";
import { ObjectId } from "mongodb";

// GET handler: Fetch instructor profile
export async function GET() {
  try {
    const cookieStore = await cookies();
    let instructorID = cookieStore.get("instructorID")?.value;

    const defaultInstructorID = "6824c0500d4944b8fbb7c9e8";

    const validID = ObjectId.isValid(instructorID)
      ? instructorID
      : defaultInstructorID;

    await connection();

    const profile = await Instructor.find({ _id: new ObjectId(validID) }).lean();

    if (!profile || profile.length === 0) {
      return new Response(JSON.stringify({ error: "Instructor not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Ensure middleName and program exist
    if (!profile[0].middleName) profile[0].middleName = "";
    if (!profile[0].program) profile[0].program = "";

    return new Response(JSON.stringify(profile), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch (err) {
    console.error("Fetch error:", err);
    return new Response(JSON.stringify({ error: "Could not fetch profile" }), {
      status: 500,
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  }
}

// PUT handler: Update instructor profile
export async function PUT(req) {
  try {
    await connection();
    const body = await req.json();

    const { _id, ...updateData } = body;

    if (!_id || !ObjectId.isValid(_id)) {
      return new Response(JSON.stringify({ error: "Invalid ID" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    // Force middleName and program to exist as strings
    if (!updateData.middleName) updateData.middleName = "";
    if (!updateData.program) updateData.program = "";

    console.log("Update Data Before UpdateOne:", updateData);

    const result = await Instructor.updateOne(
      { _id: new ObjectId(_id) },
      { $set: updateData }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ error: "Instructor not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("Update Result:", result);

    return new Response(
      JSON.stringify({ message: "Profile updated successfully" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" },
      }
    );
  } catch (err) {
    console.error("Update error:", err);
    return new Response(JSON.stringify({ error: "Failed to update profile" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}