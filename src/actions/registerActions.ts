import axios from "axios";
import toast from "react-hot-toast";

export async function registerAction(
  name: string,
  email: string,
  password: string,
  photoUrl?: string
) {
  try {
    const userData = { name, email, image: photoUrl || "", password };

    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/auth/register`,
      userData
    );

    if (data.status === 200) {
      toast.success(data.message);
      return {
        success: true,
        message: data.message,
        emailHash: data?.emailHash,
      };
    } else {
      toast.error(data.message);
      return { success: false, message: data.message };
    }
  } catch (error) {
    console.error("Registration Error:", error);
    return {
      success: false,
      message: "Registration failed",
      error: error instanceof Error ? error.message : "Unknown error",
    };
  }
}
