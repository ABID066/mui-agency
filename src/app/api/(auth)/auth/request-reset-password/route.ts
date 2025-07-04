import { connectDB } from "@/database/dbConfig";
import { NextResponse, type NextRequest } from "next/server";
import User from "@/models/userModel";
import { SendEmail } from "@/utils/SendEmail";

export const POST = async (request: NextRequest) => {
  try {
    await connectDB();

    // Parse the request body
    const userInfo = await request.json();
    const { email } = userInfo;

    // Validate required fields
    if (!email) {
      return NextResponse.json({
        message: "Email is required!",
        status: 400,
      });
    }

    // Check if user already exists
    const userIsExist = await User.findOne({ email });
    if (!userIsExist) {
      return NextResponse.json({
        message: "User does not exist!",
        status: 400,
      });
    }
    // Send verification email
    const emailResponse = await SendEmail(email, "reset-password");
    let emailHash = "";
    let responseMessage = "";

    if (typeof emailResponse == "object" && emailResponse.success) {
      responseMessage = emailResponse?.message;
      emailHash = emailResponse?.emailHash;
    }

    return NextResponse.json(
      {
        message: responseMessage,
        emailHash: emailHash,
        status: 200,
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
