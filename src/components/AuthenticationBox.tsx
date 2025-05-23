"use client";

import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

function AuthenticationBox() {
  const { data: session } = useSession();
  return (
    <div className="flex flex-col items-start">
      {session ? (
        <button
          onClick={() => signOut()}
          className="bg-amber-600 cursor-pointer"
        >
          Sign Out
        </button>
      ) : (
        <button
          onClick={() => signIn()}
          className="bg-amber-300 cursor-pointer"
        >
          Sign In
        </button>
      )}
    </div>
  );
}

export default AuthenticationBox;
