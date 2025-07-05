import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/(auth)/auth/[...nextauth]/options";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

// Check if user has required role
export async function checkUserRole(allowedRoles: string[]) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return false;
  }

  const user = await User.findOne({ email: session.user.email });
  return user && allowedRoles.includes(user.role as string);
}

// Verify if the user is modifying their own data or is an admin
export async function verifyUserOwnership(userIdentifier: string) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return false;
  }

  const user = await User.findOne({ email: session.user.email });
  if (!user) return false;

  // Return true if user is admin/super-admin or owns the data
  return (
    ["admin", "super-admin"].includes(user.role as string) ||
    user.email === userIdentifier ||
    user._id.toString() === userIdentifier
  );
}

// Combined middleware for role and ownership check
export async function authMiddleware(
  req: NextRequest,
  allowedRoles?: string[],
  checkOwnership: boolean = false,
  userIdentifier?: string
) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const user = await User.findOne({ email: session.user.email });
    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // 1. Check roles if specified
    if (allowedRoles && allowedRoles.length > 0) {
      const hasRole = allowedRoles.includes(user.role as string);
      if (!hasRole) {
        return NextResponse.json(
          { error: "Permission denied" },
          { status: 403 }
        );
      }
    }

    // 2. Check ownership if required
    if (checkOwnership && userIdentifier) {
      const isOwner = await verifyUserOwnership(userIdentifier);
      if (!isOwner) {
        return NextResponse.json(
          { error: "You don't have permission to modify this data" },
          { status: 403 }
        );
      }
    }

    return null; // No error, continue with the request
  } catch (error: unknown) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
