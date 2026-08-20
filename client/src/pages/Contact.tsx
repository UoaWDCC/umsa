import { useEffect, useState } from "react";
import { motion } from "motion/react";
import type { IconType } from "react-icons";
import { FiCheck, FiMail } from "react-icons/fi";
import { FaFacebookF, FaInstagram, FaTiktok } from "react-icons/fa";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";
import { OutlineStar, StarTrio } from "../components/ui/Decor";

type Status = "idle" | "sending" | "sent";

/* The CONTACT frame is one 800 x 404 white card, corner radius 40, holding four
   rows on a 77px pitch: a 48px round icon badge — red on the first row, blue on
   the rest — then a small uppercase label above the value. */
type Row = { label: string; value: string; href: string; Icon: IconType; red?: boolean };

const ROWS: Row[] = [
  { label: "Email", value: "hello@umsa.org.nz", href: "mailto:hello@umsa.org.nz", Icon: FiMail, red: true },
  { label: "Instagram", value: "@umsa.auckland", href: "https://www.instagram.com/", Icon: FaInstagram },
  { label: "Facebook", value: "UMSA Auckland", href: "https://www.facebook.com/", Icon: FaFacebookF },
  { label: "TikTok", value: "@umsa.auckland", href: "https://www.tiktok.com/", Icon: FaTiktok },
];

const FIELD =
  "w-full rounded-xl border border-gray-150 bg-white px-4 py-3 text-sm outline-none " +
  "transition-colors focus:border-accent1-primary";

export default function Contact() {
  useEffect(() => {
    document.title = "Contact | UMSA";
  }, []);

  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");

  // Local prototype: nothing is sent anywhere. The delay just makes the
  // success state visible during a demo.
  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 700));
    setStatus("sent");
    setForm({ name: "", email: "", message: "" });
  };

  return (
    <section className="relative overflow-hidden px-6 pt-12 pb-16">
      <div className="mx-auto max-w-6xl">
        <Reveal from="left">
          <div className="flex items-center justify-between gap-6">
            <h1 className="text-4xl text-accent1-primary sm:text-5xl md:text-7xl">Get in Touch</h1>
            <StarTrio className="hidden sm:flex" />
          </div>
        </Reveal>

        <div className="relative mt-10">
          {/* the three outline stars running down the left margin */}
          <div className="absolute top-10 -left-2 hidden flex-col gap-6 lg:flex">
            <OutlineStar />
            <OutlineStar />
            <OutlineStar />
          </div>

          <Reveal>
            <ul className="mx-auto max-w-3xl rounded-[40px] bg-white px-8 py-10 shadow-[0_20px_20px_rgba(0,0,0,0.05)] md:px-14">
              {ROWS.map(({ label, value, href, Icon, red }) => (
                <li key={label} className="flex items-center gap-5 py-3.5">
                  <span
                    className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-full
                      text-white ${red ? "bg-accent2-primary" : "bg-accent1-primary"}`}
                  >
                    <Icon size={20} />
                  </span>

                  <div className="min-w-0">
                    <p className="font-heading text-[11px] tracking-[0.18em] text-accent1-primary uppercase">
                      {label}
                    </p>
                    <a
                      href={href}
                      target={href.startsWith("http") ? "_blank" : undefined}
                      rel="noopener noreferrer"
                      className="font-heading text-lg break-words text-accent1-primary uppercase
                        transition-opacity hover:opacity-70 md:text-2xl"
                    >
                      {value}
                    </a>
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        {/* "REACH OUT!" sits right-aligned, with the star trio to its left */}
        <Reveal>
          <div className="mt-24 flex items-center justify-end gap-8">
            <StarTrio className="hidden sm:flex" size={34} />
            <h2 className="text-4xl text-accent1-primary md:text-6xl">Reach Out!</h2>
          </div>
        </Reveal>

        <Reveal from="right">
          <form onSubmit={submit} className="mt-8 ml-auto max-w-xl space-y-3">
            <input
              className={FIELD}
              placeholder="Your name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              className={FIELD}
              type="email"
              placeholder="Your email"
              required
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <textarea
              className={`${FIELD} min-h-32 resize-y`}
              placeholder="Your message"
              required
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />

            <Button type="submit" disabled={status === "sending"}>
              {status === "sending" ? "Sending…" : "Send message"}
            </Button>

            {status === "sent" && (
              <motion.p
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-2 text-sm text-accent1-primary"
              >
                <FiCheck /> Thanks — we&apos;ll get back to you.
              </motion.p>
            )}
          </form>
        </Reveal>
      </div>
    </section>
  );
}
