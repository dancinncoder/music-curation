import Header from "@/components/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div lang="en">
      {/* TODO: public page에는 Header 컴포넌트 없게 렌더링 */}
      <Header />
      {children}
    </div>
  );
}
