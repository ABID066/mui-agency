import axios from "axios";
import toast from "react-hot-toast";

export async function deleteUserAction(id: string) {
  try {
    const { data } = await axios.delete(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/delete/${id}`
    );

    if (data.success) {
      toast.success("User deleted successfully");
      return { success: true };
    } else {
      toast.error(data.error || "Delete failed");
      return { success: false, message: data.error };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorMessage = error.response.data.error || "Delete failed";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
    toast.error("Delete failed");
    return { success: false, message: "Delete failed" };
  }
}