"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { useMemo, useState } from "react";

import { useAuth } from "@/hooks/use-auth";
import { signOut } from "@/services/auth-service";
import { ThemeToggle } from "@/components/theme/theme-toggle";

function getInitials(email?: string) {
  if (!email) return "U";
  return email.slice(0, 1).toUpperCase();
}

export function DashboardHeader() {
  const router = useRouter();
  const { user } = useAuth();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const [avatarError, setAvatarError] = useState(false);

  const profileName = useMemo(() => {
    const metadataName =
      (user?.user_metadata?.full_name as string | undefined) ??
      (user?.user_metadata?.name as string | undefined);

    if (metadataName && metadataName.trim().length > 0) {
      return metadataName.trim();
    }

    return "Signed-in user";
  }, [user?.user_metadata?.full_name, user?.user_metadata?.name]);

  const profileEmail = user?.email ?? "No email available";
  const avatarUrl =
    (user?.user_metadata?.avatar_url as string | undefined) ??
    (user?.user_metadata?.picture as string | undefined);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true);
      await signOut();
      router.replace("/login");
      router.refresh();
    } finally {
      setIsSigningOut(false);
    }
  };

  return (
    <header className="mb-8 rounded-xl border border-border bg-card p-4 shadow-md sm:px-6 sm:py-5">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-2">
          <span className="inline-flex rounded-full bg-muted px-2.5 py-1 text-xs font-medium text-muted-foreground">
            Dashboard
          </span>
          <h1 className="text-lg font-semibold text-card-foreground sm:text-xl">
            Your Bookmarks
          </h1>
          <p className="text-sm text-muted-foreground">
            Private links synced in real time.
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 rounded-xl bg-muted/60 p-2 sm:justify-start sm:gap-4 sm:p-2.5">
          <div className="flex items-center gap-3">
            {avatarUrl && !avatarError ? (
              <Image
                src={avatarUrl}
                alt={profileName}
                onError={() => setAvatarError(true)}
                unoptimized
                width={40}
                height={40}
                className="h-10 w-10 rounded-full border border-border object-cover"
              />
            ) : (
              <div
                aria-hidden
                className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground"
              >
                {getInitials(user?.email)}
              </div>
            )}

            <div className="max-w-[12rem] sm:max-w-[16rem]">
              <p className="truncate text-sm font-semibold text-card-foreground">
                {profileName}
              </p>
              <p className="truncate text-xs text-muted-foreground">
                {profileEmail}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              onClick={handleSignOut}
              disabled={isSigningOut}
              className="inline-flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm font-medium text-card-foreground transition hover:bg-background disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isSigningOut ? (
                <svg
                  viewBox="0 0 24 24"
                  className="h-4 w-4 animate-spin"
                  aria-hidden
                >
                  <path
                    fill="currentColor"
                    d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8V2Z"
                  />
                </svg>
              ) : (
                <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                  <path
                    fill="currentColor"
                    d="M10 4h8a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-8v-2h8V6h-8V4Zm1.7 11.3L14 13H4v-2h10l-2.3-2.3 1.4-1.4L18.8 12l-5.7 5.7-1.4-1.4Z"
                  />
                </svg>
              )}
              <span>{isSigningOut ? "Signing out..." : ""}</span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
