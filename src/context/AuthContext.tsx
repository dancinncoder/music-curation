"use client";

import { TypeAuthProps } from "@/types/type-auth";
import { SessionProvider } from "next-auth/react";

function AuthContext({ children, session }: TypeAuthProps) {
  return <SessionProvider session={session}>{children}</SessionProvider>;
}

export default AuthContext;
