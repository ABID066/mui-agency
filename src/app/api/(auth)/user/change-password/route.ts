import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/dbConfig";
import User from "@/models/userModel";
import bcrypt from "bcryptjs";
import { authMiddleware } from "@/utils/auth-helpers";

export async function POST(request: NextRequest) {
  try {
    await connectDB();
    
    const { oldPassword, newPassword, userId } = await request.json();
    
    const authError = await authMiddleware(
      request,
      undefined,
      true,
      userId
    );

    if (authError) return authError;
    
    if (!oldPassword || !newPassword) {
      return NextResponse.json(
        { error: "Both old and new passwords are required" },
        { status: 400 }
      );
    }
    
    const user = await User.findById(userId);
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    const isValidPassword = await bcrypt.compare(oldPassword, user.password as string);
    if (!isValidPassword) {
      return NextResponse.json({ error: "Invalid old password" }, { status: 400 });
    }
    
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();
    
    return NextResponse.json({ message: "Password updated successfully" });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 