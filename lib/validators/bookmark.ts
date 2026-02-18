import { z } from "zod";

export const createBookmarkSchema = z.object({
  title: z.string().trim().min(1, "Title is required"),
  url: z.string().trim().url("Enter a valid URL"),
});

export type CreateBookmarkValues = z.infer<typeof createBookmarkSchema>;
