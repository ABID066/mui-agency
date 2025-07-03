import { Schema } from "mongoose";

const userSchema = new Schema(
  {
    id: {
      type: String,
    },
    name: {
      type: String,
      required: [true, "Name is required!!"],
    },
    email: {
      type: String,
      required: [true, "Email is required!!"],
      unique: [true, "This email already exists!!"],
    },
    password: {
      type: String,
    },
    image: {
      type: String,
    },
    provider: {
      type: String,
      enum: ["credentials", "google", "github", "facebook", "twitter", "apple", "LinkedIn"],
      default: "credentials",
    },
    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    verifyToken: String,
    verifyTokenExpire: Date,
    resetToken: String,
    resetTokenExpire: Date,
  },
  {
    collection: "users",
    timestamps: true,
  }
);

export default userSchema;
