import Header from "@/components/Header";
import AuthContext from "@/context/AuthContext";
import { TypeAuthProps } from "@/types/type-auth";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";

// export default function WithHeaderLayout({ children, session }: TypeAuthProps) {
export default async function WithHeaderLayout({ children }: TypeAuthProps) {
  const session = await getServerSession(authOptions);
  return (
    <AuthContext session={session}>
      <div lang="en">
        <Header />
        {children}
      </div>
    </AuthContext>
  );
}
