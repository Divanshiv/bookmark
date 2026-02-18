import { redirect } from "next/navigation";

import { GoogleSignInButton } from "@/components/auth/google-sign-in-button";
import { ThemeToggle } from "@/components/theme/theme-toggle";
import { createClient } from "@/lib/supabase/server";

export default async function LoginPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <main className="relative flex min-h-dvh items-center justify-center overflow-hidden bg-background px-4 py-10">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(79,70,229,0.16),transparent_45%),radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.16),transparent_35%)]" />

      <div className="absolute right-4 top-4 z-20">
        <ThemeToggle />
      </div>

      <section className="relative z-10 w-full max-w-md rounded-3xl border border-border bg-card/95 p-7 shadow-xl backdrop-blur sm:p-8">
        <div className="mb-8 space-y-4 text-center">
          <p className="inline-flex rounded-full border border-border bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
            Smart Bookmark App
          </p>
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-border bg-background">
            <span className="text-lg font-semibold tracking-wide text-primary">
              SB
            </span>
          </div>
          <h1 className="text-3xl font-semibold tracking-tight text-card-foreground">
            Welcome back
          </h1>
          <p className="text-sm leading-relaxed text-muted-foreground">
            Save your links, keep them private, and sync instantly across tabs.
          </p>
        </div>
        <GoogleSignInButton />
      </section>
    </main>
  );
}
