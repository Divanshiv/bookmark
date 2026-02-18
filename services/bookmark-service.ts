"use client";

import type { CreateBookmarkValues } from "@/lib/validators/bookmark";
import { createClient } from "@/lib/supabase/client";
import type { Bookmark } from "@/types/bookmark";

const TABLE_NAME = "bookmarks";

export async function listBookmarks(userId: string) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .select("*")
    .eq("user_id", userId)
    .order("created_at", { ascending: false });

  if (error) {
    throw new Error(error.message);
  }

  return data as Bookmark[];
}

export async function addBookmark(userId: string, input: CreateBookmarkValues) {
  const supabase = createClient();

  const { data, error } = await supabase
    .from(TABLE_NAME)
    .insert({
      user_id: userId,
      title: input.title.trim(),
      url: input.url.trim(),
    })
    .select("*")
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Bookmark;
}

export async function removeBookmark(userId: string, bookmarkId: string) {
  const supabase = createClient();

  const { error } = await supabase
    .from(TABLE_NAME)
    .delete()
    .eq("id", bookmarkId)
    .eq("user_id", userId);

  if (error) {
    throw new Error(error.message);
  }
}
