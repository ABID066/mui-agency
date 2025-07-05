import axios from "axios";
import toast from "react-hot-toast";

export async function getSingleUserAction(identifier: string) {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/single-user/${identifier}`
    );

    if (data) {
      return { success: true, user: data };
    } else {
      toast.error("User not found");
      return { success: false, message: "User not found" };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorMessage = error.response.data.error || "Failed to fetch user";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
    toast.error("Failed to fetch user");
    return { success: false, message: "Failed to fetch user" };
  }
}