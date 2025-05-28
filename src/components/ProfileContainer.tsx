"use client";

import { appUserNicknameAtom } from "@/atoms/user-nickname";
import { useAtom } from "jotai";
import React from "react";

function ProfileContainer() {
  const [nickname] = useAtom(appUserNicknameAtom);

  // console.log("nickname delievered in dashboard:", nickname);

  return <div>nickname: {nickname}</div>;
}

export default ProfileContainer;
