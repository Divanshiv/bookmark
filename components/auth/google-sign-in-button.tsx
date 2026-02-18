"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

import { signInWithGoogle } from "@/services/auth-service";

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="h-5 w-5">
      <path
        fill="#EA4335"
        d="M12 10.2v3.9h5.4c-.2 1.3-1.5 3.9-5.4 3.9-3.2 0-5.9-2.7-5.9-6s2.6-6 5.9-6c1.8 0 3.1.8 3.8 1.4l2.6-2.5C16.7 3.3 14.5 2.4 12 2.4 6.9 2.4 2.8 6.6 2.8 11.9S6.9 21.3 12 21.3c6.9 0 9.1-4.8 9.1-7.3 0-.5 0-.9-.1-1.3H12Z"
      />
      <path
        fill="#34A853"
        d="M3.9 7.4 7 9.7c.8-2.4 2.9-4 5-4 1.8 0 3.1.8 3.8 1.4l2.6-2.5C16.7 3.3 14.5 2.4 12 2.4c-3.5 0-6.6 2-8.1 5Z"
      />
      <path
        fill="#4A90E2"
        d="M12 21.3c2.4 0 4.6-.8 6.2-2.2l-2.9-2.4c-.8.5-1.9.9-3.3.9-3.8 0-5.3-2.7-5.5-3.9l-3 2.3c1.5 3.1 4.7 5.3 8.5 5.3Z"
      />
      <path
        fill="#FBBC05"
        d="M6.5 13.7c-.2-.5-.3-1.2-.3-1.8 0-.6.1-1.2.3-1.8l-3-2.3c-.6 1.2-1 2.6-1 4.1s.4 2.9 1 4.1l3-2.3Z"
      />
    </svg>
  );
}

export function GoogleSignInButton() {
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const onClick = async () => {
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      await signInWithGoogle();
      router.refresh();
    } catch (error) {
      setErrorMessage(
        error instanceof Error
          ? error.message
          : "Unable to continue with Google.",
      );
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-3">
      <button
        type="button"
        onClick={onClick}
        disabled={isSubmitting}
        className="group cursor-pointer flex w-full items-center justify-center gap-3 rounded-full border border-border bg-card px-5 py-3 text-base font-semibold text-card-foreground shadow-sm transition hover:-translate-y-0.5 hover:shadow-md disabled:cursor-not-allowed disabled:opacity-70"
      >
        <span className="rounded-full bg-muted p-2 transition group-hover:bg-background">
          <GoogleIcon />
        </span>
        <span>{isSubmitting ? "Logging in..." : "Continue with Google"}</span>
      </button>
      {errorMessage ? (
        <p className="text-sm text-danger" role="alert">
          {errorMessage}
        </p>
      ) : null}
    </div>
  );
}
