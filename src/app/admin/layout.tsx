import { getCurrentAdminSession } from "@/lib/auth";
import { AdminNav } from "@/components/features/admin/AdminNav";

export const metadata = {
  title: "Painel Administrativo | belarmino.dev",
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getCurrentAdminSession();

  // If no session, render children directly (e.g. login page)
  if (!session) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 flex flex-col font-sans selection:bg-cyan-500/30">
      <AdminNav username={session.username} />
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
