import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import {
  HydrationBoundary,
  QueryClient,
  dehydrate,
} from "@tanstack/react-query";
import { getNickname } from "@/lib/name";
import { QueryProvider } from "@/components/providers/QueryProvider";
// import { getServerSession } from "next-auth";
// import { authOptions } from "./api/auth/[...nextauth]/route";
// import WithHeaderLayout from "./(with-header)/layout";

// const geistSans = Geist({
//   variable: "--font-geist-sans",
//   subsets: ["latin"],
// });

// const geistMono = Geist_Mono({
//   variable: "--font-geist-mono",
//   subsets: ["latin"],
// });

export const metadata: Metadata = {
  title: "OnMyPlaylist",
  description: "Qurate Your Playlist",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // QueryClient 생성 : 중앙 캐시 관리자
  const queryClient = new QueryClient();

  // 서버에서 데이터 미리 가져오기 Prefecth
  await queryClient.prefetchQuery({
    queryKey: ["appUsers"],
    queryFn: getNickname,
  });
  // 1) getNickname 함수를 통해 데이터 fetch
  // 2) queryKey는 캐시에 저장될 키. 추후 클라이언트에서 동일한 쿼리를 자동으로 재사용 가능하여 클라이언트에서 다시 요청하지 ㅇ낳고 서버에서 가져온 데이터 사용가능

  // 캐시 상태 직렬화 Dehydrate : React Query의 캐시 상태를 직렬화 가능한 JSON으로 변환
  const dehydratedState = dehydrate(queryClient);

  return (
    <html lang="en">
      <body>
        {/* React Query의 클라이언트용 Provider + 서버 캐시 복구(Hydration) */}
        <QueryProvider dehydratedState={dehydratedState}>
          {children}
        </QueryProvider>
      </body>
    </html>
  );
}
