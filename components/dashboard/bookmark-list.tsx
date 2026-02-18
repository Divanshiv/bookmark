"use client";

import { type ReactNode } from "react";
import { toast } from "sonner";

import type { Bookmark } from "@/types/bookmark";

type BookmarkListProps = {
  bookmarks: Bookmark[];
  isLoading: boolean;
  deletingId: string | null;
  onDelete: (bookmarkId: string) => Promise<void>;
};

function ActionIcon({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <span
      className="inline-flex h-8 w-8 items-center justify-center rounded-md"
      aria-label={label}
    >
      {children}
    </span>
  );
}

function BookmarkSkeleton() {
  return (
    <li className="rounded-xl border border-border bg-card p-4 shadow-md">
      <div className="h-4 w-2/3 animate-pulse rounded bg-muted" />
      <div className="mt-3 h-3 w-full animate-pulse rounded bg-muted" />
    </li>
  );
}

export function BookmarkList({
  bookmarks,
  isLoading,
  deletingId,
  onDelete,
}: BookmarkListProps) {
  const copyUrl = async (url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      toast.success("Link copied to clipboard.");
    } catch {
      toast.error("Unable to copy link.");
    }
  };

  if (isLoading) {
    return (
      <ul className="grid gap-3 sm:grid-cols-2">
        <BookmarkSkeleton />
        <BookmarkSkeleton />
        <BookmarkSkeleton />
        <BookmarkSkeleton />
      </ul>
    );
  }

  if (bookmarks.length === 0) {
    return (
      <section className="rounded-xl border border-dashed border-border bg-card p-8 text-center shadow-md">
        <h3 className="text-base font-semibold text-card-foreground">
          No bookmarks yet
        </h3>
        <p className="mt-2 text-sm text-muted-foreground">
          Add your first link to start building your private list.
        </p>
      </section>
    );
  }

  return (
    <ul className="grid gap-3 sm:grid-cols-2">
      {bookmarks.map((bookmark) => (
        <li
          key={bookmark.id}
          className="rounded-xl border border-border bg-card p-4 shadow-md"
        >
          <h3 className="line-clamp-1 text-sm font-semibold text-card-foreground sm:text-base">
            {bookmark.title}
          </h3>
          <a
            href={bookmark.url}
            target="_blank"
            rel="noreferrer"
            className="mt-2 block line-clamp-1 text-sm text-primary hover:underline"
          >
            {bookmark.url}
          </a>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <span className="text-xs text-muted-foreground">
              {new Date(bookmark.created_at).toLocaleString([], {
                year: "numeric",
                month: "short",
                day: "2-digit",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </span>
            <div className="flex items-center gap-2 self-end sm:self-auto">
              <a
                href={bookmark.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-card-foreground transition hover:bg-muted"
                title="Open link"
                aria-label="Open link"
              >
                <ActionIcon label="Open link">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                    <path
                      fill="currentColor"
                      d="M14 3h7v7h-2V6.4l-9.3 9.3-1.4-1.4L17.6 5H14V3ZM5 5h6v2H7v10h10v-4h2v6H5V5Z"
                    />
                  </svg>
                </ActionIcon>
              </a>
              <button
                type="button"
                onClick={() => void copyUrl(bookmark.url)}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-card-foreground transition hover:bg-muted"
                title="Copy link"
                aria-label="Copy link"
              >
                <ActionIcon label="Copy link">
                  <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                    <path
                      fill="currentColor"
                      d="M16 1a2 2 0 0 1 2 2v10h-2V3H6v10H4V3a2 2 0 0 1 2-2h10Zm3 4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h11Zm0 2H8v14h11V7Z"
                    />
                  </svg>
                </ActionIcon>
              </button>
              <button
                type="button"
                onClick={() => void onDelete(bookmark.id)}
                disabled={deletingId === bookmark.id}
                className="inline-flex h-8 w-8 items-center justify-center rounded-md border border-border text-card-foreground transition hover:bg-muted disabled:cursor-not-allowed disabled:opacity-70"
                title={deletingId === bookmark.id ? "Deleting..." : "Delete bookmark"}
                aria-label={deletingId === bookmark.id ? "Deleting..." : "Delete bookmark"}
              >
                {deletingId === bookmark.id ? (
                  <svg viewBox="0 0 24 24" className="h-4 w-4 animate-spin" aria-hidden>
                    <path
                      fill="currentColor"
                      d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8V2Z"
                    />
                  </svg>
                ) : (
                  <ActionIcon label="Delete bookmark">
                    <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden>
                      <path
                        fill="currentColor"
                        d="M9 3h6l1 2h4v2H4V5h4l1-2Zm1 6h2v9h-2V9Zm4 0h2v9h-2V9ZM7 9h2v9H7V9Zm-1 12h12l1-13H5l1 13Z"
                      />
                    </svg>
                  </ActionIcon>
                )}
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
