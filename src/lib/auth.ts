import GoogleProvider from "next-auth/providers/google";
import type { JWT } from "next-auth/jwt";
import { NextAuthOptions, Session } from "next-auth";
import { findOrCreateAppUser, findOrCreateAuthUser } from "./db";

export const authOptions: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        // 항상 로그인 창이 뜨게 함
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  callbacks: {
    // jwt가 생성되거나 업데이트될 때 호출됨
    async jwt({ token, profile }) {
      // 로그인 시 profile.sub는 구글의 고유 사용자 ID
      if (profile?.sub) {
        token.sub = profile.sub;
      }
      return token;
    },

    // 클라이언트가 세션을 요청할 때마다 호출됨
    async session({
      session,
      token,
    }: {
      session: Session & { user: { id?: string } };
      token: JWT;
    }): Promise<Session & { user: { id?: string } }> {
      // 최초 로그인: session.user 존재함 → DB 기록 등 수행
      console.log("session:", session);
      console.log("token.sub", token.sub);
      console.log("[SESSION CALLBACK] 호출됨", new Error().stack);

      if (!token?.sub) {
        console.warn("Token.sub가 없음, 세션 생성 스킵");
        return session;
      }

      const userInfo = {
        name: session.user?.name ?? token.name,
        email: session.user?.email ?? token.email,
        image: session.user?.image ?? token.picture,
      };
      console.log("userInfo", userInfo);

      if (!userInfo.email || !userInfo.name || !userInfo.image) {
        throw new Error("세션에 사용자 정보가 부족함.");
      }

      try {
        // 1. 구글 고유 id(token.sub) 기반으로 내부유저를 찾기 또는 생성
        const authUser = await findOrCreateAuthUser(token.sub, userInfo);

        // 2. AppUser 찾기 또는 생성
        const appUser = await findOrCreateAppUser(authUser.id, authUser.name);

        // 3. 클라이언트에게 반환될 세션에 공개 정보만 포함 시키기
        session.user = {
          id: appUser.uid,
          name: appUser.nickname,
        };
      } catch (error) {
        console.error("Session callback error:", error);
      }
      return session;
    },
  },
};
