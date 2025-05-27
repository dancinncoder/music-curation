"use client";

import { useSession } from "next-auth/react";
import React from "react";
import SignOutBtn from "./SignOutBtn";
import SignInBtn from "./SignInBtn";

function AuthenticationBox() {
  const { data: session } = useSession();
  return <div> {session ? <SignOutBtn /> : <SignInBtn />}</div>;
}

export default AuthenticationBox;
