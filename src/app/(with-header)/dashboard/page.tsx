import PlaylistContainer from "@/components/PlaylistContainer";
import ProfileContainerTwo from "@/components/ProfileContainerTwo";
import React from "react";

export default async function DashboardPage() {
  // console.log("[getServerSession 호출]", new Error().stack);

  return (
    <div>
      dashboard page
      <ProfileContainerTwo />
      <PlaylistContainer />
    </div>
  );
}
