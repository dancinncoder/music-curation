import { prisma } from "./prisma";

export default async function fetchNicknameFromDB(
  currentUserId: string
): Promise<string | null> {
  try {
    if (!currentUserId) return null;
    const user = await prisma.appUser.findUnique({
      where: { uid: currentUserId },
      select: { nickname: true },
    });
    console.log("nickname found in DB:", user.nickname);

    return user.nickname;
  } catch (error) {
    console.log("error occured during reading nickname from DB.", error);
  }
  return;
}
