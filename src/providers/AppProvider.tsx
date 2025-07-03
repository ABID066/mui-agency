"use client";
import MUIThemeProvider from "@/components/ThemeProvider";
import { SessionProvider } from "next-auth/react";

const AppProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <SessionProvider>
      <MUIThemeProvider>{children}</MUIThemeProvider>
    </SessionProvider>
  );
};

export default AppProvider;
