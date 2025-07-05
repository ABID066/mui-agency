import axios from "axios";
import toast from "react-hot-toast";

interface UserPreferences {
  theme?: string;
  language?: string;
  timezone?: string;
}

export async function updatePreferencesAction(preferences: UserPreferences) {
  try {
    const { data } = await axios.put(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/update-preferences`,
      preferences
    );

    if (data.preferences) {
      toast.success(data.message);
      return { success: true, preferences: data.preferences };
    } else {
      toast.error(data.error || "Failed to update preferences");
      return { success: false, message: data.error };
    }
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorMessage = error.response.data.error || "Failed to update preferences";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
    toast.error("Failed to update preferences");
    return { success: false, message: "Failed to update preferences" };
  }
}