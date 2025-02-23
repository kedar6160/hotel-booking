import { NextResponse } from "next/server";

export async function GET(req) {
  const body = await req.json();
  return NextResponse.json({ message: "Login successful", user: body });
}
