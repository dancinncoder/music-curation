import { prisma } from "./prisma";

// AuthUser(내부) 찾기 및 생성
export async function findOrCreateAuthUser(
  googleId: string,
  userInfo: {
    name?: string;
    email?: string;
    image?: string;
  }
) {
  console.log("🔍 찾는 googleId:", googleId);
  // AuthUser 찾기
  try {
    const authUser = await prisma.authUser.upsert({
      where: { googleId },
      update: {}, // 기존 사용자면 아무것도 업데이트 안함
      create: {
        googleId,
        email: userInfo.email ?? null,
        name: userInfo.name ?? "Anonymous",
        image: userInfo.image ?? null,
      },
    });

    console.log("AuthUser 사용자 생성 또는 조회 완료:", authUser);

    return authUser;
  } catch (error) {
    console.log("AuthUser 사용자 생성 또는 조회 실패", error);
    throw error;
  }
}

// AppUser(외부) 찾기 및 생성
export async function findOrCreateAppUser(
  authUserId: string,
  authUserName: string
) {
  // AppUser (외부) 찾기 및 생성
  try {
    const appUser = await prisma.appUser.upsert({
      where: { authUserId },
      update: {},
      create: {
        authUserId: authUserId,
        nickname: authUserName || "Anonymous",
      },
    });

    return appUser;
  } catch (error) {
    console.log("");
  }
}
