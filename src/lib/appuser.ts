import { getServerSession } from "next-auth";
import { authOptions } from "./auth";
import { prisma } from "./prisma";

// 서버컴포넌트에서 데이터 fetch
export async function getAppUser() {
  const session = await getServerSession(authOptions);

  // app_user.uid === session.user.id
  if (!session?.user?.id) {
    console.log("getNickname 에서 session id 없음");
    return null;
  }

  // return await prisma.appUser.findUnique({
  //   where: { uid: session.user.id },
  //   select: { nickname: true },
  // });
  return await prisma.appUser.findUnique({
    where: { uid: session.user.id },
    select: { nickname: true, uid: true },
  });
}
