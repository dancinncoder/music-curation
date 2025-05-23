import Header from "@/components/Header";
import AuthContext from "@/context/AuthContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthContext>
      <div lang="en">
        <Header />
        {children}
      </div>
    </AuthContext>
  );
}
