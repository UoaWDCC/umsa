import SectionHeading from "./SectionHeading";
import { Sparkle, Star } from "./Decor";

type Props = { title: string; accent?: string; blurb?: string };

/** Shared masthead for every inner page. */
export default function PageHeader({ title, accent, blurb }: Props) {
  return (
    <section className="relative mx-auto max-w-6xl px-6 pt-14 pb-8 text-center">
      <Star className="absolute top-8 left-[10%] hidden md:block" size={22} tone="red" spin />
      <Sparkle className="absolute top-20 right-[12%] hidden md:block" size={28} tone="blue" />

      <SectionHeading accent={accent} align="center">
        {title}
      </SectionHeading>

      {blurb && (
        <p className="mx-auto mt-4 max-w-xl text-sm text-foreground-secondary">{blurb}</p>
      )}
    </section>
  );
}
