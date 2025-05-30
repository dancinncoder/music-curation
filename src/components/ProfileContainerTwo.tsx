"use client";

import { getNickname } from "@/lib/nickname";
import { useQuery } from "@tanstack/react-query";
import React from "react";

function ProfileContainerTwo() {
  const { data: appUsers, isLoading } = useQuery({
    queryKey: ["appUsers"],
    queryFn: getNickname,
  });

  if (isLoading) return <p>Loading...</p>;
  // console.log("appUsers:", appUsers);
  return (
    <div>
      <p>nickname(ReactQuery+Prefetch+Hydration):{appUsers?.nickname}</p>
    </div>
  );
}

export default ProfileContainerTwo;
