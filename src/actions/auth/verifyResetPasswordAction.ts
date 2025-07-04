import axios from "axios";
import toast from "react-hot-toast";

export async function verifyResetPasswordAction(
  resetCode: string,
  hashedEmail: string,
  newPassword: string
) {
  try {
    const verifyData = {
      resetCode,
      hashedEmail,
      newPassword
    };
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-reset-password`,
      verifyData
    );

    if (data?.status === 200) {
      toast.success(data?.message);
      return {
        success: true,
        message: data?.message,
      };
    } else {
      toast.error(data?.message);
      return { success: false, message: data?.message };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
        const errorMessage = error.response.data.error || "Verification failed";
        toast.error(errorMessage);
        return { success: false, message: errorMessage };
    }
    toast.error("Verification failed");
    return { success: false, message: "Verification failed" };
  }
}
