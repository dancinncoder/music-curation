import GoogleProvider from "next-auth/providers/google";
import type { User } from "next-auth";
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
      profile,
    }: {
      token: JWT & { id?: string };
      user?: User | AdapterUser;
      profile?: { sub?: string } | null;
    }): Promise<JWT & { id?: string }> {
      if (user) {
        token.id = profile?.sub ?? (user as User | AdapterUser).id ?? token.id;
      }
      return token;
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
