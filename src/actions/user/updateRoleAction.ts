import axios from "axios";
import toast from "react-hot-toast";

export async function updateRoleAction(id: string, role: string) {
  try {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/update-role/${id}`,
      { role }
    );

    if (data.user) {
      toast.success("Role updated successfully");
      return { success: true, user: data.user };
    } else {
      toast.error(data.error || "Role update failed");
      return { success: false, message: data.error };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorMessage = error.response.data.error || "Role update failed";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
    toast.error("Role update failed");
    return { success: false, message: "Role update failed" };
  }
}