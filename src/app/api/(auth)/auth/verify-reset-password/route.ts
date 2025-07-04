import { NextRequest, NextResponse } from "next/server";
import User from "@/models/userModel";
import { connectDB } from "@/database/dbConfig";
import { hashEmail } from "@/utils/hashEmail";
import bcrypt from "bcryptjs";

export async function POST(req: NextRequest) {
  const { resetCode, hashedEmail, newPassword } = await req.json();
  if (!resetCode || !hashedEmail || !newPassword)
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });

  await connectDB();
  const users = await User.find({});
  const user = users.find((u) => hashEmail(u.email) === hashedEmail);

  if (
    !user ||
    !user.resetToken ||
    Date.now() > new Date(user.resetTokenExpire as Date).getTime()
  )
    return NextResponse.json(
      { error: "Invalid or expired code!" },
      { status: 400 }
    );

  const match = await bcrypt.compare(resetCode, user.resetToken);
  if (!match)
    return NextResponse.json({ error: "Invalid code" }, { status: 400 });

  const passwordIsMatch = await bcrypt.compare(
    newPassword,
    user?.password || ""
  );
  if (passwordIsMatch) {
    return NextResponse.json(
      { error: "New password must be different from the old password" },
      { status: 400 }
    );
  }

  user.password = await bcrypt.hash(newPassword, 12);
  user.resetToken = undefined;
  user.resetTokenExpire = undefined;
  await user.save();

  return NextResponse.json({ message: "Password reset successful", status: 200 });
}
