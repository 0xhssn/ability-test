import { Navbar } from "@/components/layout/navbar";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex w-full flex-col min-h-screen">
      <Navbar />
      <main className="flex-1">
        <div className="p-4"></div>
        <div className="container mx-auto px-5">{children}</div>
      </main>
    </div>
  );
}
