import { redirect } from "next/navigation";
import { type ReactNode } from "react";

import { DashboardHeader } from "@/components/dashboard/dashboard-header";
import { AuthProvider } from "@/components/providers/auth-provider";
import { createClient } from "@/lib/supabase/server";

type DashboardLayoutProps = {
  children: ReactNode;
};

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const supabase = await createClient();
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  return (
    <AuthProvider initialSession={session}>
      <main className="min-h-dvh bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.09),transparent_42%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.09),transparent_30%)] px-4 py-6 sm:px-6 sm:py-8">
        <div className="mx-auto max-w-5xl">
          <DashboardHeader />
          {children}
        </div>
      </main>
    </AuthProvider>
  );
}
