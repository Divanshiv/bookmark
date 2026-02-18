"use client";

import { useLayoutEffect, useState } from "react";

const THEME_STORAGE_KEY = "bookmark-theme";

type Theme = "light" | "dark";

function applyTheme(theme: Theme) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  localStorage.setItem(THEME_STORAGE_KEY, theme);
}

function getInitialTheme(): Theme {
  const storedTheme = localStorage.getItem(THEME_STORAGE_KEY);
  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return document.documentElement.classList.contains("dark")
    ? "dark"
    : "light";
}

export function ThemeToggle() {
  const [theme, setThemeState] = useState<Theme | null>(null);

  useLayoutEffect(() => {
    const initialTheme = getInitialTheme();
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setThemeState(initialTheme);
  }, []);

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light";
    applyTheme(nextTheme);
    setThemeState(nextTheme);
  };

  if (theme === null) {
    return (
      <div className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card" />
    );
  }

  return (
    <button
      type="button"
      onClick={toggleTheme}
      className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border bg-card text-card-foreground transition hover:bg-muted"
      aria-label={
        theme === "light" ? "Switch to dark mode" : "Switch to light mode"
      }
      title={theme === "light" ? "Dark mode" : "Light mode"}
    >
      {theme === "light" ? (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path
            fill="currentColor"
            d="M21 12.8A9 9 0 1 1 11.2 3a1 1 0 0 1 .9 1.5A7 7 0 0 0 19.5 12a1 1 0 0 1 1.5.8Z"
          />
        </svg>
      ) : (
        <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden>
          <path
            fill="currentColor"
            d="M12 4a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0V5a1 1 0 0 1 1-1Zm0 13a5 5 0 1 0 0-10 5 5 0 0 0 0 10Zm8-6a1 1 0 1 1 0 2h-1a1 1 0 1 1 0-2h1ZM6 12a1 1 0 0 1-1 1H4a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm10.2 5.8a1 1 0 0 1 1.4 0l.7.7a1 1 0 0 1-1.4 1.4l-.7-.7a1 1 0 0 1 0-1.4Zm-9.7.7a1 1 0 1 1-1.4-1.4l.7-.7a1 1 0 1 1 1.4 1.4l-.7.7ZM18.3 5.7a1 1 0 0 1 0 1.4l-.7.7a1 1 0 1 1-1.4-1.4l.7-.7a1 1 0 0 1 1.4 0Zm-12.6 0a1 1 0 0 1 1.4 0l.7.7A1 1 0 0 1 6.4 7.8l-.7-.7a1 1 0 0 1 0-1.4ZM12 18a1 1 0 0 1 1 1v1a1 1 0 1 1-2 0v-1a1 1 0 0 1 1-1Z"
          />
        </svg>
      )}
    </button>
  );
}
