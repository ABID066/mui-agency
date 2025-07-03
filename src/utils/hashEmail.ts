import crypto from "crypto";

export const hashEmail = (email: string): string => {
  return crypto
    .createHash("sha256")
    .update(email)
    .digest("hex");
};