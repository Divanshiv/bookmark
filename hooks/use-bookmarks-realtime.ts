"use client";

import { useEffect } from "react";

import { createClient } from "@/lib/supabase/client";

type UseBookmarksRealtimeParams = {
  userId: string;
  onChange: () => void;
};

export function useBookmarksRealtime({
  userId,
  onChange,
}: UseBookmarksRealtimeParams) {
  useEffect(() => {
    if (!userId) {
      return;
    }

    const supabase = createClient();

    const channel = supabase
      .channel(`bookmarks:${userId}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "bookmarks",
          filter: `user_id=eq.${userId}`,
        },
        onChange,
      )
      .subscribe((status) => {
        if (status === "CHANNEL_ERROR") {
          console.error("Realtime subscription failed for bookmarks channel");
        }
      });

    return () => {
      void supabase.removeChannel(channel);
    };
  }, [onChange, userId]);
}
