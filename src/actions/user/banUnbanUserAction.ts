import axios from "axios";
import toast from "react-hot-toast";

export async function banUnbanUserAction(id: string) {
  try {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/ban-status/${id}`
    );

    if (data.user) {
      toast.success(data.message || "User ban status updated successfully");
      return { success: true, user: data.user };
    } else {
      toast.error(data.error || "Ban status update failed");
      return { success: false, message: data.error };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorMessage = error.response.data.error || "Ban status update failed";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
    toast.error("Ban status update failed");
    return { success: false, message: "Ban status update failed" };
  }
}