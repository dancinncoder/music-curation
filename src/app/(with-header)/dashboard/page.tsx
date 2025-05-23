import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    // 로그인 안 되어 있으면 홈으로 리디렉션
    redirect("/");
  }

  return <div>dashboard page</div>;
}

// console.log("SERVER SESSION:", session);
