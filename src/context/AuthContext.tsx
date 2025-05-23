"use client";

import { TypeAuthProps } from "@/types/type-auth";
import { SessionProvider } from "next-auth/react";

function AuthContext({ children }: TypeAuthProps) {
  return <SessionProvider>{children}</SessionProvider>;
}

export default AuthContext;
