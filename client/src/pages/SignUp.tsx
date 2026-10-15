import { useEffect, useState } from "react";
import { api, apiErrorMessage } from "../lib/api";
import { motion } from "motion/react";
import { FiCheck } from "react-icons/fi";
import PageHeader from "../components/ui/PageHeader";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import { Star } from "../components/ui/Decor";

const PERKS = [
  "Discounted entry to every ticketed event",
  "First access to Malaysian Night tickets",
  "Invites to members-only socials and industry nights",
  "A committee who will actually reply to your DMs",
];

const FIELD =
  "w-full rounded-xl border border-gray-150 bg-white px-4 py-3 text-sm outline-none " +
  "transition-colors focus:border-accent1-primary";

export default function SignUp() {
  useEffect(() => {
    document.title = "Sign Up | UMSA";
  }, []);

  const [form, setForm] = useState({ name: "", email: "", year: "First year" });
  const [done, setDone] = useState(false);

  const [sending, setSending] = useState(false);
  const [error, setError] = useState("");
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    setError("");
    try {
      await api.post("/membership", form);
      setDone(true);
    } catch (err) { setError(apiErrorMessage(err)); }
    finally { setSending(false); }
  };

  return (
    <>
      <PageHeader
        title="Join"
        accent="UMSA"
        blurb="Membership is $5 for the year. Everyone is welcome."
      />

      <div className="mx-auto grid max-w-4xl gap-10 px-6 pb-10 md:grid-cols-2">
        <Reveal from="left">
          <div className="relative">
            <Star className="absolute -top-4 -left-5" size={22} tone="red" spin />
            <h3 className="text-2xl text-accent1-primary">What you get</h3>
            <ul className="mt-4 space-y-3">
              {PERKS.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-sm text-foreground-secondary">
                  <FiCheck className="mt-0.5 shrink-0 text-accent2-primary" />
                  {perk}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>

        <Reveal from="right">
          {done ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl bg-blue-50 p-8 text-center"
            >
              <p className="font-heading text-2xl text-accent1-primary">Request received</p>
              <p className="mt-2 text-sm text-foreground-secondary">
                Your membership request has been saved for the committee to review. Payment and membership approval are still required.
              </p>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="space-y-3 rounded-2xl bg-white p-6 shadow-sm">
              <input
                className={FIELD}
                placeholder="Full name"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
              />
              <input
                className={FIELD}
                type="email"
                placeholder="University email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
              />
              <select
                className={FIELD}
                value={form.year}
                onChange={(e) => setForm({ ...form, year: e.target.value })}
              >
                {["First year", "Second year", "Third year", "Fourth year+", "Postgrad"].map(
                  (y) => (
                    <option key={y}>{y}</option>
                  ),
                )}
              </select>

              {error && <p role="alert" className="text-sm text-accent2-primary">{error}</p>}
              <Button type="submit" disabled={sending}>{sending ? "Submitting…" : "Request membership"}</Button>
            </form>
          )}
        </Reveal>
      </div>
    </>
  );
}
