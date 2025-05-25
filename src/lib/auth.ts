import GoogleProvider from "next-auth/providers/google";
import type { JWT } from "next-auth/jwt";
import { NextAuthOptions, Session } from "next-auth";

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
    async jwt({ token, profile }) {
      // 로그인 시 profile.sub는 구글의 고유 사용자 ID
      if (profile?.sub) {
        token.sub = profile.sub;
      }
      return token;
    },
    async session({
      session,
      token,
    }: {
      session: Session & { user: { id?: string } };
      token: JWT;
    }): Promise<Session & { user: { id?: string } }> {
      if (token.sub) {
        // session에 google 고유 아이디를 유저아이디로 넣음
        session.user.id = token.sub;
      }
      return session;
    },
  },
  // redirect: async ({ url, baseUrl }) => {
  //   // 로그인 후 리다이렉트 경로 지정
  //   if (url === baseUrl && `${baseUrl}/api/auth/signin`) {
  //     return `${baseUrl}/dashboard`;
  //   }
  //   return url;
  // },
  // 위 코드는 signIn(-,"google", { callbackUrl: "/dashboard" }) 등으로 직접 리다이렉팅을 넣으줌으로써 해결할 수 있기때문에 삭제해야함ㅌ
};
