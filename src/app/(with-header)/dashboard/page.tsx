import React from "react";

export default async function DashboardPage() {
  console.log("[getServerSession 호출]", new Error().stack);

  return <div>dashboard page</div>;
}
