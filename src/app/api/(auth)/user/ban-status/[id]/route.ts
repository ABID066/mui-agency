import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/dbConfig";
import User from "@/models/userModel";
import { authMiddleware } from "@/utils/auth-helpers";

export async function PUT(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    
    const authError = await authMiddleware(
      request,
      ["super-admin", "admin"] // Only admin and super-admin can ban/unban
    );

    if (authError) return authError;
    
    const targetUser = await User.findById(params.id);
    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    if (["super-admin"].includes(targetUser.role as string)) {
      return NextResponse.json({ error: "Cannot ban super-admin users" }, { status: 403 });
    }
    
    targetUser.isBanned = !targetUser.isBanned;
    await targetUser.save();
    
    return NextResponse.json({
      message: `User ${targetUser.isBanned ? 'banned' : 'unbanned'} successfully`,
      user: {
        id: targetUser._id,
        name: targetUser.name,
        email: targetUser.email,
        isBanned: targetUser.isBanned
      }
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
} 