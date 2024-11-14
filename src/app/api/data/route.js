import connectToDB from "@/database";
import Item from "@/models/Item";

export async function GET(req) {
  await connectToDB();

  try {
    const items = await Item.find({});
    return new Response(JSON.stringify(items), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    return new Response(JSON.stringify({ message: "Error fetching data" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
