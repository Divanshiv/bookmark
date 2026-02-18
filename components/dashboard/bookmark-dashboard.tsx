"use client";

import { useMemo, useState } from "react";

import { BookmarkForm } from "@/components/dashboard/bookmark-form";
import { BookmarkList } from "@/components/dashboard/bookmark-list";
import { useAuth } from "@/hooks/use-auth";
import { useBookmarks } from "@/hooks/use-bookmarks";

export function BookmarkDashboard() {
  const { user } = useAuth();
  const {
    bookmarks,
    isLoading,
    isCreating,
    deletingId,
    createBookmark,
    deleteBookmark,
  } = useBookmarks(user?.id ?? "");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredBookmarks = useMemo(() => {
    const normalizedQuery = searchQuery.trim().toLowerCase();

    if (!normalizedQuery) {
      return bookmarks;
    }

    return bookmarks.filter((bookmark) => {
      return (
        bookmark.title.toLowerCase().includes(normalizedQuery) ||
        bookmark.url.toLowerCase().includes(normalizedQuery)
      );
    });
  }, [bookmarks, searchQuery]);

  if (!user) {
    return null;
  }

  return (
    <section className="grid gap-6">
      <section className="grid gap-3 rounded-xl border border-border bg-card p-4 shadow-md sm:grid-cols-3 sm:gap-4 sm:p-5">
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Total bookmarks
          </p>
          <p className="mt-1 text-xl font-semibold text-card-foreground">
            {bookmarks.length}
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Search
          </p>
          <input
            type="search"
            value={searchQuery}
            onChange={(event) => setSearchQuery(event.target.value)}
            placeholder="Search title or URL..."
            className="mt-1 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-card-foreground"
          />
        </div>
        <div className="sm:text-right">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Results
          </p>
          <p className="mt-1 text-xl font-semibold text-card-foreground">
            {filteredBookmarks.length}
          </p>
        </div>
      </section>

      <BookmarkForm onSubmit={createBookmark} isSubmitting={isCreating} />
      <BookmarkList
        bookmarks={filteredBookmarks}
        isLoading={isLoading}
        deletingId={deletingId}
        onDelete={deleteBookmark}
      />
    </section>
  );
}
