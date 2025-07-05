import axios from "axios";
import toast from "react-hot-toast";

export async function toggleTwoFactorAction() {
  try {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/update-two-factor-status`
    );

    if (data.twoFactorEnabled !== undefined) {
      toast.success(data.message);
      return { success: true, twoFactorEnabled: data.twoFactorEnabled };
    } else {
      toast.error(data.error || "Failed to toggle 2FA");
      return { success: false, message: data.error };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorMessage = error.response.data.error || "Failed to toggle 2FA";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
    toast.error("Failed to toggle 2FA");
    return { success: false, message: "Failed to toggle 2FA" };
  }
}