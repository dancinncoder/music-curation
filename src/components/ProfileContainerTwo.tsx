"use client";

import { getAppUser } from "@/lib/appuser";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function ProfileContainerTwo() {
  const { data: appUser, isLoading } = useQuery({
    queryKey: ["appUser"],
    queryFn: getAppUser,
  });

  if (isLoading) return <p>Loading...</p>;
  // console.log("appUsers:", appUsers);
  return (
    <div>
      <p>nickname(ReactQuery+Prefetch+Hydration):{appUser?.nickname}</p>
    </div>
  );
}

export default ProfileContainerTwo;
