import bcrypt from "bcryptjs";

export const hashEmail = async (email: string): Promise<string> => {
  const hashedEmail = await bcrypt.hash(email, 10);
  return hashedEmail;
};