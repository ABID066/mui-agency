import axios from "axios";
import toast from "react-hot-toast";

export async function verifyEmailAction(
  verificationCode: string,
  hashedEmail: string
) {
  try {
    const verifyData = {
      verificationCode,
      hashedEmail,
    };
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/verify-email`,
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
  } catch (error) {
    return { message: "Verification failed", status: 500, error: error };
  }
}
