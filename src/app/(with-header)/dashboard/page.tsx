import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
// import { redirect } from "next/navigation";
import React from "react";

export default async function DashboardPage() {
  // const session = await getServerSession(authOptions);
  // console.log("Dashboard Page Session:", session);
  console.log("[getServerSession 호출]", new Error().stack);

  // 일단 이게 문제야! 모든 에러 3개에 대한 문제가!!!!
  // if (!session) {
  //   // 로그인 안 되어 있으면 홈으로 리디렉션
  //   redirect("/");
  // }

  return <div>dashboard page</div>;
}
