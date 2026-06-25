import SideBar from "@/components/Sidebar";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex h-screen overflow-hidden">
      <SideBar />
      <div className="flex-1 overflow-y-hidden">
        {children}
    </div>
    </main>
  );
}
