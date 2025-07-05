import axios from "axios";
import toast from "react-hot-toast";
import { IUser } from "@/types/user.types";

interface GetAllUsersParams {
  page?: number;
  limit?: number;
  search?: string;
}

interface GetAllUsersResponse {
  users: IUser[];
  currentPage: number;
  totalPages: number;
  totalUsers: number;
}

export async function getAllUsersAction({ page = 1, limit = 10, search = "" }: GetAllUsersParams = {}) {
  try {
    const { data } = await axios.get<GetAllUsersResponse>(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/user/all-user?page=${page}&limit=${limit}&search=${search}`
    );

    return {
      success: true,
      users: data.users,
      currentPage: data.currentPage,
      totalPages: data.totalPages,
      totalUsers: data.totalUsers
    };
  } catch (error: unknown) {
    if (axios.isAxiosError(error) && error.response?.data) {
      const errorMessage = error.response.data.error || "Failed to fetch users";
      toast.error(errorMessage);
      return { success: false, message: errorMessage };
    }
    toast.error("Failed to fetch users");
    return { success: false, message: "Failed to fetch users" };
  }
}