import client from "@/app/lib/mongodb";

export async function GET() {
  try {
    await client.connect();
    const db = client.db("faculty");
    const facultyCollection = db.collection("facultyAccounts");

    const facultyList = await facultyCollection.find({}).toArray();

    return new Response(JSON.stringify(facultyList), { status: 200 });
  } catch (error) {
    console.error("Error fetching faculty list:", error);
    return new Response(JSON.stringify({ error: "Failed to fetch faculty list" }), { status: 500 });
  } finally {
    await client.close();
  }
}
