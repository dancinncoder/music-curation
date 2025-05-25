import { authOptions } from "@/lib/auth";
import SignOutBtn from "@/components/SignOutBtn";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";
import SignInBtn from "@/components/SignInBtn";

export default async function SettingPage() {
  const session = await getServerSession(authOptions);
  // console.log("session", session);
  if (!session) {
    // 로그인 안 되어 있으면 강제로 홈으로 이동
    redirect("/");
  }

  return (
    <div>
      setting page
      {session ? <SignOutBtn /> : <SignInBtn />}
    </div>
  );
}
