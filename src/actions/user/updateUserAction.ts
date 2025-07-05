import axios from "axios";
import toast from "react-hot-toast";
import { IUser } from "@/types/user.types";

export async function updateUserAction(identifier: string, userData: IUser) {
  try {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/update/${identifier}`,
      userData
    );

    if (data.user) {
      toast.success("User updated successfully");
      return { success: true, user: data.user };
    } else {
      toast.error(data.error || "Update failed");
      return { success: false, message: data.error };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorMessage = error.response.data.error || "Update failed";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
    toast.error("Update failed");
    return { success: false, message: "Update failed" };
  }
}