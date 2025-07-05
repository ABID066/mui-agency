import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/dbConfig";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/options";

export async function DELETE(request: NextRequest, { params }: { params: { id: string } }) {
  try {
    await connectDB();
    
    // Get current user from session
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    
    // Get current user's role
    const currentUser = await User.findOne({ email: session.user.email });
    if (!currentUser || !["super-admin", "admin"].includes(currentUser.role as string)) {
      return NextResponse.json({ error: "Permission denied" }, { status: 403 });
    }
    
    const targetUser = await User.findById(params.id);
    
    if (!targetUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }
    
    // Prevent deletion of admin/super-admin users
    if (["super-admin", "admin"].includes(targetUser.role as string)) {
      return NextResponse.json({ error: "Cannot delete admin users" }, { status: 403 });
    }
    
    // Delete the user
    await User.findByIdAndDelete(params.id);
    
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