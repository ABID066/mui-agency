import axios from "axios";
import toast from "react-hot-toast";

export async function registerAction(
  name: string,
  email: string,
  password: string,
  photoUrl?: string,
  agreeToTerms?: boolean, 
  subscribeNewsletter?: boolean
) {
  try {
    const userData = { name, email, image: photoUrl || "", password, acceptedTermsAndConditions: agreeToTerms, subscribeNewsletter };

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
