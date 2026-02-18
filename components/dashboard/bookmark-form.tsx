"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import {
  createBookmarkSchema,
  type CreateBookmarkValues,
} from "@/lib/validators/bookmark";

type BookmarkFormProps = {
  onSubmit: (values: CreateBookmarkValues) => Promise<void>;
  isSubmitting: boolean;
};

export function BookmarkForm({ onSubmit, isSubmitting }: BookmarkFormProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateBookmarkValues>({
    resolver: zodResolver(createBookmarkSchema),
    defaultValues: {
      title: "",
      url: "",
    },
  });

  const submit = async (values: CreateBookmarkValues) => {
    await onSubmit(values);
    reset();
  };

  return (
    <section className="rounded-xl border border-border bg-card p-6 shadow-md">
      <h2 className="text-base font-semibold text-card-foreground sm:text-lg">
        Add bookmark
      </h2>
      <p className="mt-1 text-sm text-muted-foreground">
        Paste a URL and save it to your private collection.
      </p>
      <form
        className="mt-4 grid gap-4"
        onSubmit={handleSubmit(submit)}
        noValidate
      >
        <div className="grid gap-1.5">
          <label
            htmlFor="title"
            className="text-sm font-medium text-card-foreground"
          >
            Title
          </label>
          <input
            id="title"
            type="text"
            placeholder="Enter bookmark title"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-card-foreground"
            {...register("title")}
            aria-invalid={errors.title ? "true" : "false"}
          />
          {errors.title ? (
            <p className="text-xs text-danger" role="alert">
              {errors.title.message}
            </p>
          ) : null}
        </div>

        <div className="grid gap-1.5">
          <label
            htmlFor="url"
            className="text-sm font-medium text-card-foreground"
          >
            URL
          </label>
          <input
            id="url"
            type="url"
            placeholder="https://example.com"
            className="w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-card-foreground"
            {...register("url")}
            aria-invalid={errors.url ? "true" : "false"}
          />
          {errors.url ? (
            <p className="text-xs text-danger" role="alert">
              {errors.url.message}
            </p>
          ) : null}
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="mt-1 rounded-lg bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {isSubmitting ? "Saving..." : "Add bookmark"}
        </button>
      </form>
    </section>
  );
}
