import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  homeContentSchema,
  toYouTubeEmbed,
  type HomeContentValues,
} from "../../schemas/content";
import { useHomeContent, useSaveHomeContent } from "../../hooks/useHomeContent";
import { apiErrorMessage } from "../../lib/api";

const INPUT =
  "w-full rounded-lg border border-gray-150 bg-white px-3 py-2.5 text-sm outline-none " +
  "transition-colors focus:border-accent1-primary focus:ring-2 focus:ring-blue-100 " +
  "aria-invalid:border-accent2-primary aria-invalid:bg-red-50 aria-invalid:focus:ring-red-100";

const FIELDS = [
  { name: "heading", label: "Hero heading", rows: 0, max: 200 },
  { name: "subtitle", label: "Hero subtitle", rows: 2, max: 500 },
  { name: "aboutHeading", label: "'What is UMSA' heading", rows: 0, max: 200 },
  { name: "aboutBody", label: "'What is UMSA' body", rows: 5, max: 1000 },
] as const;

const LABEL =
  "text-xs font-semibold tracking-wide text-foreground-secondary uppercase";

export default function HomeContentEditor() {
  const { data, isPending, isError } = useHomeContent();
  const save = useSaveHomeContent();
  const {
    register,
    handleSubmit,
    reset,
    watch,
    setValue,
    formState: { errors, isDirty },
  } = useForm<HomeContentValues>({
    resolver: zodResolver(homeContentSchema),
    values: data, // syncs form whenever data changes
    resetOptions: { keepDirtyValues: true },
  });

  // hide the old "Saved" / error banner as soon as someone edits again
  const { isIdle: saveIdle, reset: resetSave } = save;
  useEffect(() => {
    const sub = watch((_values, { type }) => {
      if (type === "change" && !saveIdle) resetSave();
    });
    return () => sub.unsubscribe();
  }, [watch, saveIdle, resetSave]);

  const videoUrl = watch("introVideoUrl") ?? "";
  const videoEmbed = videoUrl.trim() ? toYouTubeEmbed(videoUrl.trim()) : null;
  const errorCount = Object.keys(errors).length;

  if (isPending)
    return <p className="text-sm text-foreground-secondary">Loading…</p>;
  if (isError)
    return (
      <p className="text-sm text-accent2-primary">Could not load content.</p>
    );

  // reset to what the server saved so the form matches the live homepage
  // (keepDirtyValues has to be switched off here or the old input sticks)
  const onSubmit = handleSubmit((values) =>
    save.mutate(values, {
      onSuccess: (saved) => reset(saved, { keepDirtyValues: false }),
    }),
  );

  return (
    <div className="max-w-2xl">
      <h1 className="font-heading text-xl text-accent1-primary sm:text-2xl">
        Homepage text
      </h1>
      <p className="mt-1 mb-6 text-sm text-foreground-secondary">
        Changes go live on the public homepage as soon as you save.
      </p>

      <form
        onSubmit={onSubmit}
        className="flex flex-col gap-4 rounded-2xl border border-gray-150 bg-white p-5 sm:p-6"
      >
        {errorCount > 0 && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-3 py-2 text-sm text-accent2-primary"
          >
            Please fix the {errorCount === 1 ? "field" : `${errorCount} fields`}{" "}
            highlighted below before saving.
          </p>
        )}
        {FIELDS.map((field) => (
          <label key={field.name} className="flex flex-col gap-1.5">
            <span className="flex items-baseline justify-between gap-3">
              <span className={LABEL}>{field.label}</span>
              <CharCount value={watch(field.name)} max={field.max} />
            </span>
            {field.rows ? (
              <textarea
                {...register(field.name)}
                rows={field.rows}
                aria-invalid={Boolean(errors[field.name])}
                className={`${INPUT} resize-y`}
              />
            ) : (
              <input
                {...register(field.name)}
                aria-invalid={Boolean(errors[field.name])}
                className={INPUT}
              />
            )}
            {errors[field.name] && (
              <p className="text-xs text-accent2-primary">
                {errors[field.name]?.message}
              </p>
            )}
          </label>
        ))}

        <div className="flex flex-col gap-1.5">
          <label htmlFor="introVideoUrl" className={LABEL}>
            Intro video (optional)
          </label>
          <div className="flex gap-2">
            <input
              id="introVideoUrl"
              {...register("introVideoUrl")}
              placeholder="https://youtu.be/…"
              aria-invalid={Boolean(errors.introVideoUrl)}
              aria-describedby="introVideoUrl-help"
              className={INPUT}
            />
            {videoUrl && (
              <button
                type="button"
                onClick={() =>
                  setValue("introVideoUrl", "", {
                    shouldDirty: true,
                    shouldValidate: true,
                  })
                }
                className="shrink-0 rounded-lg border border-gray-150 px-3 text-xs font-semibold
                  text-foreground-secondary transition-colors hover:border-accent2-primary hover:text-accent2-primary"
              >
                Remove
              </button>
            )}
          </div>
          <p
            id="introVideoUrl-help"
            className="text-xs text-foreground-secondary"
          >
            Paste any YouTube link. Leave empty to hide the video on the
            homepage.
          </p>
          {errors.introVideoUrl && (
            <p className="text-xs text-accent2-primary">
              {errors.introVideoUrl.message}
            </p>
          )}
          {videoEmbed && (
            <iframe
              src={videoEmbed}
              title="Intro video preview"
              loading="lazy"
              className="mt-2 aspect-video w-full rounded-lg border-0"
            />
          )}
        </div>

        <button
          type="submit"
          disabled={save.isPending || !isDirty}
          className="self-start rounded-full bg-accent1-primary px-6 py-2.5 text-xs font-semibold
            tracking-wide text-white uppercase transition-colors hover:bg-blue-400
            disabled:opacity-50"
        >
          {save.isPending ? "Saving…" : isDirty ? "Save" : "No changes"}
        </button>

        {save.isSuccess && !isDirty && (
          <p
            role="status"
            className="rounded-lg bg-blue-50 px-3 py-2 text-sm text-accent1-primary"
          >
            Saved — check the homepage.
          </p>
        )}
        {save.isError && (
          <p
            role="alert"
            className="rounded-lg bg-red-50 px-3 py-2 text-sm text-accent2-primary"
          >
            {apiErrorMessage(save.error)}
          </p>
        )}
      </form>
    </div>
  );
}

function CharCount({ value, max }: { value?: string; max: number }) {
  const length = value?.trim().length ?? 0;
  return (
    <span
      className={`text-xs tabular-nums ${
        length > max ? "text-accent2-primary" : "text-foreground-tertiary"
      }`}
    >
      {length}/{max}
    </span>
  );
}
