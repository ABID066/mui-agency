import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDB } from "@/database/dbConfig";
import { hashEmail } from "@/utils/hashEmail";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  try {
    // Validate request body
    const { verificationCode, hashedEmail } = await req.json();
    if (!verificationCode || !hashedEmail) {
      return NextResponse.json(
        { error: "Code and hashed email are required" },
        { status: 400 }
      );
    }

    // Connect to database
    await connectDB();

    // Find all users (consider optimizing this with a query)
    const users = await User.find({});
    const user = users.find((u) => hashEmail(u.email) === hashedEmail);

    // Validate user and token
    if (!user) {
      return NextResponse.json({ error: "User not found!" }, { status: 404 });
    }

    if (
      !user.verifyToken ||
      !user.verifyTokenExpire ||
      Date.now() > new Date(user.verifyTokenExpire as Date).getTime()
    ) {
      return NextResponse.json(
        { error: "Invalid or expired verification token" },
        { status: 400 }
      );
    }

    // Verify the code
    const isCodeValid = await bcrypt.compare(
      verificationCode,
      user.verifyToken
    );
    if (!isCodeValid) {
      return NextResponse.json(
        { error: "Invalid verification code" },
        { status: 400 }
      );
    }

    // Update user verification status
    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpire = undefined;
    await user.save();

    return NextResponse.json(
      { message: "Email verified successfully!", status: 200 },
      { status: 200 }
    );
  } catch (error) {
    console.error("Verification error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
