import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Hotel from "@/models/Hotel";

export async function GET(req, { params }) {
  await connectDB();
  const id = params.id;
  const authHeader = req.headers.get("x-api-key");
  const validApiKey = process.env.NEXT_PUBLIC_API_KEY;

  console.log("🔹 API Key from request:", authHeader);

  if (!authHeader || authHeader !== validApiKey) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const hotel = await Hotel.findById(id);

    if (!hotel) {
      return NextResponse.json({ error: "Hotel not found" }, { status: 404 });
    }

    return NextResponse.json({
      id: hotel._id,
      name: hotel.name,
      location: hotel.location,
      country: hotel.country || "N/A",
      price: hotel.price,
      image: hotel.image,
      description: hotel.description || "No description available",
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
