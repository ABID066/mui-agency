import type mongoose from "mongoose";
export interface IUser {
  id?: string;
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
  role?: "admin" | "user" | "super-admin";
  isVerified?: boolean;
  phone?: string;
  isBanned?: boolean;
  organizationIds?: mongoose.Schema.Types.ObjectId[] | string[];
  currentOrganizationId?: mongoose.Schema.Types.ObjectId | null | string;
  twoFactorEnabled?: boolean;
  preferences:
    | {
        theme: string;
        language: string;
        timezone: string;
      }
    | undefined;
  acceptedTermsAndConditions?: boolean;
  subscribeNewsletter?: boolean;
  verifyToken?: string;
  verifyTokenExpire?: Date;
  resetToken?: string;
  resetTokenExpire?: Date;
  lastLogin?: Date | null;
  createdAt?: Date;
  updatedAt?: Date;
  __v?: number;
}
