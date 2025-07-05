import axios from "axios";
import toast from "react-hot-toast";

interface ChangePasswordParams {
  oldPassword: string;
  newPassword: string;
  userId: string;
}

export async function changePasswordAction({ oldPassword, newPassword, userId }: ChangePasswordParams) {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/change-password`,
      { oldPassword, newPassword, userId }
    );

    if (data.message) {
      toast.success("Password changed successfully");
      return { success: true };
    } else {
      toast.error(data.error || "Password change failed");
      return { success: false, message: data.error };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorMessage = error.response.data.error || "Password change failed";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
    toast.error("Password change failed");
    return { success: false, message: "Password change failed" };
  }
}