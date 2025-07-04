"use client";
import MUIThemeProvider from "@/providers/ThemeProvider";
import { SessionProvider } from "next-auth/react";
import AuthProvider from "@/providers/AuthProvider";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <MUIThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </MUIThemeProvider>
    </SessionProvider>
  );
};

export default AppProvider;
