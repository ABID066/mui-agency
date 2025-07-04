import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
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
    organizationIds: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    }],
    currentOrganizationId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Organization'
    },
    twoFactorEnabled: {
      type: Boolean,
      default: false,
    },
    preferences: {
        theme: {
            type: String,
            enum: ['light', 'dark', 'auto'],
            default: 'light'
        },
        language: {
            type: String,
            enum: ['en', 'bn'],
            default: 'en'
        },
        timezone: {
            type: String,
            default: 'UTC'
        }
    },
    acceptedTermsAndConditions: {
      type: Boolean,
      default: false,
    },
    subscribeNewsletter: {
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
