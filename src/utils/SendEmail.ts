import User from "@/models/userModel";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { VerificationEmailTemplate } from "@/utils/emailTemplates/verificationEmailTemplate";
import { ResetPasswordEmailTemplate } from "@/utils/emailTemplates/resetPasswordEmailTemplate";
import { connectDB } from "@/database/dbConfig";
import { hashEmail } from "@/utils/hashEmail";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER as string,
    pass: process.env.GMAIL_APP_PASS as string,
  },
});

export const SendEmail = async (
  email: string,
  emailType: string
): Promise<{ success: boolean; message: string; emailHash: string } | string> => {
  try {
    let hashedToken = "";
    let subject = "";
    let htmlContent = "";
    const toEmail = email;
    const emailHash = hashEmail(email);

    if (emailType === "verify-email" || emailType === "reset-password") {
      // 🔢 6-digit decimal random number generate
      const rawCode = Math.floor(100000 + Math.random() * 900000).toString();

      // 🔐 Hash the code
      hashedToken = await bcrypt.hash(rawCode, 12);

      await connectDB();

      const updateField =
        emailType === "verify-email"
          ? {
              verifyToken: hashedToken,
              verifyTokenExpire: Date.now() + 60 * 60 * 1000,
            }
          : {
              resetToken: hashedToken,
              resetTokenExpire: Date.now() + 60 * 60 * 1000,
            };

      await User.findOneAndUpdate({ email }, updateField);

      subject =
        emailType === "verify-email"
          ? "Verify Your Email"
          : "Reset Your Password";
      htmlContent =
        emailType === "verify-email"
          ? VerificationEmailTemplate(rawCode, emailHash)
          : ResetPasswordEmailTemplate(rawCode, emailHash);
    } else {
      throw new Error("Invalid email type or missing data.");
    }

    await transporter.sendMail({
      from: `"Royalx Support" <${process.env.GMAIL_USER as string}>`,
      to: toEmail,
      subject,
      html: htmlContent,
    });

    return { success: true, message: "Please check your email!!", emailHash: emailHash };
  } catch (error) {
    console.error("Email send error:", error);
    return error instanceof Error ? error.message : "Unknown error occurred";
  }
};
