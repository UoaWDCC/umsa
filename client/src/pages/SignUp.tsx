import { useEffect } from "react";
import PageHeader from "../components/ui/PageHeader";
import Reveal from "../components/ui/Reveal";
import Button from "../components/ui/Button";

import { MEMBERSHIP_FORM_URL } from "../lib/siteLinks";

export default function SignUp() {
  useEffect(() => {
    document.title = "Sign Up | UMSA";
  }, []);
  return (
    <>
      <PageHeader
        title="Join"
        accent="UMSA"
        blurb="Everyone is welcome. Register through our official membership form."
      />
      <div className="mx-auto max-w-2xl px-6 pb-16">
        <Reveal>
          <section className="rounded-2xl bg-white p-8 text-center shadow-sm">
            <h2 className="text-2xl text-accent1-primary">Become a member</h2>
            <p className="mt-4 mb-6 text-sm leading-relaxed text-foreground-secondary">
              Complete the UMSA Google Form for membership details and
              registration. Membership is managed through that form.
            </p>
            <Button href={MEMBERSHIP_FORM_URL}>Open membership form</Button>
          </section>
        </Reveal>
      </div>
    </>
  );
}
