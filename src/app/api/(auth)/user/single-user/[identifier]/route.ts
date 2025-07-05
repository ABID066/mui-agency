import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/dbConfig";
import User from "@/models/userModel";

export async function GET(
  request: NextRequest,
  context: { params: Promise<{ identifier: string }> }
) {
  try {
    await connectDB();
    
    const { identifier } = await context.params;
    const user = await User.findOne({
      $or: [
        { _id: identifier },
        { email: identifier }
      ]
    }).select("-password -verifyToken -verifyTokenExpire -resetToken -resetTokenExpire");
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json(user);
    
  } catch (error: unknown) {
     return NextResponse.json({ error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 500 });
  }
}