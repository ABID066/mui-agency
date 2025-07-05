import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/database/dbConfig";
import User from "@/models/userModel";

export async function GET(request: NextRequest) {
  try {
    await connectDB();
    
    // Get query parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get("page") || "1");
    const limit = parseInt(url.searchParams.get("limit") || "10");
    const search = url.searchParams.get("search") || "";
    
    // Calculate skip value for pagination
    const skip = (page - 1) * limit;
    
    // Build search query
    let searchQuery = {};
    if (search) {
      searchQuery = {
        $or: [
          { name: { $regex: search, $options: "i" } },
          { email: { $regex: search, $options: "i" } },
          { phone: { $regex: search, $options: "i" } },
          { role: { $regex: search, $options: "i" } }
        ]
      };
    }
    
    // Get total count of filtered users
    const totalUsers = await User.countDocuments(searchQuery);
    
    // Get filtered and paginated users
    const users = await User.find(searchQuery)
      .select("-password -verifyToken -verifyTokenExpire -resetToken -resetTokenExpire")
      .skip(skip)
      .limit(limit);
    
    return NextResponse.json({
      users,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      totalUsers,
    });
    
  } catch (error: unknown) {
    return NextResponse.json({ error: error instanceof Error ? error.message : 'An unknown error occurred' }, { status: 500 });
  }
}