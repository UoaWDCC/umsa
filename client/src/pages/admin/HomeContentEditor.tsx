import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { homeContentSchema, type HomeContentValues } from "../../schemas/content";
import { useHomeContent, useSaveHomeContent } from "../../hooks/useHomeContent";
import { apiErrorMessage } from "../../lib/api";

// template for future CMS pages:
// -> read with a query, prefill the form using react-hook-form, write with mutation
// can copy format for events / gallery / team editors
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

  if (isPending) {
    return <p className="text-gray-400">Loading current content…</p>;
  }
  if (isError) {
    return <p className="text-red-400">Could not load content — is the server running?</p>;
  }

  const onSubmit = handleSubmit((values) => save.mutate(values));

  return (
    <div className="max-w-2xl">
      <h1 className="text-2xl font-bold mb-2">Homepage text</h1>
      <p className="text-sm text-gray-400 mb-6">
        This is the welcome message on the public homepage. Changes go live as soon as
        you save.
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-4">
        <label className="flex flex-col gap-2 text-sm text-gray-300">
          Heading
          <input
            {...register("heading")}
            className="bg-transparent border-2 rounded-2xl px-6 py-4 text-white placeholder-gray-400 outline-none focus:border-blue-300 transition"
          />
        </label>
        {errors.heading && <p className="text-red-400 text-sm">{errors.heading.message}</p>}

        <label className="flex flex-col gap-2 text-sm text-gray-300">
          Subtitle
          <textarea
            {...register("subtitle")}
            rows={3}
            className="bg-transparent border-2 rounded-2xl px-6 py-4 text-white placeholder-gray-400 outline-none focus:border-blue-300 transition"
          />
        </label>
        {errors.subtitle && <p className="text-red-400 text-sm">{errors.subtitle.message}</p>}

        <button
          type="submit"
          disabled={save.isPending}
          className="bg-blue-300 text-black font-bold py-3 px-6 rounded-full hover:bg-blue-400 transition disabled:opacity-50 self-start"
        >
          {save.isPending ? "Saving…" : "Save"}
        </button>

        {save.isSuccess && <p className="text-green-400">Saved — check the homepage!</p>}
        {save.isError && <p className="text-red-400">{apiErrorMessage(save.error)}</p>}
      </form>
    </div>
  );
}
