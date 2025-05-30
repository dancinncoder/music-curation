import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { prisma } from "./prisma";

export async function getPlaylist() {
  const session = await getServerSession(authOptions);

  // app_user.uid === session.user.id
  const appUserUid = session?.user?.id;
  if (!appUserUid) {
    console.log("getPlaylist 에서 session id 없음");
    return null;
  }

  // playlist 조회
  const playlist = await prisma.playlist.findMany({
    where: { userUid: appUserUid },
    orderBy: {
      createdAt: "desc", // 최근 추가 순으로
    },
  });

  console.log("playlist from getplaylist:", playlist);

  return playlist;
}
