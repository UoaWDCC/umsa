import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { FiChevronDown } from "react-icons/fi";
import PageHeader from "../components/ui/PageHeader";
import Reveal from "../components/ui/Reveal";
import { useFaqs } from "../hooks/useSiteData";

export default function FAQ() {
  useEffect(() => {
    document.title = "FAQ | UMSA";
  }, []);

  const { data: faqs, isPending } = useFaqs();
  const [openId, setOpenId] = useState<string | null>(null);

  return (
    <>
      <PageHeader title="Frequently Asked" accent="Questions" />

      <div className="mx-auto max-w-2xl px-6 pb-10">
        {isPending && (
          <p className="text-center text-sm text-foreground-secondary">Loading…</p>
        )}

        <div className="space-y-3">
          {(faqs ?? []).map((faq, i) => {
            const open = openId === faq.id;
            return (
              <Reveal key={faq.id} delay={i * 0.06}>
                <div className="overflow-hidden rounded-2xl border border-gray-150 bg-white">
                  <button
                    onClick={() => setOpenId(open ? null : faq.id)}
                    aria-expanded={open}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                  >
                    <span className="font-heading text-sm text-accent1-primary">
                      {faq.question}
                    </span>
                    <motion.span animate={{ rotate: open ? 180 : 0 }} transition={{ duration: 0.25 }}>
                      <FiChevronDown className="text-accent2-primary" size={18} />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {open && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                      >
                        <p className="px-5 pb-5 text-sm leading-relaxed text-foreground-secondary">
                          {faq.answer}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </>
  );
}
