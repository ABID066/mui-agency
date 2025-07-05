import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/dbConfig";
import User from "@/models/userModel";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/options";

export async function PUT(request: NextRequest) {
  try {
    await connectDB();
    
    // Get current user from session
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Toggle 2FA status
    user.twoFactorEnabled = !user.twoFactorEnabled;
    await user.save();

    return NextResponse.json({
      message: `Two-factor authentication ${user.twoFactorEnabled ? 'enabled' : 'disabled'} successfully`,
      twoFactorEnabled: user.twoFactorEnabled
    });
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}