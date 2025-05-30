import PlaylistContainer from "@/components/PlaylistContainer";
import ProfileContainer from "@/components/ProfileContainer";
import ProfileContainerTwo from "@/components/ProfileContainerTwo";
import React from "react";

export default async function DashboardPage() {
  // console.log("[getServerSession 호출]", new Error().stack);

  return (
    <div>
      dashboard page
      <ProfileContainer />
      <ProfileContainerTwo />
      <PlaylistContainer />
    </div>
  );
}
