import { useQuery } from "@tanstack/react-query";
import { api, apiErrorMessage } from "../../lib/api";

type Submission = { id: string; kind: string; name: string; email: string; year?: string; message?: string; createdAt: string };
export default function Submissions() {
  const { data, isPending, error } = useQuery({ queryKey: ["admin", "submissions"],
    queryFn: () => api.get<Submission[]>("/admin/submissions").then(res => res.data) });
  return <div>
    <h1 className="font-heading text-2xl text-accent1-primary">Inbox</h1>
    <p className="mt-2 text-sm text-foreground-secondary">Contact messages and membership requests. Membership requests require committee review and payment.</p>
    {isPending && <p className="mt-6">Loading…</p>}
    {error && <p role="alert" className="mt-6 text-accent2-primary">{apiErrorMessage(error)}</p>}
    {data?.length === 0 && <p className="mt-6">No submissions yet.</p>}
    <ul className="mt-6 space-y-3">{data?.map(row => <li key={row.id} className="rounded-xl border border-gray-150 bg-white p-5">
      <p className="text-xs text-foreground-secondary">{row.kind === "membership" ? "Membership request" : "Contact message"} · {new Date(row.createdAt).toLocaleString()}</p>
      <h2 className="mt-2 font-semibold">{row.name}</h2>
      <a href={`mailto:${row.email}`} className="text-sm text-accent1-primary">{row.email}</a>
      {row.year && <p className="mt-2 text-sm">{row.year}</p>}
      {row.message && <p className="mt-3 whitespace-pre-wrap text-sm">{row.message}</p>}
    </li>)}</ul>
  </div>;
}
