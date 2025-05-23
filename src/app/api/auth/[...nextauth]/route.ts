import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { AdapterUser } from "next-auth/adapters";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      authorization: {
        params: {
          prompt: "select_account",
        },
      },
    }),
  ],
  callbacks: {
    async jwt({
      token,
      user,
      account,
      profile,
      isNewUser,
      trigger,
    }: {
      token: JWT & { id?: string };
      user?: User | AdapterUser;
      account?: any;
      profile?: any;
      isNewUser?: boolean;
      trigger?: string;
    }): Promise<JWT & { id?: string }> {
      if (user) {
        // profile?.sub 는 구글 OAuth에서 user 고유 ID임
        // ?? 왼쪽 값이 null 또는 undified 일 때 오른쪽 반환
        token.id = profile?.sub ?? (user as any).id ?? token.id;
      }
      return token;
    },

    async session({
      session,
      token,
      user,
      newSession,
      trigger,
    }: {
      session: Session & { user: { id?: string } };
      token: JWT & { id?: string };
      user: AdapterUser;
      newSession?: any;
      trigger?: string;
    }): Promise<Session & { user: { id?: string } }> {
      if (token.id) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  redirect: async ({ url, baseUrl }) => {
    // 로그인 후 리다이렉트 경로 지정
    if (url === baseUrl && `${baseUrl}/api/auth/signin`) {
      return `${baseUrl}/dashboard`;
    }
    return url;
  },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
