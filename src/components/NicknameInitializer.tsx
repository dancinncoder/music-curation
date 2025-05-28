"use client";
import { appUserNicknameAtom } from "@/atoms/user-nickname";
import { useSetAtom } from "jotai";
import { useSession } from "next-auth/react";
import { useCallback, useEffect } from "react";

export default function NicknameInitializer() {
  const setNickname = useSetAtom(appUserNicknameAtom);
  const { data: session } = useSession();

  const fetchNickname = useCallback(async () => {
    try {
      const response = await fetch("/api/app-user");
      const appUserData = await response.json();
      const appUserNickName = appUserData?.nickname?.nickname;
      if (response.ok && appUserNickName) {
        setNickname(appUserNickName);
      } else {
        console.error("Nickname fetch error:", appUserData.error);
      }
    } catch (error) {
      console.error("Network error while fetching nickname", error);
    }
  }, [setNickname]);

  useEffect(() => {
    if (session) {
      fetchNickname();
    }
  }, [session, fetchNickname]);

  return null;
}
