"use client"; // ✅ This makes it a client component
import { SessionProvider as AuthProvider } from "next-auth/react";

export function SessionProvider({ children }) {
  return <AuthProvider>{children}</AuthProvider>;
}
