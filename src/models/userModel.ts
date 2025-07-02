import mongoose, { Model } from "mongoose";
import userSchema from "@/schemas/user.schema";
import { IUser } from "@/types/user.types";

const User: Model<IUser> =
  mongoose.models.user || mongoose.model<IUser>("user", userSchema);

export default User;
