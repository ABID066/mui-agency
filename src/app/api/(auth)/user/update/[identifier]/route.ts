import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/dbConfig";
import User from "@/models/userModel";

export async function PUT(request: NextRequest, { params }: { params: { identifier: string } }) {
  try {
    await connectDB();
    
    const identifier = params.identifier;
    const updateData = await request.json();
    
    // Remove sensitive fields from update data
    delete updateData.password;
    delete updateData.email; // Prevent email change through this endpoint
    
    const user = await User.findOneAndUpdate(
      {
        $or: [
          { _id: identifier },
          { email: identifier }
        ]
      },
      { $set: updateData },
      { new: true }
    ).select("-password -verifyToken -verifyTokenExpire -resetToken -resetTokenExpire");
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json(user);
    
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 500 });
  }
}