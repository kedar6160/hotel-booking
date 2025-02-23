import { connectDB } from "@/lib/db";
import Hotel from "@/models/Hotel";
import { NextResponse } from "next/server";

export async function GET(req) {
  await connectDB();

  try {
    console.log("🔹 Fetching all hotels...");
    const hotels = await Hotel.find({});

    return NextResponse.json(hotels);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch hotels" },
      { status: 500 }
    );
  }
}
