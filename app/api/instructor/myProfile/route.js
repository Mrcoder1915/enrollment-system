import connection from "@/app/lib/config/connection";
import FacultyProfile from "@/app/models/facultyProfile.model";
import { ObjectId } from "mongodb";

export async function GET() {
  try {
    await connection();
    const profiles = await FacultyProfile.find({}).lean();

    return new Response(JSON.stringify(profiles), {
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

export async function PUT(request) {
  try {
    await connection();
    const data = await request.json();

    const id = data._id;
    if (!id || !ObjectId.isValid(id)) {
      return new Response(JSON.stringify({ error: "Invalid or missing _id" }), {
        status: 400,
        headers: { "Content-Type": "application/json" },
      });
    }

    console.log("Updating profile with ID:", id); // ✅ Debug

    const updateData = { ...data };
    delete updateData._id;

    const updatedProfile = await FacultyProfile.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: updateData },
      { new: true, runValidators: true }
    ).lean();

    if (!updatedProfile) {
      return new Response(JSON.stringify({ error: "Profile not found" }), {
        status: 404,
        headers: { "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify(updatedProfile), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error("Update error:", err.message, err); // ✅ Show real reason
    return new Response(JSON.stringify({ error: "Could not update profile" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
