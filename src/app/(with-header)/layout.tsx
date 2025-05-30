import Header from "@/components/Header";
import AuthContext from "@/context/AuthContext";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { JotaiProvider } from "@/components/providers/JotaiProvider";

// export default function WithHeaderLayout({ children, session }: TypeAuthProps) {
export default async function WithHeaderLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <AuthContext session={session}>
      <JotaiProvider>
        <div lang="en">
          <Header />
          {children}
        </div>
      </JotaiProvider>
    </AuthContext>
  );
}
