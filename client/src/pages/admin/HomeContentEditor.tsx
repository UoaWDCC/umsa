import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  homeContentSchema,
  type HomeContentValues,
} from "../../schemas/content";
import { useHomeContent, useSaveHomeContent } from "../../hooks/useHomeContent";
import { apiErrorMessage } from "../../lib/api";

const INPUT =
  "w-full rounded-lg border border-gray-150 bg-white px-3 py-2.5 text-sm outline-none " +
  "transition-colors focus:border-accent1-primary focus:ring-2 focus:ring-blue-100";

const FIELDS = [
  {
    name: "introVideoUrl",
    label: "Intro video (optional YouTube embed URL)",
    rows: 0,
  },
  { name: "heading", label: "Hero heading", rows: 0 },
  { name: "subtitle", label: "Hero subtitle", rows: 2 },
  { name: "aboutHeading", label: "'What is UMSA' heading", rows: 0 },
  { name: "aboutBody", label: "'What is UMSA' body", rows: 5 },
] as const;

export default function HomeContentEditor() {
  const { data, isPending, isError } = useHomeContent();
  const save = useSaveHomeContent();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<HomeContentValues>({
    resolver: zodResolver(homeContentSchema),
    values: data, // syncs form whenever data changes
    resetOptions: { keepDirtyValues: true },
  });

  if (isPending)
    return <p className="text-sm text-foreground-secondary">Loading…</p>;
  if (isError)
    return (
      <p className="text-sm text-accent2-primary">Could not load content.</p>
    );

  const onSubmit = handleSubmit((values) => save.mutate(values));

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
        {FIELDS.map((field) => (
          <label key={field.name} className="flex flex-col gap-1.5">
            <span className="text-xs font-semibold tracking-wide text-foreground-secondary uppercase">
              {field.label}
            </span>
            {field.rows ? (
              <textarea
                {...register(field.name)}
                rows={field.rows}
                className={INPUT}
              />
            ) : (
              <input {...register(field.name)} className={INPUT} />
            )}
            {errors[field.name] && (
              <p className="text-xs text-accent2-primary">
                {errors[field.name]?.message}
              </p>
            )}
          </label>
        ))}

        <button
          type="submit"
          disabled={save.isPending}
          className="self-start rounded-full bg-accent1-primary px-6 py-2.5 text-xs font-semibold
            tracking-wide text-white uppercase transition-colors hover:bg-blue-400
            disabled:opacity-50"
        >
          {save.isPending ? "Saving…" : "Save"}
        </button>

        {save.isSuccess && (
          <p className="rounded-lg bg-blue-50 px-3 py-2 text-sm text-accent1-primary">
            Saved — check the homepage.
          </p>
        )}
        {save.isError && (
          <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-accent2-primary">
            {apiErrorMessage(save.error)}
          </p>
        )}
      </form>
    </div>
  );
}
