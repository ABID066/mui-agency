import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/dbConfig";
import User from "@/models/userModel";
import { authMiddleware } from "@/utils/auth-helpers";

// Get single user
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    await connectDB();
    
    const authError = await authMiddleware(
      request,
      undefined,
      true,
      resolvedParams.id
    );

    if (authError) return authError;
    
    const user = await User.findById(resolvedParams.id)
      .select("-password -verifyToken -verifyTokenExpire -resetToken -resetTokenExpire");
      
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Update user
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    await connectDB();
    
    const authError = await authMiddleware(
      request,
      undefined,
      true,
      resolvedParams.id
    );

    if (authError) return authError;
    
    const updateData = await request.json();
    
    // Remove sensitive fields from update data
    delete updateData.password;
    delete updateData.email;
    delete updateData.role;
    
    const user = await User.findByIdAndUpdate(
      resolvedParams.id,
      { $set: updateData },
      { new: true }
    ).select("-password -verifyToken -verifyTokenExpire -resetToken -resetTokenExpire");
    
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    return NextResponse.json(user);
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}

// Delete user
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const resolvedParams = await params;
    await connectDB();
    
    const authError = await authMiddleware(
      request,
      ["super-admin", "admin"]
    );

    if (authError) return authError;
    
    const targetUser = await User.findById(resolvedParams.id);
    
    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    if (["super-admin", "admin"].includes(targetUser.role as string)) {
      return NextResponse.json({ error: "Cannot delete admin users" }, { status: 403 });
    }
    
    await User.findByIdAndDelete(resolvedParams.id);
    
    return NextResponse.json({
      message: "User deleted successfully",
      deletedUser: {
        id: targetUser._id,
        name: targetUser.name,
        email: targetUser.email
      }
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}