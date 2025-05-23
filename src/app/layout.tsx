import type { Metadata } from "next";
// import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
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
  // const session = await getServerSession(authOptions);
  return (
    <html lang="en">
      <body>
        {/* <WithHeaderLayout session={session}>{children}</WithHeaderLayout> */}
        {children}
      </body>
    </html>
  );
}
