import type mongoose from "mongoose";
export interface IUser {
  _id?: string;
  name: string;
  email: string;
  password?: string;
  image?: string;
  provider?:
    | "credentials"
    | "google"
    | "github"
    | "facebook"
    | "twitter"
    | "apple"
    | "LinkedIn";
  role?: "admin" | "user";
  isVerified?: boolean;
  organizationIds?: mongoose.Schema.Types.ObjectId[];
  currentOrganizationId?: mongoose.Schema.Types.ObjectId | null;
  twoFactorEnabled?: boolean;
  preferences: {
    theme: string;
    language: string;
    timezone: string;
  };
  acceptedTermsAndConditions?: boolean;
  subscribeNewsletter?: boolean;
  verifyToken?: string;
  verifyTokenExpire?: Date;
  resetToken?: string;
  resetTokenExpire?: Date;
  createdAt?: Date;
  updatedAt?: Date;
}
