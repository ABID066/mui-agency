import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

// Middleware configuration
export const config = {
  matcher: [
    "/api/user/:path*",
    "/api/organizations/:path*",
    // Add other protected routes here
  ],
};

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  // Check if user is authenticated
  if (!token) {
    return new NextResponse(JSON.stringify({ error: "Unauthorized" }), {
      status: 401,
      headers: { "Content-Type": "application/json" },
    });
  }

  return NextResponse.next();
}