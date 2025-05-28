"use client";
import { appUserNicknameAtom } from "@/atoms/user-nickname";
import { useSetAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

export default function NicknameInitializer() {
  const setNickname = useSetAtom(appUserNicknameAtom);
  const { data: session } = useSession();

  const fetchNickname = async () => {
    try {
      // console.log("5");
      const response = await fetch("/api/app-user");
      // console.log("7 response:", response);
      const appUserData = await response.json();
      const appUserNickName = appUserData?.nickname?.nickname;
      // console.log("7 appUserData:", appUserData);
      // console.log("8 appUserNickName:", appUserNickName);
      if (response.ok && appUserNickName) {
        setNickname(appUserNickName);
      } else {
        console.error("Nickname fetch error:", appUserData.error);
      }
    } catch (error) {
      console.error("Network error while fetcing nickname", error);
    }
  };

  useEffect(() => {
    if (session) {
      fetchNickname();
    } else {
      return;
    }
  }, [setNickname]);

  return null;
}
