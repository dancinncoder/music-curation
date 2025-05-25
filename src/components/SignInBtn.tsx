"use client";

import React from "react";
import { signIn } from "next-auth/react";

function SignInBtn() {
  return (
    <div className="flex flex-col items-start">
      <button
        onClick={() => signIn("google", { callbackUrl: "/dashboard" })}
        className="bg-amber-600 cursor-pointer"
      >
        Sign In
      </button>
    </div>
  );
}

export default SignInBtn;
