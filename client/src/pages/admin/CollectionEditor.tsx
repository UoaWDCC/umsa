import { useState } from "react";
import ImageUploadField from "../../components/admin/ImageUploadField";
import { AnimatePresence, motion } from "motion/react";
import { FiEdit2, FiPlus, FiTrash2, FiX } from "react-icons/fi";
import {
  useCollection,
  useCreate,
  useRemove,
  useUpdate,
  type Collection,
} from "../../hooks/useCollection";
import { apiErrorMessage } from "../../lib/api";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "textarea" | "date" | "select" | "image";
  options?: readonly string[];
  optionLabels?: Record<string, string>;
};

type Row = { id: string } & Record<string, unknown>;

type Props = {
  collection: Collection;
  title: string;
  fields: Field[];

  primary: string;
  secondary?: string;
  thumb?: string;
};

const INPUT =
  "w-full rounded-lg border border-gray-150 bg-white px-3 py-2.5 text-sm outline-none " +
  "transition-colors focus:border-accent1-primary focus:ring-2 focus:ring-blue-100";

const LABEL =
  "mb-1.5 block text-xs font-semibold tracking-wide text-foreground-secondary uppercase";

function emptyDraft(fields: Field[]): Record<string, unknown> {
  return Object.fromEntries(
    fields.map((f) => [
      f.name,
      f.type === "select" ? (f.options?.[0] ?? "") : "",
    ]),
  );
}

export default function CollectionEditor({
  collection,
  title,
  fields,
  primary,
  secondary,
  thumb,
}: Props) {
  const {
    data: rows,
    isPending,
    error: loadError,
  } = useCollection<Row>(collection);
  const create = useCreate<Row>(collection);
  const update = useUpdate<Row>(collection);
  const remove = useRemove(collection);

  const [draft, setDraft] = useState<Record<string, unknown> | null>(null);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [error, setError] = useState("");
  const [uploading, setUploading] = useState(false);

  const openNew = () => {
    setEditingId(null);
    setDraft(emptyDraft(fields));
    setError("");
  };

  const openEdit = (row: Row) => {
    setEditingId(row.id);
    setDraft({
      ...emptyDraft(fields),
      ...row,
      ...(collection === "members" && !row.committee
        ? { committee: "other" }
        : {}),
    });
    setError("");
  };

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!draft) return;
    setError("");
    try {
      if (editingId)
        await update.mutateAsync({ ...draft, id: editingId } as Row);
      else await create.mutateAsync(draft as Row);
      setDraft(null);
    } catch (err) {
      setError(apiErrorMessage(err));
    }
  };

  const busy = create.isPending || update.isPending || uploading;

  return (
    <div>
      <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
        <div>
          <h1 className="font-heading text-xl text-accent1-primary sm:text-2xl">
            {title}
          </h1>
          {rows && (
            <p className="mt-1 text-xs text-foreground-tertiary">
              {rows.length} {rows.length === 1 ? "entry" : "entries"}
            </p>
          )}
        </div>
        <button
          onClick={openNew}
          className="flex items-center gap-2 rounded-full bg-accent1-primary px-4 py-2
            text-xs font-semibold tracking-wide text-white uppercase transition-colors
            hover:bg-blue-400"
        >
          <FiPlus size={14} /> New
        </button>
      </div>

      {loadError && (
        <p role="alert" className="mb-4 text-sm text-accent2-primary">
          {apiErrorMessage(loadError)}
        </p>
      )}
      {remove.isError && (
        <p role="alert" className="mb-4 text-sm text-accent2-primary">
          {apiErrorMessage(remove.error)}
        </p>
      )}
      {isPending && (
        <div className="space-y-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="h-[68px] animate-pulse rounded-xl bg-white/70"
            />
          ))}
        </div>
      )}

      <ul className="space-y-2">
        {(rows ?? []).map((row) => (
          <motion.li
            key={row.id}
            layout
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="group flex items-center gap-4 rounded-xl border border-gray-150 bg-white p-3
              transition-shadow hover:shadow-[0_2px_10px_rgba(0,0,0,0.06)]"
          >
            {thumb && typeof row[thumb] === "string" && (
              <img
                src={row[thumb] as string}
                alt=""
                className="h-12 w-12 shrink-0 rounded-lg bg-background-tertiary object-cover"
              />
            )}

            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-semibold">
                {String(row[primary] ?? "")}
              </p>
              {secondary && (
                <p className="truncate text-xs text-foreground-secondary">
                  {String(row[secondary] ?? "")}
                </p>
              )}
            </div>

            <button
              onClick={() => openEdit(row)}
              className="rounded-lg p-2 text-foreground-secondary transition-colors
                hover:bg-blue-50 hover:text-accent1-primary"
              aria-label={`Edit ${String(row[primary] ?? "")}`}
            >
              <FiEdit2 size={15} />
            </button>
            <button
              onClick={() => {
                if (
                  window.confirm(
                    `Delete ${String(row[primary] ?? "this entry")}?`,
                  )
                )
                  remove.mutate(row.id);
              }}
              disabled={remove.isPending}
              className="rounded-lg p-2 text-foreground-tertiary transition-colors
                hover:bg-red-50 hover:text-accent2-primary"
              aria-label={`Delete ${String(row[primary] ?? "")}`}
            >
              <FiTrash2 size={15} />
            </button>
          </motion.li>
        ))}
      </ul>

      {rows && rows.length === 0 && (
        <p
          className="rounded-xl border border-dashed border-gray-200 bg-white/60 p-10 text-center
          text-sm text-foreground-secondary"
        >
          Nothing here yet — hit{" "}
          <span className="font-semibold text-accent1-primary">New</span> to add
          the first one.
        </p>
      )}

      <AnimatePresence>
        {draft && (
          <motion.div
            className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto
              bg-gray-900/40 p-4 backdrop-blur-sm sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setDraft(null)}
          >
            <motion.form
              onSubmit={save}
              onClick={(e) => e.stopPropagation()}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="my-6 w-full max-w-lg overflow-hidden rounded-2xl bg-white
                shadow-[0_20px_50px_rgba(0,0,0,0.2)] sm:my-10"
            >
              <div className="flex items-center justify-between border-b border-gray-150 px-6 py-4">
                <h2 className="font-heading text-lg text-accent1-primary">
                  {editingId ? "Edit" : "New"} {title.replace(/s$/, "")}
                </h2>
                <button
                  type="button"
                  onClick={() => setDraft(null)}
                  aria-label="Close"
                  className="rounded-lg p-1.5 text-foreground-secondary transition-colors
                    hover:bg-background-tertiary"
                >
                  <FiX />
                </button>
              </div>

              <div className="space-y-4 px-6 py-5">
                {fields.map((field) => (
                  <label key={field.name} className="block">
                    <span className={LABEL}>{field.label}</span>

                    {field.type === "textarea" ? (
                      <textarea
                        className={`${INPUT} min-h-24 resize-y`}
                        value={String(draft[field.name] ?? "")}
                        onChange={(e) =>
                          setDraft({ ...draft, [field.name]: e.target.value })
                        }
                      />
                    ) : field.type === "select" ? (
                      <select
                        className={INPUT}
                        value={String(draft[field.name] ?? "")}
                        onChange={(e) =>
                          setDraft({ ...draft, [field.name]: e.target.value })
                        }
                      >
                        {field.options?.map((o) => (
                          <option key={o} value={o}>
                            {field.optionLabels?.[o] ?? o}
                          </option>
                        ))}
                      </select>
                    ) : field.type === "image" ? (
                      <ImageUploadField
                        value={String(draft[field.name] ?? "")}
                        folder={
                          collection === "members"
                            ? "umsa/team"
                            : collection === "sponsors"
                              ? "umsa/branding"
                              : `umsa/${collection}`
                        }
                        onBusy={setUploading}
                        onChange={(url) =>
                          setDraft((current) =>
                            current
                              ? { ...current, [field.name]: url }
                              : current,
                          )
                        }
                      />
                    ) : (
                      <input
                        className={INPUT}
                        type={field.type === "date" ? "date" : "text"}
                        value={String(draft[field.name] ?? "")}
                        onChange={(e) =>
                          setDraft({ ...draft, [field.name]: e.target.value })
                        }
                      />
                    )}
                  </label>
                ))}

                {error && (
                  <p className="rounded-lg bg-red-50 px-3 py-2 text-sm text-accent2-primary">
                    {error}
                  </p>
                )}
              </div>

              <div
                className="flex justify-end gap-2 border-t border-gray-150 bg-background-secondary
                px-6 py-4"
              >
                <button
                  type="button"
                  onClick={() => setDraft(null)}
                  className="rounded-full px-5 py-2 text-xs font-semibold tracking-wide
                    text-foreground-secondary uppercase transition-colors hover:bg-background-tertiary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={busy}
                  className="rounded-full bg-accent1-primary px-5 py-2 text-xs font-semibold
                    tracking-wide text-white uppercase transition-colors hover:bg-blue-400
                    disabled:opacity-50"
                >
                  {busy ? "Saving…" : "Save"}
                </button>
              </div>
            </motion.form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
