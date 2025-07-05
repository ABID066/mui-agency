import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/dbConfig";
import User from "@/models/userModel";
import { authMiddleware } from "@/utils/auth-helpers";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/options";

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();
    
    const authError = await authMiddleware(
      request,
      ["super-admin", "admin"]
    );

    if (authError) return authError;
    
    const { role } = await request.json();
    const { id } = await context.params;
    const targetUser = await User.findById(id);
    
    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    // Check if trying to modify super-admin
    if (targetUser.role === "super-admin") {
      return NextResponse.json(
        { error: "Cannot modify super-admin role" },
        { status: 403 }
      );
    }
    
    // Get current user's role
    const session = await getServerSession(authOptions);
    const currentUser = await User.findOne({ email: session?.user?.email as string });
    
    // Admin can only modify regular users
    if (currentUser?.role === "admin" && targetUser.role === "admin") {
      return NextResponse.json(
        { error: "Admin cannot modify other admin roles" },
        { status: 403 }
      );
    }
    
    targetUser.role = role;
    await targetUser.save();
    
    return NextResponse.json({
      message: "Role updated successfully",
      user: {
        id: targetUser._id,
        name: targetUser.name,
        email: targetUser.email,
        role: targetUser.role
      }
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}