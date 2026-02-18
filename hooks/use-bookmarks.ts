"use client";

import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";

import type { CreateBookmarkValues } from "@/lib/validators/bookmark";
import {
  addBookmark,
  listBookmarks,
  removeBookmark,
} from "@/services/bookmark-service";
import type { Bookmark } from "@/types/bookmark";
import { useBookmarksRealtime } from "@/hooks/use-bookmarks-realtime";

type UseBookmarksResult = {
  bookmarks: Bookmark[];
  isLoading: boolean;
  isCreating: boolean;
  deletingId: string | null;
  createBookmark: (input: CreateBookmarkValues) => Promise<void>;
  deleteBookmark: (bookmarkId: string) => Promise<void>;
  refreshBookmarks: () => Promise<void>;
};

export function useBookmarks(userId: string): UseBookmarksResult {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isCreating, setIsCreating] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const notifyTabs = useCallback(() => {
    if (typeof window === "undefined" || !("BroadcastChannel" in window)) {
      return;
    }

    const channel = new BroadcastChannel("bookmarks-sync");
    channel.postMessage({ userId, timestamp: Date.now() });
    channel.close();
  }, [userId]);

  const refreshBookmarks = useCallback(async () => {
    if (!userId) {
      setBookmarks([]);
      setIsLoading(false);
      return;
    }

    try {
      const data = await listBookmarks(userId);
      setBookmarks(data);
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Unable to load bookmarks.",
      );
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    void refreshBookmarks();
  }, [refreshBookmarks]);

  useEffect(() => {
    if (typeof window === "undefined" || !("BroadcastChannel" in window)) {
      return;
    }

    const channel = new BroadcastChannel("bookmarks-sync");

    channel.onmessage = (event: MessageEvent<{ userId?: string }>) => {
      if (event.data?.userId === userId) {
        void refreshBookmarks();
      }
    };

    return () => {
      channel.close();
    };
  }, [refreshBookmarks, userId]);

  useBookmarksRealtime({
    userId,
    onChange: () => {
      void refreshBookmarks();
    },
  });

  const createBookmark = useCallback(
    async (input: CreateBookmarkValues) => {
      try {
        setIsCreating(true);
        await addBookmark(userId, input);
        notifyTabs();
        await refreshBookmarks();
        toast.success("Bookmark added.");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Unable to add bookmark.",
        );
      } finally {
        setIsCreating(false);
      }
    },
    [notifyTabs, refreshBookmarks, userId],
  );

  const deleteBookmark = useCallback(
    async (bookmarkId: string) => {
      try {
        setDeletingId(bookmarkId);
        await removeBookmark(userId, bookmarkId);
        notifyTabs();
        await refreshBookmarks();
        toast.success("Bookmark deleted.");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Unable to delete bookmark.",
        );
      } finally {
        setDeletingId(null);
      }
    },
    [notifyTabs, refreshBookmarks, userId],
  );

  return {
    bookmarks,
    isLoading,
    isCreating,
    deletingId,
    createBookmark,
    deleteBookmark,
    refreshBookmarks,
  };
}
