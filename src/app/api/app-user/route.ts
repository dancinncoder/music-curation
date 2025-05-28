// DB의 app_users.nickname 데이터 읽기 가져오기

import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";

// DB direct communication
export async function GET() {
  try {
    const sessionFromServer = getServerSession(authOptions);
    const currentUserId = (await sessionFromServer).user.id;
    // console.log("1", currentUserId);

    if (!sessionFromServer || !currentUserId) {
      return NextResponse.json(
        { error: "Unauthorized during appUser.nickanme GET" },
        { status: 401 }
      );
    }

    const appUserNickname = await prisma.appUser.findUnique({
      // appUser의 uid의 값인 currentUserId의 nickname 값을 가져오기
      where: { uid: currentUserId },
      select: { nickname: true },
    });

    // console.log("2", appUserNickname);
    // console.log("3", appUserNickname.nickname);

    if (!appUserNickname) {
      return NextResponse.json(
        { error: "Currnet User's nickname not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({ nickname: appUserNickname }, { status: 202 });
  } catch (error) {
    return NextResponse.json(
      { error: "DB error during appUser.nickanme GET" },
      { status: 500 }
    );
  }
}
