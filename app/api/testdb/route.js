import connection from "../../lib/config/connection.js";

export async function GET() {

    try {
        await connection()
        return new Response(JSON.stringify({ message: "Connected to database" }))
    } catch (error) {
        return new Response(JSON.stringify({ message: "cant to database" }))
    }
}
