"use client";

import { useEffect } from "react";
import { useSession } from "next-auth/react";
import useAuth from "@/hooks/useAuth";
import type { IUser } from "@/types/user.types";

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session, status } = useSession();
  const { setUser, setLoading } = useAuth();

  useEffect(() => {
    try {
      if (status === "loading") {
        return setLoading(true);
      }
      setLoading(false);
      if (session?.user) {
        const user: IUser = {
          name: session.user.name || "",
          email: session.user.email || "",
          image: session.user.image || "",
          role: (session.user.role as "user" | "admin") || "user",
          isVerified: session.user.isVerified || false,
          organizationIds: session.user.organizationIds || [],
          currentOrganizationId: session.user.currentOrganizationId || "",
          preferences: session.user.preferences,
        };
        setUser(user);
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error("AuthProvider error:", error);
      setUser(null);
      setLoading(false);
    }
  }, [session, status, setUser, setLoading]);

  return <>{children}</>;
}
