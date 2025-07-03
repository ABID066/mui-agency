import { connectDB } from "@/database/dbConfig";
import { NextResponse, type NextRequest } from "next/server";
import bcrypt from "bcryptjs";
import User from "@/models/userModel";
import { SendEmail } from "@/utils/SendEmail";

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();

    // Parse the request body
    const userInfo = await request.json();
    const { name, email, password, image } = userInfo;

    // Validate required fields
    if (!name || !email || !password) {
      return NextResponse.json({
        message: "Missing required fields",
        status: 400,
      });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json({
        message: "User already exists!",
        status: 400,
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 12);

    // Create and save the new user
    const newUser = new User({ name, email, password: hashedPassword, image });
    await newUser.save();

    // Send verification email
    const emailResponse = await SendEmail(email, "verify-email");
    let emailHash = "";
    let responseMessage = "";

    if (typeof emailResponse == "object") {
      responseMessage = emailResponse.message;
      emailHash = emailResponse.emailHash;
    }

    return NextResponse.json(
      {
        message: responseMessage,
        emailHash: emailHash,
        status: 200,
        user: { name, email },
      },
      { status: 201 }
    );
  } catch (err: unknown) {
    return NextResponse.json(
      {
        message:
          err instanceof Error ? err.message : "An unknown error occurred",
        status: 500,
      },
      { status: 500 }
    );
  }
};
