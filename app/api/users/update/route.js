import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { connectDB } from "@/lib/db";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function PUT(req) {
  await connectDB();
  console.log("✅ Connected to MongoDB");

  const session = await getServerSession(authOptions);

  if (!session || !session.user) {
    return NextResponse.json({ error: "Not authenticated" }, { status: 401 });
  }

  const { name, age, dob, contact } = await req.json();

  const updatedUser = await User.findOneAndUpdate(
    { email: session.user.email },
    { name, age, dob, contact },
    { new: true }
  );

  if (!updatedUser) {
    console.log("User not found.");
    return NextResponse.json({ error: "User not found" }, { status: 404 });
  }

  console.log("User updated:", updatedUser);
  return NextResponse.json({
    message: "Profile updated successfully",
    user: updatedUser,
  });
}
